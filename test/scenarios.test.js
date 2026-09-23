/*
 * Usage-scenario tests for @maxim/dsh-schedule-tab.
 *
 * Each scenario drives the real client bundle through the harness:
 * registration wiring, empty state, single reminder, overdue ordering,
 * fixed-rate formatting, live projection updates, clock ticks, zh locale,
 * icon fallback, shell→child slot wiring, and CSS dedupe.
 *
 * Run: node test/scenarios.test.js
 */
import {
	FakeClock,
	byClass,
	byClassExact,
	byTag,
	childTexts,
	makeCtx,
	makeLocale,
	textOf,
	loadBundle,
} from "./harness.js";

const results = [];
async function scenario(name, fn) {
	try {
		await fn();
		results.push({ name, ok: true });
		console.log(`  ok   ${name}`);
	} catch (error) {
		results.push({ name, ok: false, error });
		console.log(`  FAIL ${name}`);
		console.log(`       ${error.message}`);
	}
}
function assert(condition, message) {
	if (!condition) throw new Error(message);
}
function assertIncludes(haystack, needle, label) {
	if (!String(haystack).includes(needle)) {
		throw new Error(`${label}: expected to include ${JSON.stringify(needle)}, got ${JSON.stringify(haystack)}`);
	}
}

// Deterministic base time: 2026-09-23T12:00:00Z
const T0 = Date.parse("2026-09-23T12:00:00.000Z");
const iso = (ms) => new Date(ms).toISOString();
const inMin = (m) => iso(T0 + m * 60_000);
const inHour = (h) => iso(T0 + h * 3_600_000);
const agoMin = (m) => iso(T0 - m * 60_000);

const record = (id, kind, prompt, scheduledAt, extra = {}) =>
	({ id, kind, prompt, scheduledAt, ...extra });

function makePrimitives({ withClock = true } = {}) {
	const IconClock = (props) => ({ type: "svg.clock", props, children: [] });
	return withClock ? { IconClockOutline16: IconClock } : {};
}

/**
 * Fresh environment for one scenario: the real bundle is executed, its
 * apply(ctx) runs against a recording ctx, and the keyed main shell is
 * mounted exactly the way AppFrame would mount it (the shell renders the
 * session-maybe child; the child receives the standard kit props).
 */
async function env({ withClock = true, locale } = {}) {
	const localeMock = locale ?? makeLocale();
	const { registration, exports, harness } = await loadBundle({
		primitives: makePrimitives({ withClock }),
		clock: new FakeClock(T0),
	});
	assert(registration.id === "@maxim/dsh-schedule-tab",
		`bundle registration id must be the package name, got ${registration.id}`);
	const { ctx, recorded } = makeCtx(localeMock);
	assert(Array.isArray(exports.inject), "bundle must export the inject array");
	exports.apply(ctx);
	const projection = { value: undefined };
	const useProjection = (key) => (key === "schedule" ? projection.value : undefined);
	const panelReg = recorded.mainSchedule[0];
	assert(panelReg, "apply must register a main.schedule occupant");
	const panel = panelReg.Component;
	const shellReg = recorded.main.find((r) => r.meta.key === "schedule");
	assert(shellReg, "apply must register the keyed main occupant");
	const shell = shellReg.Component;
	const tree = harness.render({
		type: shell,
		props: {
			renderSlot: (slotKey) => {
				assert(slotKey === "main.schedule",
					`shell must address its declared child 'main.schedule', got '${slotKey}'`);
				return {
					type: panel,
					props: { t: localeMock.bind("schedule-tab"), useProjection },
					children: [],
				};
			},
		},
		children: [],
	});
	return { harness, tree, projection, recorded, exports, panel, shell, locale: localeMock };
}

const rows = (tree) => byClass(tree, "st_row");
const rowPrompts = (tree) => rows(tree).map((r) => textOf(byClassExact(r, "st_prompt")[0]));
const rowStatuses = (tree) => rows(tree).map((r) => textOf(byClassExact(r, "st_status")[0]));
const rowMetas = (tree) => rows(tree).map((r) => childTexts(byClassExact(r, "st_meta")[0]));

// ── 1. Registration wiring ────────────────────────────────────────────────────
await scenario("registration: dictionaries, tab entry, main key, child slot", async () => {
	const { recorded, exports, locale } = await env();
	const dict = locale.dictionaries.get("schedule-tab");
	assert(dict, "apply must register the schedule-tab dictionary namespace");
	assert(typeof dict.en.tab === "string" && typeof dict.zh.tab === "string", "dictionary carries both en and zh");
	assert(dict.en.tab === "Schedule", `en tab label must be 'Schedule', got ${JSON.stringify(dict.en.tab)}`);
	assert(dict.en.header === "Schedule", `en header must be 'Schedule', got ${JSON.stringify(dict.en.header)}`);
	assert(dict.zh.tab === "日程" && dict.zh.header === "日程", "zh tab/header must be the renamed word 日程");
	const tab = recorded.panellist[0];
	assert(tab, "apply must inject a sidebar.panellist entry");
	assert(tab.meta.id === "schedule", `tab id must be 'schedule' (the main key), got ${JSON.stringify(tab.meta.id)}`);
	assert(tab.meta.order === 0, "tab keeps top-of-group order 0");
	assert(tab.meta.locale === "schedule-tab", "tab entry is locale-aware");
	assert(tab.meta.label() === "Schedule", `en tab label resolves to 'Schedule', got ${JSON.stringify(tab.meta.label())}`);
	assert(recorded.main.length === 1, "exactly one main registration");
	assert(recorded.main[0].meta.key === "schedule", `main key must be 'schedule', got ${JSON.stringify(recorded.main[0].meta.key)}`);
	assert(recorded.main[0].meta.children["main.schedule"]?.scope === "session-maybe", "child slot is session-maybe scoped");
	assert(recorded.mainSchedule.length === 1, "exactly one main.schedule occupant");
	assert(typeof exports.apply === "function", "bundle exports apply");
	assert(exports.inject.includes("slots") && exports.inject.includes("locale"), "inject names the slots and locale services");
});

// ── 2. Empty state ────────────────────────────────────────────────────────────
await scenario("empty state: no session / no records → empty view, zero items", async () => {
	const { tree, harness } = await env();
	assert(textOf(byClassExact(tree, "st_title")[0]) === "Schedule", `panel title must be 'Schedule', got ${JSON.stringify(textOf(byClassExact(tree, "st_title")[0]))}`);
	assert(textOf(byClassExact(tree, "st_count")[0]) === "0 items", `count must read '0 items', got ${JSON.stringify(textOf(byClassExact(tree, "st_count")[0]))}`);
	const empty = byClassExact(tree, "st_empty")[0];
	assert(empty, "empty state renders when the projection is undefined (no session current)");
	assertIncludes(textOf(byClassExact(empty, "st_emptyTitle")[0]), "Nothing scheduled", "empty title");
	assert(byTag(tree, "li").length === 0, "no rows in the empty state");
	assert(harness.liveTimers() === 0, "no per-second interval while empty");
});

// ── 3. One future reminder ───────────────────────────────────────────────────
await scenario("one future reminder: row, status, frequency, countdown", async () => {
	const { tree, projection, harness } = await env();
	projection.value = [record("schedule-1", "after", "Check the build", inMin(10), { afterSeconds: 600 })];
	harness.rerender();
	assert(rows(tree).length === 1, "exactly one row");
	assert(textOf(byClassExact(tree, "st_title")[0]) === "Schedule", "title stays Schedule");
	assert(textOf(byClassExact(tree, "st_count")[0]) === "1 item", `count must be singular '1 item', got ${JSON.stringify(textOf(byClassExact(tree, "st_count")[0]))}`);
	const row = rows(tree)[0];
	assert(row.el.props.className === "st_row", "future reminder is not overdue");
	assert(rowStatuses(tree)[0] === "Scheduled", `status must be 'Scheduled', got ${JSON.stringify(rowStatuses(tree)[0])}`);
	const meta = rowMetas(tree)[0];
	assert(meta.length === 5, `meta carries frequency·time·relative (5 spans), got ${meta.length}: ${JSON.stringify(meta)}`);
	assert(meta[0] === "Once", `one-shot frequency must read 'Once', got ${JSON.stringify(meta[0])}`);
	assertIncludes(meta[4], "in 10 minutes", "relative countdown");
	assert(byTag(tree, "li")[0].el.key === "schedule-1", "row key is the record id (stable reconciliation)");
	assert(harness.liveTimers() === 1, `one interval while records exist, got ${harness.liveTimers()}`);
});

// ── 4. Overdue ordering ──────────────────────────────────────────────────────
await scenario("overdue ordering: overdue first, then future ascending", async () => {
	const { tree, projection, harness } = await env();
	projection.value = [
		record("schedule-1", "at", "Future B", inMin(30)),
		record("schedule-2", "at", "Future A", inMin(5)),
		record("schedule-3", "after", "Overdue A", agoMin(30), { afterSeconds: 600 }),
		record("schedule-4", "after", "Overdue B", agoMin(1), { afterSeconds: 60 }),
	];
	harness.rerender();
	assert(rowPrompts(tree).join("|") === "Overdue A|Overdue B|Future A|Future B",
		`expected overdue-first ascending order, got ${JSON.stringify(rowPrompts(tree))}`);
	assert(rowStatuses(tree).join("|") === "Overdue|Overdue|Scheduled|Scheduled", `statuses wrong: ${JSON.stringify(rowStatuses(tree))}`);
	assert(byClass(tree, "st_rowOverdue").length === 2, "exactly the two overdue rows carry the warning style");
	assertIncludes(rowMetas(tree)[0][4], "30 minutes overdue", "overdue relative label");
	assertIncludes(rowMetas(tree)[1][4], "1 minute overdue", "overdue relative label (singular unit)");
	assertIncludes(rowMetas(tree)[2][4], "in 5 minutes", "future relative label");
	assertIncludes(rowMetas(tree)[3][4], "in 30 minutes", "future relative label");
	assert(harness.liveTimers() === 1, "one shared interval for all rows");
});

// ── 5. Fixed-rate formatting ─────────────────────────────────────────────────
await scenario("fixed-rate formatting: largest exact whole unit, no rounding", async () => {
	const { tree, projection, harness } = await env();
	projection.value = [
		record("schedule-1", "every", "Water the plants", inHour(1), { everySeconds: 3600 }),
		record("schedule-2", "every", "Weekly review", iso(T0 + 5 * 86_400_000), { everySeconds: 5 * 86_400 }),
		record("schedule-3", "every", "Half-hour ping", iso(T0 + 1800), { everySeconds: 1800 }),
		record("schedule-4", "every", "Prime interval", iso(T0 + 3700), { everySeconds: 3700 }),
	];
	harness.rerender();
	// Rows are ordered by target time, so match by frequency set, not position.
	const freqs = rowMetas(tree).map((m) => m[0]).sort();
	// Non-round 3700s: the official algorithm keeps the largest exact whole unit
	// — 3700 is not divisible by 60, so it stays "3700 seconds" (never rounded).
	assert(JSON.stringify(freqs) === JSON.stringify(["Every 1 hour", "Every 30 minutes", "Every 3700 seconds", "Every 5 days"]),
		`expected the four formatted frequencies (rows time-ordered), got ${JSON.stringify(freqs)}`);
});

// ── 6. Live projection updates ───────────────────────────────────────────────
await scenario("live update: records appear, change, disappear; empty at the end", async () => {
	const { tree, projection, harness } = await env();
	assert(byClassExact(tree, "st_empty").length === 1, "starts empty");
	projection.value = [record("schedule-1", "at", "First", inMin(5))];
	harness.rerender();
	assert(rows(tree).length === 1, "row appears on the live projection update");
	projection.value = [
		record("schedule-1", "at", "First", inMin(5)),
		record("schedule-2", "at", "Second", inMin(15)),
	];
	harness.rerender();
	assert(rows(tree).length === 2, "a second record appends");
	assert(rowPrompts(tree)[0] === "First" && rowPrompts(tree)[1] === "Second", "order follows the projection");
	projection.value = [record("schedule-2", "at", "Second", inMin(15))];
	harness.rerender();
	assert(rows(tree).length === 1, "deletion removes the row");
	assert(rowPrompts(tree)[0] === "Second", "the surviving row remains");
	projection.value = [];
	harness.rerender();
	assert(byClassExact(tree, "st_empty").length === 1, "removing the last record returns to the empty state");
	assert(harness.liveTimers() === 0, "the clock interval is cleaned up when empty");
	projection.value = [record("schedule-3", "at", "Third", inMin(20))];
	harness.rerender();
	assert(rows(tree).length === 1, "records can reappear after the empty state");
	assert(harness.liveTimers() === 1, "the clock interval restarts with the records");
});

// ── 7. Clock ticks ───────────────────────────────────────────────────────────
await scenario("clock tick: countdown updates, then flips to overdue", async () => {
	const { tree, projection, harness } = await env();
	projection.value = [record("schedule-1", "at", "Deadline", inMin(2))];
	harness.rerender();
	assertIncludes(rowMetas(tree)[0][4], "in 2 minutes", "initial relative");
	assert(rowStatuses(tree)[0] === "Scheduled", "initially scheduled");
	const fired = harness.advance(70_000); // 70s later (2 min → 50s remaining)
	assert(fired >= 1, "the per-second tick fired");
	assert(rowStatuses(tree)[0] === "Scheduled", "still scheduled before the target");
	// Sub-minute remainders use the seconds unit (mirrors the official catalog):
	// ceil(50s / 1s) = "in 50 seconds".
	assertIncludes(rowMetas(tree)[0][4], "in 50 seconds", "countdown in whole seconds while under a minute");
	harness.advance(61_000); // cross the target (11s overdue: 70s + 61s = 131s > 120s)
	assert(rowStatuses(tree)[0] === "Overdue", `flips to Overdue at the target, got ${JSON.stringify(rowStatuses(tree)[0])}`);
	assert(byClass(tree, "st_rowOverdue").length === 1, "warning style applied after the flip");
	assertIncludes(rowMetas(tree)[0][4], "11 seconds overdue", "small overdue remainders use the seconds unit");
});

// ── 8. Chinese locale ────────────────────────────────────────────────────────
await scenario("zh locale: panel and tab copy switch to Chinese", async () => {
	const locale = makeLocale();
	const { tree, projection, harness, recorded } = await env({ locale });
	projection.value = [record("schedule-1", "at", "提醒一", inMin(10))];
	harness.rerender();
	assert(textOf(byClassExact(tree, "st_title")[0]) === "Schedule", "en title before the switch");
	// The bound t and the tab label read the active language live; switching it
	// re-renders the slot copy without a reload.
	locale.active = "zh";
	harness.rerender();
	assert(textOf(byClassExact(tree, "st_title")[0]) === "日程", `zh title must be 日程, got ${JSON.stringify(textOf(byClassExact(tree, "st_title")[0]))}`);
	assert(textOf(byClassExact(tree, "st_count")[0]) === "1 项", `zh count, got ${JSON.stringify(textOf(byClassExact(tree, "st_count")[0]))}`);
	assert(rowStatuses(tree)[0] === "已计划", `zh status, got ${JSON.stringify(rowStatuses(tree)[0])}`);
	assertIncludes(rowMetas(tree)[0][4], "10分钟后", "zh relative label");
	assert(recorded.panellist[0].meta.label() === "日程", `zh tab label, got ${JSON.stringify(recorded.panellist[0].meta.label())}`);
});

// ── 9. Icon fallback ─────────────────────────────────────────────────────────
await scenario("icon fallback: no clock icon in primitives → renders without throwing", async () => {
	const { tree, projection, harness } = await env({ withClock: false });
	assert(byClassExact(tree, "st_empty").length === 1, "empty state renders without the icon primitive");
	projection.value = [record("schedule-1", "at", "Still fine", inMin(10))];
	harness.rerender();
	assert(rows(tree).length === 1, "rows render without the icon primitive");
	assert(byTag(tree, "svg.clock").length === 0, "no icon element when the primitive is absent");
});

// ── 10. CSS dedupe ───────────────────────────────────────────────────────────
await scenario("css: style tag injected once, deduped across re-materialization", async () => {
	const { harness } = await env();
	const tags = () => harness.document.head.children.filter((n) => n.tagName === "STYLE");
	assert(tags().length === 1, "factory execution injects exactly one style tag");
	assert(tags()[0].dataset.plugin === "@maxim/dsh-schedule-tab", "style tag carries the plugin owner attribute");
	assert(tags()[0].dataset.pluginCss === "@maxim/dsh-schedule-tab/SchedulePanel.module.css", "style tag id renamed with the panel");
	assert(tags()[0].textContent.includes(".st_root"), "the stylesheet body is present");
	// Simulate an HMR re-execution of the same script against the same document.
	await loadBundle({ primitives: makePrimitives(), clock: new FakeClock(T0), document: harness.document });
	assert(tags().length === 1, "re-materialization must not duplicate the style tag");
});

// ── Summary ───────────────────────────────────────────────────────────────────
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} scenarios passed`);
if (failed.length > 0) {
	for (const f of failed) console.log(`FAILED: ${f.name}\n  ${f.error?.stack ?? f.error}`);
	process.exitCode = 1;
}

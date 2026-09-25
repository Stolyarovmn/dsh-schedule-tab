// Client behavior scenarios for the Schedule tab.
import {
	FakeClock,
	byClass,
	byClassExact,
	byTag,
	childTexts,
	makeCtx,
	makeUiWorkspace,
	makeLocale,
	makeSessions,
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

const T0 = Date.parse("2026-09-23T12:00:00.000Z");
const iso = (ms) => new Date(ms).toISOString();
const inMin = (m) => iso(T0 + m * 60_000);
const inHour = (h) => iso(T0 + h * 3_600_000);
const agoMin = (m) => iso(T0 - m * 60_000);

const record = (id, kind, prompt, scheduledAt, extra = {}) =>
	({ id, kind, prompt, scheduledAt, ...extra });

const session = (id, title, schedule = [], extra = {}) => ({
	id,
	displayTitle: title ?? id,
	running: false,
	blank: false,
	updatedAt: T0,
	...(title !== undefined ? { title } : {}),
	...(schedule.length ? { projectionValues: { schedule } } : {}),
	...extra,
});
const listSnapshot = (sessions, current) => ({
	ids: sessions.map((s) => s.id),
	byId: Object.fromEntries(sessions.map((s) => [s.id, s])),
	current: current ?? sessions[0]?.id,
	phase: "live",
});

function makePrimitives({ withClock = true } = {}) {
	const IconClock = (props) => ({ type: "svg.clock", props, children: [] });
	return withClock ? { IconClockOutline16: IconClock } : {};
}

async function env({ withClock = true, locale, sessions: sessionsMock, uiWorkspace } = {}) {
	const localeMock = locale ?? makeLocale();
	const sessions = sessionsMock ?? makeSessions(listSnapshot([]));
	const uiWorkspaceMock = uiWorkspace ?? makeUiWorkspace();
	const { registration, exports, harness } = await loadBundle({
		primitives: makePrimitives({ withClock }),
		clock: new FakeClock(T0),
	});
	assert(registration.id === "@stolyarovmn/dsh-client-ui-schedule-tab",
		`bundle registration id must be the package name, got ${registration.id}`);
	const { ctx, recorded } = makeCtx(localeMock, { sessions, uiWorkspace: uiWorkspaceMock });
	assert(Array.isArray(exports.inject), "bundle must export the inject array");
	exports.apply(ctx);
	const mainReg = recorded.main.find((r) => r.meta.key === "schedule");
	assert(mainReg, "apply must register the keyed main occupant");
	const panel = mainReg.Component;
	const tree = harness.render({
		type: panel,
		props: { t: localeMock.bind("schedule-tab") },
		children: [],
	});
	return {
		harness, tree, recorded, exports, panel, locale: localeMock,
		sessions, uiWorkspace: uiWorkspaceMock,
		calls: { openSession: uiWorkspaceMock.calls.openSession },
	};
}

const rows = (tree) => byClass(tree, "st_row");
const rowPrompts = (tree) => rows(tree).map((r) => textOf(byClassExact(r, "st_prompt")[0]));
const rowStatuses = (tree) => rows(tree).map((r) => textOf(byClassExact(r, "st_status")[0]));
const rowMetas = (tree) => rows(tree).map((r) => childTexts(byClassExact(r, "st_meta")[0]));
const rowSources = (tree) => rows(tree).map((r) => textOf(byClassExact(r, "st_sourceName")[0]));

await scenario("registration: dictionaries, tab entry, single global main key, inject names", async () => {
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
	assert(recorded.main.length === 1, "exactly one main registration (the global occupant)");
	assert(recorded.main[0].meta.key === "schedule", `main key must be 'schedule', got ${JSON.stringify(recorded.main[0].meta.key)}`);
	assert(recorded.main[0].meta.locale === "schedule-tab", "main occupant is locale-aware");
	assert(recorded.main[0].meta.children === undefined, "global occupant declares no session-maybe child (data is global)");
	assert(recorded.mainSchedule.length === 0, "no main.schedule child registration in the global design");
	assert(typeof exports.apply === "function", "bundle exports apply");
	for (const name of ["slots", "locale", "sessions", "uiWorkspace"]) {
		assert(exports.inject.includes(name), `inject must name the '${name}' service`);
	}
});

await scenario("empty state: no dialogs with records → empty view, zero items", async () => {
	const { tree, harness } = await env();
	assert(textOf(byClassExact(tree, "st_title")[0]) === "Schedule", `panel title must be 'Schedule', got ${JSON.stringify(textOf(byClassExact(tree, "st_title")[0]))}`);
	assert(textOf(byClassExact(tree, "st_count")[0]) === "0 items", `count must read '0 items', got ${JSON.stringify(textOf(byClassExact(tree, "st_count")[0]))}`);
	const empty = byClassExact(tree, "st_empty")[0];
	assert(empty, "empty state renders when no dialog has records");
	assertIncludes(textOf(byClassExact(empty, "st_emptyTitle")[0]), "Nothing scheduled", "empty title");
	assert(byTag(tree, "li").length === 0, "no rows in the empty state");
	assert(harness.liveTimers() === 0, "no per-second interval while empty");
});

await scenario("one future reminder: row, source dialog, status, frequency, countdown", async () => {
	const env0 = await env();
	env0.sessions.list.set(listSnapshot([session("s1", "Build pipeline", [record("schedule-1", "after", "Check the build", inMin(10), { afterSeconds: 600 })])]));
	env0.harness.rerender();
	const tree = env0.tree;
	assert(rows(tree).length === 1, "exactly one row");
	assert(textOf(byClassExact(tree, "st_title")[0]) === "Schedule", "title stays Schedule");
	assert(textOf(byClassExact(tree, "st_count")[0]) === "1 item", `count must be singular '1 item', got ${JSON.stringify(textOf(byClassExact(tree, "st_count")[0]))}`);
	const row = rows(tree)[0];
	assert(row.el.props.className === "st_row", "future reminder is not overdue");
	assert(rowStatuses(tree)[0] === "Scheduled", `status must be 'Scheduled', got ${JSON.stringify(rowStatuses(tree)[0])}`);
	assert(rowSources(tree)[0] === "Build pipeline", `row must name its source dialog, got ${JSON.stringify(rowSources(tree)[0])}`);
	const meta = rowMetas(tree)[0];
	assert(meta.length === 5, `meta carries frequency·time·relative (5 spans), got ${meta.length}: ${JSON.stringify(meta)}`);
	assert(meta[0] === "Once", `one-shot frequency must read 'Once', got ${JSON.stringify(meta[0])}`);
	assertIncludes(meta[4], "in 10 minutes", "relative countdown");
	assert(byTag(tree, "li")[0].el.key === "s1:schedule-1", "row key is dialog:record (stable reconciliation)");
	assert(env0.harness.liveTimers() === 1, `one interval while records exist, got ${env0.harness.liveTimers()}`);
});

await scenario("overdue ordering: overdue first, then future ascending, across dialogs", async () => {
	const env0 = await env();
	env0.sessions.list.set(listSnapshot([
		session("s-fut-b", "Fut B", [record("r1", "at", "Future B", inMin(30))]),
		session("s-fut-a", "Fut A", [record("r2", "at", "Future A", inMin(5))]),
		session("s-ovd-a", "Ovd A", [record("r3", "after", "Overdue A", agoMin(30), { afterSeconds: 600 })]),
		session("s-ovd-b", "Ovd B", [record("r4", "after", "Overdue B", agoMin(1), { afterSeconds: 60 })]),
	]));
	env0.harness.rerender();
	const tree = env0.tree;
	assert(rowPrompts(tree).join("|") === "Overdue A|Overdue B|Future A|Future B",
		`expected overdue-first ascending order, got ${JSON.stringify(rowPrompts(tree))}`);
	assert(rowStatuses(tree).join("|") === "Overdue|Overdue|Scheduled|Scheduled", `statuses wrong: ${JSON.stringify(rowStatuses(tree))}`);
	assert(rowSources(tree).join("|") === "Ovd A|Ovd B|Fut A|Fut B", `source follows the row, got ${JSON.stringify(rowSources(tree))}`);
	assert(byClass(tree, "st_rowOverdue").length === 2, "exactly the two overdue rows carry the warning style");
	assertIncludes(rowMetas(tree)[0][4], "30 minutes overdue", "overdue relative label");
	assertIncludes(rowMetas(tree)[1][4], "1 minute overdue", "overdue relative label (singular unit)");
	assertIncludes(rowMetas(tree)[2][4], "in 5 minutes", "future relative label");
	assertIncludes(rowMetas(tree)[3][4], "in 30 minutes", "future relative label");
	assert(env0.harness.liveTimers() === 1, "one shared interval for all rows");
});

await scenario("aggregation: records from several dialogs merge into one list", async () => {
	const env0 = await env();
	env0.sessions.list.set(listSnapshot([
		session("s1", "Alpha", [record("a1", "at", "Alpha task", inMin(40)), record("a2", "at", "Alpha task 2", inMin(41))]),
		session("s2", "Beta", [record("b1", "at", "Beta task", inMin(20))]),
		session("s3", "No records", []),
	]));
	env0.harness.rerender();
	const tree = env0.tree;
	assert(rows(tree).length === 3, "all three records from the two dialogs appear (the empty dialog is skipped)");
	assert(rowPrompts(tree).join("|") === "Beta task|Alpha task|Alpha task 2", "merged list is time-ordered across dialogs");
	assert(rowSources(tree).join("|") === "Beta|Alpha|Alpha", "each row carries its own dialog");
	assert(textOf(byClassExact(tree, "st_count")[0]) === "3 items", `count is the total across dialogs, got ${JSON.stringify(textOf(byClassExact(tree, "st_count")[0]))}`);
});

await scenario("fixed-rate formatting: largest exact whole unit, no rounding", async () => {
	const env0 = await env();
	env0.sessions.list.set(listSnapshot([session("s1", "Recurring", [
		record("e1", "every", "Water the plants", inHour(1), { everySeconds: 3600 }),
		record("e2", "every", "Weekly review", iso(T0 + 5 * 86_400_000), { everySeconds: 5 * 86_400 }),
		record("e3", "every", "Half-hour ping", iso(T0 + 1800), { everySeconds: 1800 }),
		record("e4", "every", "Prime interval", iso(T0 + 3700), { everySeconds: 3700 }),
	])]))
	;
	env0.harness.rerender();
	const tree = env0.tree;
	const freqs = rowMetas(tree).map((m) => m[0]).sort();
	assert(JSON.stringify(freqs) === JSON.stringify(["Every 1 hour", "Every 30 minutes", "Every 3700 seconds", "Every 5 days"]),
		`expected the four formatted frequencies (rows time-ordered), got ${JSON.stringify(freqs)}`);
});

await scenario("live update: records appear, change, disappear across the list", async () => {
	const env0 = await env();
	assert(byClassExact(env0.tree, "st_empty").length === 1, "starts empty");
	env0.sessions.list.set(listSnapshot([session("s1", "D1", [record("r1", "at", "First", inMin(5))])]));
	env0.harness.rerender();
	assert(rows(env0.tree).length === 1, "row appears on the live session-list update");
	env0.sessions.list.set(listSnapshot([
		session("s1", "D1", [record("r1", "at", "First", inMin(5)), record("r2", "at", "Second", inMin(15))]),
	]));
	env0.harness.rerender();
	assert(rows(env0.tree).length === 2, "a second record appends");
	assert(rowPrompts(env0.tree)[0] === "First" && rowPrompts(env0.tree)[1] === "Second", "order follows the list");
	env0.sessions.list.set(listSnapshot([session("s1", "D1", [record("r2", "at", "Second", inMin(15))])]));
	env0.harness.rerender();
	assert(rows(env0.tree).length === 1, "deletion removes the row");
	assert(rowPrompts(env0.tree)[0] === "Second", "the surviving row remains");
	env0.sessions.list.set(listSnapshot([session("s1", "D1", [])]));
	env0.harness.rerender();
	assert(byClassExact(env0.tree, "st_empty").length === 1, "removing the last record returns to the empty state");
	assert(env0.harness.liveTimers() === 0, "the clock interval is cleaned up when empty");
	env0.sessions.list.set(listSnapshot([session("s2", "D2", [record("r3", "at", "Third", inMin(20))])]));
	env0.harness.rerender();
	assert(rows(env0.tree).length === 1, "records can reappear (even from a different dialog)");
	assert(rowSources(env0.tree)[0] === "D2", "the new row names the new dialog");
	assert(env0.harness.liveTimers() === 1, "the clock interval restarts with the records");
});

await scenario("clock tick: countdown updates, then flips to overdue", async () => {
	const env0 = await env();
	env0.sessions.list.set(listSnapshot([session("s1", "D1", [record("r1", "at", "Deadline", inMin(2))])]));
	env0.harness.rerender();
	assertIncludes(rowMetas(env0.tree)[0][4], "in 2 minutes", "initial relative");
	assert(rowStatuses(env0.tree)[0] === "Scheduled", "initially scheduled");
	const fired = env0.harness.advance(70_000); // 70s later (2 min → 50s remaining)
	assert(fired >= 1, "the per-second tick fired");
	assert(rowStatuses(env0.tree)[0] === "Scheduled", "still scheduled before the target");
	assertIncludes(rowMetas(env0.tree)[0][4], "in 50 seconds", "countdown in whole seconds while under a minute");
	env0.harness.advance(61_000); // cross the target (11s overdue: 70s + 61s = 131s > 120s)
	assert(rowStatuses(env0.tree)[0] === "Overdue", `flips to Overdue at the target, got ${JSON.stringify(rowStatuses(env0.tree)[0])}`);
	assert(byClass(env0.tree, "st_rowOverdue").length === 1, "warning style applied after the flip");
	assertIncludes(rowMetas(env0.tree)[0][4], "11 seconds overdue", "small overdue remainders use the seconds unit");
});

await scenario("0.1.7 projections: refreshes cold sessions and reads projectionsBySession", async () => {
	const initial = {
		...listSnapshot([session("s-cold", "Cold dialog")]),
		projectionsBySession: {},
	};
	const sessions = makeSessions(initial);
	const refreshCalls = [];
	sessions.refreshProjections = async (id) => { refreshCalls.push(id); };
	const env0 = await env({ sessions });
	assert(refreshCalls.length === 1 && refreshCalls[0] === "s-cold",
		`cold 0.1.7 Session must request its full projection, got ${JSON.stringify(refreshCalls)}`);
	assertIncludes(textOf(byClassExact(env0.tree, "st_emptyTitle")[0]), "Loading schedule", "modern loading state");

	sessions.list.set({
		...initial,
		projectionsBySession: {
			"s-cold": {
				state: "ready",
				error: null,
				values: { schedule: [record("r-modern", "at", "Modern projection", inMin(8))] },
			},
		},
	});
	env0.harness.rerender();
	assert(rows(env0.tree).length === 1, "0.1.7 projectionsBySession schedule becomes visible");
	assert(rowPrompts(env0.tree)[0] === "Modern projection", "modern projection record is rendered");
	assert(rowSources(env0.tree)[0] === "Cold dialog", "modern projection keeps source Session metadata");
});

await scenario("0.1.7 diagnostics: missing Schedule projection is reported instead of fake empty state", async () => {
	const snapshot = {
		...listSnapshot([session("s1", "No Schedule service")]),
		projectionsBySession: {
			s1: { state: "ready", error: null, values: { title: "No Schedule service" } },
		},
	};
	const sessions = makeSessions(snapshot);
	sessions.refreshProjections = async () => {};
	const env0 = await env({ sessions });
	assertIncludes(textOf(byClassExact(env0.tree, "st_emptyTitle")[0]), "Schedule is not enabled", "disabled Schedule diagnostic");
	assertIncludes(textOf(byClassExact(env0.tree, "st_emptyHint")[0]), "background shell jobs", "background jobs distinction");
});

await scenario("0.1.7 precedence: projectionsBySession wins over legacy list hints", async () => {
	const legacy = session("s1", "Mixed", [record("legacy", "at", "Stale legacy", inMin(20))]);
	const snapshot = {
		...listSnapshot([legacy]),
		projectionsBySession: {
			s1: {
				state: "ready",
				error: null,
				values: { schedule: [record("modern", "at", "Fresh modern", inMin(10))] },
			},
		},
	};
	const sessions = makeSessions(snapshot);
	sessions.refreshProjections = async () => {};
	const env0 = await env({ sessions });
	assert(rowPrompts(env0.tree).join("|") === "Fresh modern",
		`modern projection must replace stale list hint, got ${JSON.stringify(rowPrompts(env0.tree))}`);
});

await scenario("click-through: clicking a row opens its dialog through uiWorkspace", async () => {
	const env0 = await env();
	env0.sessions.list.set(listSnapshot([
		session("s1", "Alpha", [record("a1", "at", "Alpha task", inMin(40))]),
		session("s2", "Beta", [record("b1", "at", "Beta task", inMin(20))]),
	]));
	env0.harness.rerender();
	const tree = env0.tree;
	const rowFor = (prompt) => rows(tree).find((r) => textOf(byClassExact(r, "st_prompt")[0]) === prompt);
	const betaRow = rowFor("Beta task");
	const alphaRow = rowFor("Alpha task");
	assert(betaRow && alphaRow, "both rows are present");
	betaRow.el.props.onClick();
	assert(env0.calls.openSession.length === 1 && env0.calls.openSession[0] === "s2",
		`clicking Beta must open dialog s2, got ${JSON.stringify(env0.calls.openSession)}`);
	alphaRow.el.props.onClick();
	assert(env0.calls.openSession.length === 2 && env0.calls.openSession[1] === "s1",
		`clicking Alpha must open dialog s1, got ${JSON.stringify(env0.calls.openSession)}`);
	alphaRow.el.props.onKeyDown({ key: "Enter" });
	assert(env0.calls.openSession.length === 3 && env0.calls.openSession[2] === "s1", "Enter activates the row");
	assert(rowFor("Alpha task").el.props.tabIndex === 0, "rows are keyboard-focusable");
});

await scenario("source label: title → displayTitle → id fallback chain", async () => {
	const env0 = await env();
	env0.sessions.list.set(listSnapshot([
		session("s-title", "Named dialog", [record("t1", "at", "Has title", inMin(30))]),
		{ id: "s-display", displayTitle: "Shown name", running: false, blank: false, updatedAt: T0, projectionValues: { schedule: [record("t2", "at", "Display only", inMin(10))] } },
		{ id: "s-idonly", running: false, blank: false, updatedAt: T0, projectionValues: { schedule: [record("t3", "at", "Id fallback", inMin(60))] } },
	]));
	env0.harness.rerender();
	const tree = env0.tree;
	const byPrompt = Object.fromEntries(rows(tree).map((r) => [textOf(byClassExact(r, "st_prompt")[0]), textOf(byClassExact(r, "st_sourceName")[0])]));
	assert(byPrompt["Has title"] === "Named dialog", `title wins over displayTitle, got ${JSON.stringify(byPrompt["Has title"])}`);
	assert(byPrompt["Display only"] === "Shown name", `displayTitle used when title absent, got ${JSON.stringify(byPrompt["Display only"])}`);
	assert(byPrompt["Id fallback"] === "s-idonly", `id used as last resort, got ${JSON.stringify(byPrompt["Id fallback"])}`);
});

await scenario("zh locale: panel and tab copy switch to Chinese", async () => {
	const locale = makeLocale();
	const env0 = await env({ locale });
	env0.sessions.list.set(listSnapshot([session("s1", "提醒对话", [record("r1", "at", "提醒一", inMin(10))])]));
	env0.harness.rerender();
	assert(textOf(byClassExact(env0.tree, "st_title")[0]) === "Schedule", "en title before the switch");
	locale.active = "zh";
	env0.harness.rerender();
	assert(textOf(byClassExact(env0.tree, "st_title")[0]) === "日程", `zh title must be 日程, got ${JSON.stringify(textOf(byClassExact(env0.tree, "st_title")[0]))}`);
	assert(textOf(byClassExact(env0.tree, "st_count")[0]) === "1 项", `zh count, got ${JSON.stringify(textOf(byClassExact(env0.tree, "st_count")[0]))}`);
	assert(rowStatuses(env0.tree)[0] === "已计划", `zh status, got ${JSON.stringify(rowStatuses(env0.tree)[0])}`);
	assert(textOf(byClassExact(env0.tree, "st_sourceLabel")[0]) === "来自", `zh source label, got ${JSON.stringify(textOf(byClassExact(env0.tree, "st_sourceLabel")[0]))}`);
	assertIncludes(rowMetas(env0.tree)[0][4], "10分钟后", "zh relative label");
	assert(env0.recorded.panellist[0].meta.label() === "日程", `zh tab label, got ${JSON.stringify(env0.recorded.panellist[0].meta.label())}`);
});

await scenario("icon fallback: no clock icon in primitives → renders without throwing", async () => {
	const env0 = await env({ withClock: false });
	assert(byClassExact(env0.tree, "st_empty").length === 1, "empty state renders without the icon primitive");
	env0.sessions.list.set(listSnapshot([session("s1", "D1", [record("r1", "at", "Still fine", inMin(10))])]));
	env0.harness.rerender();
	assert(rows(env0.tree).length === 1, "rows render without the icon primitive");
	assert(byTag(env0.tree, "svg.clock").length === 0, "no icon element when the primitive is absent");
});

await scenario("css: style tag injected once, deduped across re-materialization", async () => {
	const { harness } = await env();
	const tags = () => harness.document.head.children.filter((n) => n.tagName === "STYLE");
	assert(tags().length === 1, "factory execution injects exactly one style tag");
	assert(tags()[0].dataset.plugin === "@stolyarovmn/dsh-client-ui-schedule-tab", "style tag identifies the plugin");
	assert(tags()[0].dataset.pluginCss === "@stolyarovmn/dsh-client-ui-schedule-tab/SchedulePanel.module.css", "style tag id matches the package");
	assert(tags()[0].textContent.includes(".st_root"), "the stylesheet body is present");
	await loadBundle({ primitives: makePrimitives(), clock: new FakeClock(T0), document: harness.document });
	assert(tags().length === 1, "re-materialization must not duplicate the style tag");
});

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} scenarios passed`);
if (failed.length > 0) {
	for (const f of failed) console.log(`FAILED: ${f.name}\n  ${f.error?.stack ?? f.error}`);
	process.exitCode = 1;
}

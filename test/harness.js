// Minimal browser and service harness for client bundle tests.

// Fake clock
export class FakeClock {
	#now;
	constructor(start) {
		this.#now = start ?? new Date().getTime();
	}
	get now() { return this.#now; }
	set now(value) { this.#now = value; }
	advance(ms) { this.#now += ms; return this.#now; }
	install() {
		const realDate = globalThis.Date;
		const clock = this;
		class FakeDate extends realDate {
			constructor(...args) {
				if (args.length === 0) super(clock.now);
				else super(...args);
			}
			static now() { return clock.now; }
		}
		FakeDate.parse = realDate.parse;
		FakeDate.UTC = realDate.UTC;
		const previous = globalThis.Date;
		globalThis.Date = FakeDate;
		return () => { globalThis.Date = previous; };
	}
}

// Minimal DOM
function makeElement(tagName) {
	return {
		tagName: tagName.toUpperCase(),
		dataset: {},
		textContent: "",
		children: [],
		style: {},
		appendChild(child) { this.children.push(child); },
	};
}
function makeDocument() {
	const document = {
		documentElement: { lang: "en" },
		head: makeElement("head"),
		body: makeElement("body"),
		createElement: (tag) => makeElement(tag),
		// The only selector the bundle issues: style[data-plugin-css="..."]
		querySelector(selector) {
			const match = /^style\[data-plugin-css="(.*)"\]$/.exec(selector);
			if (!match) return null;
			const scan = (nodes) => {
				for (const node of nodes) {
					if (node.tagName === "STYLE" && node.dataset.pluginCss === match[1]) return node;
					const found = scan(node.children ?? []);
					if (found) return found;
				}
				return null;
			};
			return scan([document.head]);
		},
	};
	return document;
}

// Mini React (enough of the hook/component contract the bundle uses)
const depsEqual = (a, b) =>
	a === b || (Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v, i) => Object.is(v, b[i])));

export class MiniReact {
	#dirty = false;
	#root = null;
	#pendingEffects = [];
	#current = null;
	#timers = [];
	#uninstallClock = null;
	#uninstallDocument = null;
	clock;
	window;
	document;
	constructor(options = {}) {
		this.clock = options.clock ?? new FakeClock();
		this.document = options.document ?? makeDocument();
		this.window = {
			document: this.document,
			setInterval: (fn, ms) => this.#armTimer(fn, ms, true),
			clearInterval: (id) => { const t = this.#timers[id]; if (t) t.alive = false; },
		};
	}
	installGlobals() {
		if (this.#uninstallClock === null && this.clock) this.#uninstallClock = this.clock.install();
		if (this.#uninstallDocument === null) {
			const prev = globalThis.document;
			globalThis.document = this.document;
			this.#uninstallDocument = () => { globalThis.document = prev; };
		}
	}
	dispose() {
		this.#uninstallClock?.();
		this.#uninstallClock = null;
		this.#uninstallDocument?.();
		this.#uninstallDocument = null;
	}
	liveTimers() { return this.#timers.filter((t) => t.alive).length; }
	#armTimer(fn, ms, repeating) {
		const id = this.#timers.length;
		this.#timers.push({ id, fn, ms, repeating, next: this.clock.now + ms, alive: true });
		return id;
	}
	advance(ms) {
		this.clock.advance(ms);
		let fired = 0;
		for (const t of this.#timers) {
			if (!t.alive || !t.repeating) continue;
			while (t.next <= this.clock.now) { t.fn(); fired += 1; t.next += t.ms; }
		}
		this.flush();
		return fired;
	}
	#aliveTimers() { return this.#timers.filter((t) => t.alive).length; }
	// Hooks ──────────────────────────────────────────────────────────────────
	get useState() {
		return (init) => {
			const inst = this.#current;
			const i = inst.hookIndex++;
			if (inst.states[i] === undefined) inst.states[i] = typeof init === "function" ? init() : init;
			return [inst.states[i], (value) => {
				inst.states[i] = typeof value === "function" ? value(inst.states[i]) : value;
				this.#dirty = true;
			}];
		};
	}
	get useEffect() {
		return (fn, deps) => {
			const inst = this.#current;
			const i = inst.hookIndex++;
			const prev = inst.effects[i];
			const changed = deps === undefined || prev === undefined || !depsEqual(prev.deps, deps);
			if (!changed) return;
			const entry = { deps, fn, cleanup: prev?.cleanup };
			inst.effects[i] = entry;
			this.#pendingEffects.push(entry);
		};
	}
	// Rendering ──────────────────────────────────────────────────────────────
	#renderComponent(node) {
		const inst = node.inst;
		const oldChildren = node.childNodes;
		inst.hookIndex = 0;
		this.#current = inst;
		let el;
		try {
			el = inst.type(inst.props);
		} finally {
			this.#current = null;
		}
		el = normalize(el);
		if (typeof el.type === "function") {
			// The component returned a component element: mount it as the
			// node's single child (React renders the returned element in place).
			node.el = { type: "component-host", props: {}, children: [] };
			this.#reconcileChildren(node, oldChildren, [el]);
		} else {
			node.el = el;
			this.#reconcileChildren(node, oldChildren, el.children ?? []);
		}
	}
	#reconcileChildren(parentNode, oldNodes, newEls) {
		parentNode.childNodes = [];
		for (let i = 0; i < newEls.length; i++) {
			const newEl = normalize(newEls[i]);
			const oldNode = oldNodes[i];
			if (oldNode && oldNode.inst && typeof newEl.type === "function" && oldNode.inst.type === newEl.type) {
				// Re-render an existing component instance in place.
				oldNode.inst.props = newEl.props;
				oldNode.el = newEl;
				this.#renderComponent(oldNode);
				parentNode.childNodes.push(oldNode);
			} else if (oldNode && !oldNode.inst && newEl.type === "void" && oldNode.el.type === "void") {
				parentNode.childNodes.push(oldNode);
			} else if (oldNode && !oldNode.inst && typeof newEl.type === "string" && newEl.type === oldNode.el.type) {
				// Same host element type: swap the element and recurse into children.
				oldNode.el = newEl;
				this.#reconcileChildren(oldNode, oldNode.childNodes, newEl.children ?? []);
				parentNode.childNodes.push(oldNode);
			} else {
				if (oldNode) this.#unmount(oldNode);
				const childNode = { inst: null, el: newEl, parent: parentNode, childNodes: [] };
				if (typeof newEl.type === "function") {
					const inst = { type: newEl.type, props: newEl.props, states: [], effects: [], hookIndex: 0 };
					childNode.inst = inst;
					this.#instances.add(inst);
					this.#renderComponent(childNode);
				} else if (typeof newEl.type === "string") {
					this.#reconcileChildren(childNode, [], newEl.children ?? []);
				}
				parentNode.childNodes.push(childNode);
			}
		}
		for (let i = newEls.length; i < oldNodes.length; i++) this.#unmount(oldNodes[i]);
	}
	#instances = new Set();
	#unmount(node) {
		// Callers own the childNodes arrays (the reconciler rebuilds them);
		// unmount only detaches state and runs cleanups.
		const walk = (n) => {
			for (const child of n.childNodes ?? []) walk(child);
			if (n.inst) {
				this.#instances.delete(n.inst);
				for (const entry of n.inst.effects) entry?.cleanup?.();
				n.inst.effects = [];
			}
		};
		walk(node);
	}
	render(element) {
		const el = normalize(element);
		const node = { inst: null, el, parent: null, childNodes: [] };
		if (typeof el.type === "function") {
			const inst = { type: el.type, props: el.props, states: [], effects: [], hookIndex: 0 };
			node.inst = inst;
			this.#instances.add(inst);
			this.#renderComponent(node);
		}
		this.#root = node;
		this.flush();
		return node;
	}
	rerender() { this.#dirty = true; return this.flush(); }
	flush() {
		let guard = 0;
		while ((this.#dirty || this.#pendingEffects.length > 0) && guard < 100) {
			this.#dirty = false;
			guard += 1;
			if (this.#root?.inst) this.#renderComponent(this.#root);
			const due = this.#pendingEffects;
			this.#pendingEffects = [];
			for (const entry of due) {
				entry.cleanup?.();
				const result = entry.fn();
				entry.cleanup = typeof result === "function" ? result : undefined;
			}
		}
		return this.#root;
	}
}

function normalize(el) {
	if (el === null || el === undefined) return { type: "void", props: {}, children: [] };
	if (typeof el === "string" || typeof el === "number") return { type: "text", props: {}, children: [], text: String(el) };
	return el;
}

// Tree assertions (operate on the descriptor tree)
export function collectNodes(node, out = []) {
	if (!node) return out;
	if (node.el) out.push(node);
	for (const child of node.childNodes ?? []) collectNodes(child, out);
	return out;
}
export function byClass(node, ...fragments) {
	return collectNodes(node).filter((n) => {
		if (n.inst) return false;
		const cls = n.el.props.className ?? "";
		return fragments.every((f) => cls.includes(f));
	});
}
export function byClassExact(node, className) {
	return collectNodes(node).filter((n) => !n.inst && n.el.props.className === className);
}
export function byTag(node, tag) {
	return collectNodes(node).filter((n) => !n.inst && n.el.type === tag);
}
export function textOf(node) {
	let out = "";
	const walk = (n) => {
		if (n.el.type === "text") out += n.el.text;
		for (const child of n.childNodes ?? []) walk(child);
	};
	walk(node);
	return out;
}
export function childTexts(node) {
	return (node.childNodes ?? [])
		.filter((c) => !c.inst)
		.map((c) => textOf(c));
}

// Locale face mock
export function makeLocale() {
	const dictionaries = new Map();
	const locale = {
		active: "en",
		register(ns, dict) { dictionaries.set(ns, dict); },
		bind(ns) {
			return (key, params) => {
				const dict = dictionaries.get(ns)?.[locale.active];
				let text = dict?.[key];
				if (text === undefined) return key; // locale fallback shows the key
				for (const [name, value] of Object.entries(params ?? {})) {
					text = text.split(`{${name}}`).join(String(value));
				}
				return text;
			};
		},
		dictionaries,
	};
	return locale;
}

// Sessions service mock (global list snapshot + open call recording)
export function makeSessions(initialSnapshot) {
	let snapshot = initialSnapshot ?? { ids: [], byId: {}, current: undefined, phase: "pending" };
	const listeners = new Set();
	const list = {
		getSnapshot: () => snapshot,
		set: (value) => { snapshot = value; for (const listener of [...listeners]) listener(); },
		subscribe: (listener) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
	};
	const calls = { open: [] };
	return { list, calls, open: (id) => { calls.open.push(id); } };
}

// Workspace navigation service mock.
export function makeUiWorkspace() {
	const calls = { openSession: [] };
	return { calls, openSession: (id) => { calls.openSession.push(id); } };
}

// Slot ctx mock (records every registration)
export function makeCtx(locale, { sessions, uiWorkspace } = {}) {
	const recorded = {
		effects: [],
		panellist: [],
		main: [],
		mainSchedule: [],
	};
	const slots = {
		// inject runs fn to position its registrations relative to `target`;
		// the slots.register calls inside fn are the registrations themselves
		// (they self-record by meta.name), so inject must not re-record them.
		inject(target, fn) {
			if (fn.prototype?.[Symbol.iterator] || typeof fn[Symbol.iterator] === "function") {
				for (const _reg of fn()) { /* recorded by register() */ }
			} else {
				fn();
			}
		},
		register(meta, Component) {
			return dispatch(meta.name, { meta, Component });
		},
	};
	function dispatch(name, reg) {
		if (name === "sidebar.panellist") recorded.panellist.push(reg);
		else if (name === "main") recorded.main.push(reg);
		else if (name === "main.schedule") recorded.mainSchedule.push(reg);
		else recorded.panellist.push(reg);
		return reg;
	}
	return {
		recorded,
		ctx: {
			effect: (fn, label) => {
				const handle = { label, dispose: null };
				recorded.effects.push(handle);
				handle.dispose = fn();
				return handle;
			},
			slots,
			locale,
			sessions,
			uiWorkspace,
		},
	};
}

let installedHarness = null;

export async function loadBundle({ primitives, document, clock } = {}) {
	installedHarness?.dispose();
	const harness = new MiniReact({ document, clock });
	installedHarness = harness;
	harness.installGlobals();
	const registrations = [];
	const window = {
		...harness.window,
		__ModuleLoader__: { load: (registration) => registrations.push(registration) },
	};
	function childrenOf(config) {
		if (!config || config.children === undefined) return [];
		return Array.isArray(config.children) ? config.children : [config.children];
	}
	const modules = {
		react: {
			get useState() { return harness.useState; },
			get useEffect() { return harness.useEffect; },
		},
		"react/jsx-runtime": {
			// The real jsx-runtime signature: (type, props, key?)
			jsx: (type, config, key) => ({ type, props: config ?? {}, children: childrenOf(config), key }),
			jsxs: (type, config, key) => ({ type, props: config ?? {}, children: childrenOf(config), key }),
			Fragment: "fragment",
		},
		"@deepseek-ai/dsh-client-ui-primitives": primitives,
	};
	const require = (spec) => {
		if (!(spec in modules)) throw new Error(`harness: unmocked module request '${spec}'`);
		return modules[spec];
	};
	const bundlePath = new URL("../lib/client.js", import.meta.url);
	const { readFileSync } = await import("node:fs");
	const source = readFileSync(bundlePath, "utf8");
	const run = new Function("window", source + "\n;return undefined;");
	run(window);
	if (registrations.length !== 1) throw new Error(`expected exactly one bundle registration, got ${registrations.length}`);
	const { factory } = registrations[0];
	const exports = factory(require);
	return { registration: registrations[0], exports, harness, window };
}

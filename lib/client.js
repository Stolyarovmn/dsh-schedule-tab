window.__ModuleLoader__.load({
	id: "@stolyarovmn/dsh-schedule-native-manager",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let react_dom = require("react-dom");
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/vendor-primitives/Button.module.css.mjs
		var import_vendor_clsx = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
			function r(e) {
				var o, t, f = "";
				if ("string" == typeof e || "number" == typeof e) f += e;
				else if ("object" == typeof e) if (Array.isArray(e)) {
					var n = e.length;
					for (o = 0; o < n; o++) e[o] && (t = r(e[o])) && (f && (f += " "), f += t);
				} else for (t in e) e[t] && (f && (f += " "), f += t);
				return f;
			}
			function e() {
				for (var e, o, t = 0, f = "", n = arguments.length; t < n; t++) (e = arguments[t]) && (o = r(e)) && (f && (f += " "), f += o);
				return f;
			}
			module.exports = e, module.exports.clsx = e;
		})))(), 1);
		const css$12 = ".z2UeHG_button{box-sizing:border-box;border-radius:var(--dsw-radius-md);cursor:pointer;color:var(--dsw-alias-label-primary);background:0 0;border:none;justify-content:center;align-items:center;gap:4px;padding:0 14px;font-size:14px;line-height:22px;display:inline-flex}.z2UeHG_button:disabled{cursor:not-allowed;opacity:.4}.z2UeHG_md{height:36px}.z2UeHG_sm{border-radius:var(--dsw-radius-sm);height:28px;padding:0 10px;font-size:12px;line-height:18px}.z2UeHG_primary{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground)}.z2UeHG_primary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover)}.z2UeHG_ghost:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.z2UeHG_ghost:active:not(:disabled){background:var(--dsw-alias-interactive-bg-active)}.z2UeHG_outline{border:.5px solid var(--dsw-alias-border-l3);background:0 0}.z2UeHG_outline:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.z2UeHG_toolbar{background:var(--dsw-alias-button-tool-bar-fill)}.z2UeHG_toolbar:hover:not(:disabled){background:var(--dsw-alias-button-tool-bar-hover)}.z2UeHG_icon{justify-content:center;align-items:center;width:16px;height:16px;display:inline-flex}";
		const tagId$12 = "@stolyarovmn/dsh-schedule-native-manager/Button.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$12) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$12;
			tag.textContent = css$12;
			document.head.appendChild(tag);
		}
		var Button_module_css_default = {
			"button": "z2UeHG_button",
			"ghost": "z2UeHG_ghost",
			"icon": "z2UeHG_icon",
			"md": "z2UeHG_md",
			"outline": "z2UeHG_outline",
			"primary": "z2UeHG_primary",
			"sm": "z2UeHG_sm",
			"toolbar": "z2UeHG_toolbar"
		};
		//#endregion
		//#region src/vendor-primitives/Button.tsx
		/**
		* Render a button.
		* @param props.variant - visual family (default 'ghost').
		* @param props.size - 'md' 36px control with 12px corners or 'sm' 28px control with 8px corners.
		* @param props.icon - optional leading 16px icon node.
		* @param ref - native button for focus management and overlay anchors.
		* @returns the button element; native button attributes pass through.
		*/
		const Button = (0, react.forwardRef)(function Button({ variant = "ghost", size = "md", icon, className, children, ...rest }, ref) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				ref,
				type: "button",
				className: (0, import_vendor_clsx.default)(Button_module_css_default.button, Button_module_css_default[variant], Button_module_css_default[size], className),
				...rest,
				children: [icon != null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: Button_module_css_default.icon,
					children: icon
				}), children]
			});
		});
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/vendor-primitives/Input.module.css.mjs
		const css$11 = "._85GVVa_wrap{border:.5px solid var(--dsw-alias-border-l4);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-1);align-items:center;gap:6px;height:32px;padding:0 8px;display:inline-flex}._85GVVa_wrap:focus-within{border-color:var(--dsw-alias-state-business-primary)}._85GVVa_icon{width:16px;height:16px;color:var(--dsw-alias-label-tertiary);justify-content:center;align-items:center;display:inline-flex}._85GVVa_input{min-width:0;color:var(--dsw-alias-label-primary);background:0 0;border:none;outline:none;flex:1;font-size:14px;line-height:22px}._85GVVa_input::placeholder{color:var(--dsw-alias-label-dimmed)}";
		const tagId$11 = "@stolyarovmn/dsh-schedule-native-manager/Input.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$11) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$11;
			tag.textContent = css$11;
			document.head.appendChild(tag);
		}
		var Input_module_css_default = {
			"icon": "_85GVVa_icon",
			"input": "_85GVVa_input",
			"wrap": "_85GVVa_wrap"
		};
		//#endregion
		//#region src/vendor-primitives/Input.tsx
		/**
		* Render a text input with an optional leading icon.
		* @param props.icon - optional 16px leading icon node.
		* @param ref - the native input, cleared when it unmounts.
		* @returns wrapper span containing the native input; input attributes pass through.
		*/
		const Input = (0, react.forwardRef)(function Input({ icon, className, ...rest }, ref) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: (0, import_vendor_clsx.default)(Input_module_css_default.wrap, className),
				children: [icon != null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: Input_module_css_default.icon,
					children: icon
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					ref,
					className: Input_module_css_default.input,
					...rest
				})]
			});
		});
		//#endregion
		//#region src/vendor-primitives/icons/shared-artwork.tsx
		/**
		* Render shared conversation geometry — the chat bubble around two text
		* lines — for the queue product icon and session reference icons.
		* @param props - Size, optional CSS class, and inherited stroke width.
		* @returns The decorative SVG artwork.
		*/
		const ChatLinesOutlineArtwork = ({ size = 16, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M5 6.75H11",
					stroke: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M5 9H8",
					stroke: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M2.37067 11.2497C1.5872 9.89252 1.32042 8.29798 1.61945 6.7597C1.91847 5.22141 2.76317 3.84293 3.99801 2.87809C5.23285 1.91325 6.7747 1.427 8.33964 1.50888C9.90458 1.59076 11.3873 2.23526 12.5147 3.32369C13.6422 4.41232 14.3384 5.8717 14.4751 7.43304C14.6118 8.99438 14.1797 10.5525 13.2585 11.8205C12.3372 13.0885 10.9889 13.9809 9.4617 14.3334C8.18666 14.6277 6.8587 14.529 5.64964 14.0601C5.17095 13.8745 4.76937 13.4929 4.26509 13.3963C3.67389 13.2832 2.95232 13.5595 2.0377 14.3334",
					stroke: "currentColor"
				})
			]
		});
		const IconSearchOutlineArtwork = ({ size = 16, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M6.58727 11.8586C9.55061 11.8586 11.9529 9.45637 11.9529 6.49304C11.9529 3.5297 9.55061 1.12744 6.58727 1.12744C3.62394 1.12744 1.22168 3.5297 1.22168 6.49304C1.22168 9.45637 3.62394 11.8586 6.58727 11.8586Z",
				stroke: "currentColor"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M10.2991 10.3933L14.7783 14.8725",
				stroke: "currentColor"
			})]
		});
		/** Regular one-pixel IconSearchOutline artwork. */
		const IconSearchOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconSearchOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconEllipsisOutlineArtwork = ({ size = 16, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M3 9C3.55228 9 4 8.55228 4 8C4 7.44772 3.55228 7 3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9Z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M13 9C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7C12.4477 7 12 7.44772 12 8C12 8.55228 12.4477 9 13 9Z",
					fill: "currentColor"
				})
			]
		});
		/** Regular IconEllipsisOutline artwork; its fill-only geometry is weight-independent. */
		const IconEllipsisOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconEllipsisOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconPlusOutlineArtwork = ({ size = 16, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M8 2V14",
				stroke: "currentColor"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M2 8H14",
				stroke: "currentColor"
			})]
		});
		/** Regular one-pixel IconPlusOutline artwork. */
		const IconPlusOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconPlusOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconCheckOutlineArtwork = ({ size = 16, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M2.25 8.5L5.49732 11.7473C5.90519 12.1552 6.57263 12.1344 6.95426 11.7018L13.75 4",
				stroke: "currentColor"
			})
		});
		/** Regular one-pixel IconCheckOutline artwork. */
		const IconCheckOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCheckOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconChevronDownOutlineArtwork = ({ size = 14, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M4 6L7.29289 9.29289C7.68342 9.68342 8.31658 9.68342 8.70711 9.29289L12 6",
				stroke: "currentColor"
			})
		});
		/** Regular one-pixel IconChevronDownOutline artwork. */
		const IconChevronDownOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronDownOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconChevronLeftOutlineArtwork = ({ size = 14, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M10 4L6.70711 7.29289C6.31658 7.68342 6.31658 8.31658 6.70711 8.70711L10 12",
				stroke: "currentColor"
			})
		});
		/** Regular one-pixel IconChevronLeftOutline artwork. */
		const IconChevronLeftOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronLeftOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconChevronRightOutlineArtwork = ({ size = 14, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M6 12L9.29289 8.70711C9.68342 8.31658 9.68342 7.68342 9.29289 7.29289L6 4",
				stroke: "currentColor"
			})
		});
		/** Regular one-pixel IconChevronRightOutline artwork. */
		const IconChevronRightOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronRightOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconChevronUpOutlineArtwork = ({ size = 14, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M12 10L8.70711 6.70711C8.31658 6.31658 7.68342 6.31658 7.29289 6.70711L4 10",
				stroke: "currentColor"
			})
		});
		/** Regular one-pixel IconChevronUpOutline artwork. */
		const IconChevronUpOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronUpOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconCloseOutlineArtwork = ({ size = 16, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M2.5 2.5L13.5 13.5",
				stroke: "currentColor"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M13.5 2.5L2.5 13.5",
				stroke: "currentColor"
			})]
		});
		/** Regular one-pixel IconCloseOutline artwork. */
		const IconCloseOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCloseOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconTrashOutlineArtwork = ({ size = 16, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M1.28149 3.88831H14.7187",
					stroke: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M5.41602 3.88833V2.47962C5.41602 2.29282 5.52492 2.11366 5.71876 1.98157C5.9126 1.84948 6.17551 1.77527 6.44964 1.77527H9.55053C9.82466 1.77527 10.0876 1.84948 10.2814 1.98157C10.4753 2.11366 10.5842 2.29282 10.5842 2.47962V3.88833",
					stroke: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M2.57349 3.88831L3.19366 13.2943C3.21937 13.5502 3.33952 13.7872 3.53065 13.9593C3.72178 14.1313 3.97016 14.2259 4.22729 14.2246H11.7728C12.0299 14.2259 12.2783 14.1313 12.4694 13.9593C12.6605 13.7872 12.7807 13.5502 12.8064 13.2943L13.4266 3.88831",
					stroke: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M6.44946 6.98926V11.1238",
					stroke: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M9.55054 6.98926V11.1238",
					stroke: "currentColor"
				})
			]
		});
		/** Regular one-pixel IconTrashOutline artwork. */
		const IconTrashOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconTrashOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconWarningOutlineArtwork = ({ size = 16, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z",
					stroke: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M8 4.29199V9.79199",
					stroke: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M8 10.708V11.708",
					stroke: "currentColor"
				})
			]
		});
		/** Regular one-pixel IconWarningOutline artwork. */
		const IconWarningOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWarningOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconClockOutlineArtwork = ({ size = 16, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z",
				stroke: "currentColor"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M8 4.31V8.46L11 10.08",
				stroke: "currentColor"
			})]
		});
		/** Regular one-pixel IconClockOutline artwork. */
		const IconClockOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClockOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconQueueOutlineArtwork = ({ size = 14, ...rest }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChatLinesOutlineArtwork, {
			size,
			...rest
		});
		/** Regular one-pixel IconQueueOutline artwork. */
		const IconQueueOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconQueueOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconInfoOutlineArtwork = ({ size = 14, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 14 14",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M12.5757 7.00012C12.5757 3.92085 10.0794 1.42463 7.00012 1.42456C3.9208 1.42456 1.42456 3.9208 1.42456 7.00012C1.42463 10.0794 3.92085 12.5757 7.00012 12.5757C10.0793 12.5756 12.5756 10.0793 12.5757 7.00012ZM13.8002 7.00012C13.8001 10.7559 10.7559 13.8001 7.00012 13.8002C3.2443 13.8002 0.199291 10.7559 0.199219 7.00012C0.199219 3.24426 3.24426 0.199219 7.00012 0.199219C10.7559 0.199291 13.8002 3.2443 13.8002 7.00012Z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M7.6127 3.18921V4.55986H6.38735V3.18921H7.6127Z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M7.6127 5.68921V10.8109H6.38735V5.68921H7.6127Z",
					fill: "currentColor"
				})
			]
		});
		/** Regular IconInfoOutline artwork; its fill-only geometry is weight-independent. */
		const IconInfoOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconInfoOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		const IconCheckCircleOutlineArtwork = ({ size = 16, className, strokeWidth }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className,
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			strokeWidth,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M12.5303 6.53027L8.80273 10.2578C8.54967 10.5109 8.31796 10.7439 8.10645 10.9141C7.88375 11.0932 7.616 11.2602 7.27344 11.3145C7.09229 11.3431 6.90771 11.3431 6.72656 11.3145C6.384 11.2602 6.11625 11.0932 5.89355 10.9141C5.68204 10.7439 5.45033 10.5109 5.19727 10.2578L3.46973 8.53027L4.53027 7.46973L6.25781 9.19727C6.53457 9.47402 6.70036 9.63859 6.83398 9.74609C6.95637 9.84453 6.98241 9.83644 6.96094 9.83301C6.98679 9.83709 7.01321 9.83709 7.03906 9.83301C7.01759 9.83644 7.04363 9.84453 7.16602 9.74609C7.29964 9.63859 7.46543 9.47402 7.74219 9.19727L11.4697 5.46973L12.5303 6.53027Z",
				fill: "currentColor"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				d: "M14.5996 8C14.5996 4.35492 11.6451 1.40039 8 1.40039C4.35492 1.40039 1.40039 4.35492 1.40039 8C1.40039 11.6451 4.35492 14.5996 8 14.5996C11.6451 14.5996 14.5996 11.6451 14.5996 8ZM15.9004 8C15.9004 12.363 12.363 15.9004 8 15.9004C3.63695 15.9004 0.0996094 12.363 0.0996094 8C0.0996094 3.63695 3.63695 0.0996094 8 0.0996094C12.363 0.0996094 15.9004 3.63695 15.9004 8Z",
				fill: "currentColor"
			})]
		});
		/** Regular one-pixel IconCheckCircleOutline artwork. */
		const IconCheckCircleOutlineRegular = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCheckCircleOutlineArtwork, {
			...props,
			strokeWidth: 1
		});
		//#endregion
		//#region src/vendor-primitives/keyboard-composition.ts
		/** Composition lifetime for local keyboard handlers, including a late closing keydown. */
		/**
		* Observe composition until its closing key is released or consumed.
		* @param document - document whose input events belong to the caller.
		* @returns an event guard and a disposer for all listeners.
		*/
		function observeComposition(document) {
			let composing = false;
			let ended = false;
			const start = () => {
				composing = true;
			};
			const end = () => {
				composing = false;
				ended = true;
			};
			const release = () => {
				ended = false;
			};
			const blur = () => {
				composing = false;
				ended = false;
			};
			document.addEventListener("compositionstart", start, true);
			document.addEventListener("compositionend", end, true);
			document.addEventListener("keyup", release, true);
			document.defaultView?.addEventListener("blur", blur);
			return {
				guards: (event) => {
					const guarded = composing || ended || event.isComposing || event.keyCode === 229;
					ended = false;
					return guarded;
				},
				dispose: () => {
					document.removeEventListener("compositionstart", start, true);
					document.removeEventListener("compositionend", end, true);
					document.removeEventListener("keyup", release, true);
					document.defaultView?.removeEventListener("blur", blur);
				}
			};
		}
		//#endregion
		//#region src/vendor-primitives/focus.ts
		/** Focus presentation for automatic entry and restoration. */
		const releases = /* @__PURE__ */ new WeakMap();
		const navigationKeys = new Set([
			"Tab",
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"Home",
			"End"
		]);
		/**
		* Focus an automatic destination without a focus outline until keyboard navigation or blur.
		* The theme suppresses outlines while data-dsh-automatic-focus is present; borders and shadows remain intact.
		* Tab and directional navigation restore normal focus styling.
		* @param element - control or container receiving automatic focus.
		* @param options - browser focus options, including scroll preservation.
		*/
		function focusWithoutRing(element, options) {
			releases.get(element)?.();
			const release = () => {
				element.removeAttribute("data-dsh-automatic-focus");
				element.removeEventListener("blur", release);
				element.removeEventListener("keydown", navigate, true);
				releases.delete(element);
			};
			const navigate = (event) => {
				if (!event.isComposing && !event.ctrlKey && !event.altKey && !event.metaKey && navigationKeys.has(event.key)) release();
			};
			releases.set(element, release);
			element.setAttribute("data-dsh-automatic-focus", "");
			element.addEventListener("blur", release);
			element.addEventListener("keydown", navigate, true);
			element.focus(options);
			if (!element.matches(":focus")) release();
		}
		//#endregion
		//#region src/vendor-primitives/useModalLayer.ts
		/** Shared modal keyboard ownership and focus lifetime. */
		const layers = /* @__PURE__ */ new WeakMap();
		const focusable = "button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href], [tabindex=\"0\"]";
		/**
		* Give only the top modal Escape and Tab ownership, then restore its previous focus.
		* Automatic entry and return focus omit outlines; keyboard traversal retains its indicators.
		* Controls mounted with the dialog use data-modal-autofocus for initial focus;
		* React autoFocus runs before this layer can capture the invoking control.
		* Local menus handle their Escape during capture before this bubble listener.
		* @param dialog - mounted dialog element.
		* @param open - whether this layer is active.
		* @param onClose - top-layer Escape or application close action.
		*/
		function useModalLayer(dialog, open, onClose) {
			const close = (0, react.useRef)(onClose);
			close.current = onClose;
			(0, react.useLayoutEffect)(() => {
				const element = dialog.current;
				if (!open || element === null) return;
				const document = element.ownerDocument;
				const composition = observeComposition(document);
				const previous = document.activeElement;
				const stack = layers.get(document) ?? [];
				layers.set(document, stack);
				const layer = {
					element,
					close: () => {
						close.current();
					}
				};
				stack.push(layer);
				const initial = element.querySelector("[data-modal-autofocus]") ?? element.querySelector(focusable) ?? element;
				if (!element.contains(document.activeElement)) focusWithoutRing(initial);
				const keydown = (event) => {
					const composing = composition.guards(event);
					if (stack.at(-1) !== layer || event.defaultPrevented || composing || event.ctrlKey || event.altKey || event.metaKey) return;
					if (event.key === "Escape" && !event.shiftKey) {
						event.preventDefault();
						if (!event.repeat) close.current();
					}
					if (event.key !== "Tab") return;
					if (document.activeElement?.closest("[role=\"menu\"]")) return;
					const items = [...element.querySelectorAll(focusable)].filter((item) => !item.closest("[inert], [hidden]"));
					const first = items[0] ?? element;
					const last = items.at(-1) ?? element;
					const atEdge = event.shiftKey ? document.activeElement === first : document.activeElement === last;
					if (document.activeElement === element || !element.contains(document.activeElement) || atEdge) {
						event.preventDefault();
						(event.shiftKey ? last : first).focus();
					}
				};
				document.addEventListener("keydown", keydown);
				return () => {
					composition.dispose();
					const wasTop = stack.at(-1) === layer;
					stack.splice(stack.indexOf(layer), 1);
					document.removeEventListener("keydown", keydown);
					if (stack.length === 0) layers.delete(document);
					if (wasTop) {
						const target = previous instanceof HTMLElement && previous.isConnected ? previous : stack.at(-1)?.element;
						if (target !== void 0) focusWithoutRing(target);
					}
				};
			}, [dialog, open]);
		}
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/vendor-primitives/Modal.module.css.mjs
		const css$10 = ".ZeK0TW_root{pointer-events:auto;z-index:1000;padding:max(24px, var(--dsh-frame-overlay-top,24px)) 24px;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.ZeK0TW_mask{inset:var(--dsh-frame-chrome-top,0px) 0 0;backdrop-filter:var(--dsw-mask-blur);position:absolute}.ZeK0TW_mask:after{content:\"\";background:var(--dsw-alias-bg-mask-1);animation:ZeK0TW_modalEnter var(--ds-transition-duration) var(--ds-ease-in-out);position:absolute;inset:0}.ZeK0TW_dialog{box-sizing:border-box;z-index:1;border-radius:var(--dsw-radius-panel);background:var(--dsw-alias-bg-layer-2);width:min(380px,100%);box-shadow:var(--dsw-elevation-prominent);animation:ZeK0TW_modalEnter var(--ds-transition-duration) var(--ds-ease-in-out);border:0;flex-direction:column;gap:20px;padding:0 0 24px;display:flex;position:relative;overflow:hidden}@keyframes ZeK0TW_modalEnter{0%{opacity:0}to{opacity:1}}@media (prefers-reduced-motion:reduce){.ZeK0TW_mask:after,.ZeK0TW_dialog{animation:none}}.ZeK0TW_dialog:focus{outline:none}.ZeK0TW_content{flex-direction:column;width:100%;display:flex}.ZeK0TW_header{justify-content:space-between;align-items:center;gap:8px;padding:22px 14px 12px 24px;display:flex}.ZeK0TW_title{color:var(--dsw-alias-label-primary);margin:0;font-size:16px;font-weight:500;line-height:24px}.ZeK0TW_close{border-radius:var(--dsw-radius-sm);cursor:pointer;width:28px;height:28px;color:var(--dsw-alias-label-secondary);background:0 0;border:none;flex:none;justify-content:center;align-items:center;display:inline-flex}.ZeK0TW_close:hover{background:var(--dsw-alias-interactive-bg-hover)}.ZeK0TW_description{color:var(--dsw-alias-label-primary);margin:0;padding:0 24px;font-size:14px;font-weight:400;line-height:22px}.ZeK0TW_body{flex-direction:column;min-width:0;margin-top:20px;padding:0 24px;display:flex}.ZeK0TW_footer{justify-content:flex-end;align-items:center;gap:8px;padding:0 24px;display:flex}";
		const tagId$10 = "@stolyarovmn/dsh-schedule-native-manager/Modal.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$10) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$10;
			tag.textContent = css$10;
			document.head.appendChild(tag);
		}
		var Modal_module_css_default = {
			"body": "ZeK0TW_body",
			"close": "ZeK0TW_close",
			"content": "ZeK0TW_content",
			"description": "ZeK0TW_description",
			"dialog": "ZeK0TW_dialog",
			"footer": "ZeK0TW_footer",
			"header": "ZeK0TW_header",
			"mask": "ZeK0TW_mask",
			"modalEnter": "ZeK0TW_modalEnter",
			"root": "ZeK0TW_root",
			"title": "ZeK0TW_title"
		};
		//#endregion
		//#region src/vendor-primitives/Modal.tsx
		/**
		* Render a centered, body-portaled modal over a blurred page mask.
		* @param props.open - whether the dialog is showing.
		* @param props.onClose - application close command, Escape, or mask click; while a menu is open inside the
		* dialog, Escape belongs to that menu first.
		* @param props.title - dialog heading (aria-label in every mode).
		* @param props.closeLabel - localized accessible close-button label.
		* @param props.description - optional supporting sentence under the title.
		* @param props.children - dialog body; mark its initial-focus control with
		* data-modal-autofocus instead of React autoFocus to preserve return focus.
		* @param props.footer - action row (Cancel / Create).
		* @param props.contentClassName - optional class for a scrollable content region.
		* @param props.backdropBlur - disable when the caller already blurs the page; defaults to true.
		* @param props.shortcutModal - command scope allowed by shortcut owners; unnamed
		* dialogs block application commands unless their owner allows the "other" scope.
		* @param props.headless - render children directly in the card (no default
		* header/close/body chrome); mask, card, Escape, and aria-label remain.
		* @param props.onKeyDownCapture - handle a nested dialog's keys before the document Escape listeners.
		* @returns null when closed; otherwise the overlay tree.
		*/
		function Modal({ open, onClose, title, closeLabel, description, children, footer, className, contentClassName, onKeyDownCapture, headless = false, backdropBlur = true, shortcutModal }) {
			const dialog = (0, react.useRef)(null);
			useModalLayer(dialog, open, onClose);
			if (!open) return null;
			return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: Modal_module_css_default.root,
				role: "presentation",
				onKeyDownCapture,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: Modal_module_css_default.mask,
					style: backdropBlur ? void 0 : { backdropFilter: "none" },
					"aria-hidden": "true",
					onClick: onClose
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					ref: dialog,
					tabIndex: -1,
					"data-shortcut-modal": shortcutModal,
					className: (0, import_vendor_clsx.default)(Modal_module_css_default.dialog, className),
					role: "dialog",
					"aria-modal": "true",
					"aria-label": title,
					children: headless ? children : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: (0, import_vendor_clsx.default)(Modal_module_css_default.content, contentClassName),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: Modal_module_css_default.header,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
									className: Modal_module_css_default.title,
									children: title
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: Modal_module_css_default.close,
									"aria-label": closeLabel,
									onClick: onClose,
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCloseOutlineRegular, { size: 14 })
								})]
							}),
							description !== void 0 && description !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: Modal_module_css_default.description,
								children: description
							}),
							children !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: Modal_module_css_default.body,
								children
							})
						]
					}), footer !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: Modal_module_css_default.footer,
						children: footer
					})] })
				})]
			}), document.body);
		}
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/vendor-primitives/Pill.module.css.mjs
		const css$9 = ".pZRFBq_pill{corner-shape:round;height:24px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border:none;border-radius:999px;align-items:center;gap:4px;padding:0 8px;font-size:12px;line-height:18px;display:inline-flex}.pZRFBq_interactive{cursor:pointer}.pZRFBq_interactive:hover{background:var(--dsw-alias-interactive-bg-hover)}.pZRFBq_active{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-button-ghost-active-fill);box-shadow:inset 0 0 0 1px var(--dsw-alias-button-ghost-active-border)}";
		const tagId$9 = "@stolyarovmn/dsh-schedule-native-manager/Pill.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$9) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$9;
			tag.textContent = css$9;
			document.head.appendChild(tag);
		}
		var Pill_module_css_default = {
			"active": "pZRFBq_active",
			"interactive": "pZRFBq_interactive",
			"pill": "pZRFBq_pill"
		};
		//#endregion
		//#region src/vendor-primitives/Pill.tsx
		/**
		* Render a pill chip. Interactive when onClick is supplied (renders a button);
		* otherwise a static span.
		* @param props.active - selected/active visual state.
		* @returns pill element.
		*/
		function Pill({ active = false, className, children, onClick, ...rest }) {
			if (!onClick) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, import_vendor_clsx.default)(Pill_module_css_default.pill, active && Pill_module_css_default.active, className),
				children
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: (0, import_vendor_clsx.default)(Pill_module_css_default.pill, Pill_module_css_default.interactive, active && Pill_module_css_default.active, className),
				onClick,
				...rest,
				children
			});
		}
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/vendor-primitives/StateDot.module.css.mjs
		const css$8 = ".O8ZSRW_dot{flex:none;display:inline-block;position:relative}.O8ZSRW_dot:after{content:\"\";corner-shape:round;background:currentColor;border-radius:50%;position:absolute;inset:20%}.O8ZSRW_dot[data-state=done]{color:var(--dsw-alias-state-success-primary)}.O8ZSRW_dot[data-state=warning]{color:var(--dsw-alias-state-warn-primary)}.O8ZSRW_dot[data-state=error]{color:var(--dsw-alias-state-error-primary)}.O8ZSRW_dot[data-state=idle]{color:var(--dsw-alias-state-idle-primary)}.O8ZSRW_spinner{color:var(--dsw-alias-label-tertiary);flex:none}.O8ZSRW_spinnerMotion{transform-origin:50%;animation:1.5s linear infinite O8ZSRW_dsh-state-dot-spin}.O8ZSRW_spinnerTrack,.O8ZSRW_spinnerArc{fill:none;stroke:currentColor;stroke-width:2px;stroke-linecap:round}.O8ZSRW_spinnerTrack{opacity:.25}.O8ZSRW_spinnerArc{stroke-dasharray:12 150;animation:1.5s ease-in-out infinite O8ZSRW_dsh-state-dot-dash}@keyframes O8ZSRW_dsh-state-dot-spin{to{transform:rotate(360deg)}}@keyframes O8ZSRW_dsh-state-dot-dash{0%{stroke-dasharray:12 150;stroke-dashoffset:0}50%{stroke-dasharray:24 150;stroke-dashoffset:-6px}to{stroke-dasharray:12 150;stroke-dashoffset:0}}@media (prefers-reduced-motion:reduce){.O8ZSRW_spinnerMotion,.O8ZSRW_spinnerArc{animation:none}.O8ZSRW_spinnerArc{stroke-dasharray:18 150;stroke-dashoffset:-3px}}.O8ZSRW_step{box-sizing:border-box;corner-shape:round;border:1.5px solid var(--dsw-alias-label-tertiary);color:var(--dsw-alias-label-primary-foreground);border-radius:50%;flex:none;justify-content:center;align-items:center;display:inline-flex}.O8ZSRW_step[data-state=done]{border-color:var(--dsw-alias-state-success-primary);background:var(--dsw-alias-state-success-primary)}.O8ZSRW_step[data-state=error]{border-color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-state-error-primary)}.O8ZSRW_step[data-state=warning]{border-color:var(--dsw-alias-state-warn-primary)}";
		const tagId$8 = "@stolyarovmn/dsh-schedule-native-manager/StateDot.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$8) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$8;
			tag.textContent = css$8;
			document.head.appendChild(tag);
		}
		var StateDot_module_css_default = {
			"dot": "O8ZSRW_dot",
			"dsh-state-dot-dash": "O8ZSRW_dsh-state-dot-dash",
			"dsh-state-dot-spin": "O8ZSRW_dsh-state-dot-spin",
			"spinner": "O8ZSRW_spinner",
			"spinnerArc": "O8ZSRW_spinnerArc",
			"spinnerMotion": "O8ZSRW_spinnerMotion",
			"spinnerTrack": "O8ZSRW_spinnerTrack",
			"step": "O8ZSRW_step"
		};
		//#endregion
		//#region src/vendor-primitives/StateDot.tsx
		/**
		* Pin the loader's CSS animations to document time zero. A CSS animation starts
		* when its element is inserted, so loaders mounted at different moments rotate
		* out of phase; one shared start time keeps every visible loader in step.
		* @param element - the mounted loader, or null on unmount.
		*/
		function syncSpinner(element) {
			if (element === null) return;
			const spinner = element;
			for (const animation of spinner.getAnimations?.({ subtree: true }) ?? []) animation.startTime = 0;
		}
		/**
		* Render a state dot.
		* @param props.state - which of `done`, `warning`, `ongoing`, `error`, or `idle` to show.
		* @param props.size - outer diameter in px; defaults to 14 for ongoing and 10 for solid states.
		* @param props.className - extra class for layout placement.
		* @param props.appearance - compact dot by default; step uses a filled check or hollow pending circle.
		* @returns the dot element (aria-hidden; pair with text for accessibility).
		*/
		function StateDot({ state, size, className, appearance = "dot" }) {
			const edge = size ?? (state === "ongoing" ? 14 : 10);
			if (state === "ongoing") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				ref: syncSpinner,
				className: (0, import_vendor_clsx.default)(StateDot_module_css_default.spinner, className),
				"data-state": "ongoing",
				width: edge,
				height: edge,
				viewBox: "0 0 24 24",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
					className: StateDot_module_css_default.spinnerMotion,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						className: StateDot_module_css_default.spinnerTrack,
						cx: "12",
						cy: "12",
						r: "9.5"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						className: StateDot_module_css_default.spinnerArc,
						cx: "12",
						cy: "12",
						r: "9.5"
					})]
				})
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, import_vendor_clsx.default)(appearance === "step" ? StateDot_module_css_default.step : StateDot_module_css_default.dot, className),
				"data-state": state,
				style: {
					width: edge,
					height: edge
				},
				"aria-hidden": "true",
				children: appearance === "step" && state === "done" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCheckOutlineRegular, { size: edge - 2 })
			});
		}
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/vendor-primitives/ShortcutKeys.module.css.mjs
		const css$7 = ".Td4AYa_keys{color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none;align-items:center;gap:3px;font-size:12px;line-height:16px;display:inline-flex}.Td4AYa_key{box-sizing:border-box;font:inherit;justify-content:center;align-items:center;display:inline-flex}.Td4AYa_tooltip{color:inherit;gap:2px;font-size:11px;line-height:14px}.Td4AYa_tooltip .Td4AYa_key{background:var(--dsw-alias-tooltip-key-bg);border:0;border-radius:4px;min-width:16px;height:16px;padding:0 2px}.Td4AYa_separator{font:inherit}.Td4AYa_joined{box-sizing:border-box;background:var(--dsw-alias-tooltip-key-bg);border-radius:4px;height:16px;padding:0 4px}.Td4AYa_joined .Td4AYa_key{background:0 0;border:0;min-width:0;height:auto;padding:0}";
		const tagId$7 = "@stolyarovmn/dsh-schedule-native-manager/ShortcutKeys.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$7) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$7;
			tag.textContent = css$7;
			document.head.appendChild(tag);
		}
		var ShortcutKeys_module_css_default = {
			"joined": "Td4AYa_joined",
			"key": "Td4AYa_key",
			"keys": "Td4AYa_keys",
			"separator": "Td4AYa_separator",
			"tooltip": "Td4AYa_tooltip"
		};
		//#endregion
		//#region src/vendor-primitives/ShortcutKeys.tsx
		/** Shared shortcut keycaps; callers supply the effective platform presentation. */
		/**
		* Render one command's keycaps without owning binding defaults or localized copy.
		* @param props - effective key labels, presentation variant and optional interaction styling.
		* @returns unboxed keys by default, or tooltip keycaps with plus-separated combinations grouped together.
		*/
		function ShortcutKeys({ keys, variant = "plain", className }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, import_vendor_clsx.default)(ShortcutKeys_module_css_default.keys, variant === "tooltip" && ShortcutKeys_module_css_default.tooltip, variant === "tooltip" && keys.includes("+") && ShortcutKeys_module_css_default.joined, className),
				children: keys.map((key, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("kbd", {
					className: key === "+" ? ShortcutKeys_module_css_default.separator : ShortcutKeys_module_css_default.key,
					children: key
				}, index))
			});
		}
		//#endregion
		//#region src/vendor-primitives/useDismissOnOutsidePointer.ts
		/**
		* Outside-pointer dismissal for trigger-owned popovers (jobs list, Cordis
		* panel): while the surface is open, a pointerdown outside the root closes it.
		*/
		/**
		* Close an open popover when a pointerdown lands outside its root element.
		* @param root - element containing both the trigger and the open surface.
		* @param open - whether the surface is showing; false detaches the listener.
		* @param setOpen - state setter invoked with false on an outside pointerdown.
		* @param portal - surface portaled outside the root (a `document.body` dialog)
		* that also counts as inside; omit when the root contains the whole popover.
		*/
		function useDismissOnOutsidePointer(root, open, setOpen, portal) {
			(0, react.useEffect)(() => {
				if (!open) return;
				const closeOutside = (event) => {
					if (event.target instanceof Node && root.current?.contains(event.target) !== true && portal?.current?.contains(event.target) !== true) setOpen(false);
				};
				document.addEventListener("pointerdown", closeOutside);
				return () => {
					document.removeEventListener("pointerdown", closeOutside);
				};
			}, [
				root,
				open,
				setOpen,
				portal
			]);
		}
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/vendor-primitives/Tooltip.module.css.mjs
		const css$6 = ".oSz4Aa_bubble{z-index:100;border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-tooltip-bg);width:max-content;max-width:50vw;color:var(--dsw-static-neutral-bluish-00);white-space:pre-line;overflow-wrap:break-word;pointer-events:none;animation:oSz4Aa_tooltip-in .15s var(--ds-ease-in-out);align-items:center;gap:8px;padding:3px 7px;font-size:13px;line-height:20px;display:inline-flex;position:fixed}.oSz4Aa_bubble[data-portal]{z-index:1100}.oSz4Aa_bubble[data-pinned]{pointer-events:auto}.oSz4Aa_label{min-width:0}.oSz4Aa_bubble[data-has-shortcut]{padding-inline-end:5px}.oSz4Aa_bubble[data-has-shortcut]:not(:has(.oSz4Aa_label)){padding:3px}.oSz4Aa_bubble[data-side=right]{transform:translateY(-50%)}.oSz4Aa_bubble[data-side=bottom]{transform:translate(-50%)}.oSz4Aa_bubble[data-side=top]{transform:translate(-50%,-100%)}.oSz4Aa_bubble[data-side=bottom][data-align=end]{transform:translate(-100%)}.oSz4Aa_bubble[data-side=top][data-align=end]{transform:translate(-100%,-100%)}@keyframes oSz4Aa_tooltip-in{0%{opacity:0}}@media (prefers-reduced-motion:reduce){.oSz4Aa_bubble{animation:none}}";
		const tagId$6 = "@stolyarovmn/dsh-schedule-native-manager/Tooltip.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$6) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$6;
			tag.textContent = css$6;
			document.head.appendChild(tag);
		}
		var Tooltip_module_css_default = {
			"bubble": "oSz4Aa_bubble",
			"label": "oSz4Aa_label",
			"tooltip-in": "oSz4Aa_tooltip-in"
		};
		//#endregion
		//#region src/vendor-primitives/input-modality.ts
		/**
		* Document-wide input tracking shared by tooltips and focus-ring styles.
		* Tooltips follow the last input; rings follow navigation or a key followed by
		* focus on a different control. Modifiers and refocusing alone keep rings silent.
		* Module-level listeners live for the document lifetime; Node imports are inert.
		*/
		/** Modality values published on the document element. */
		const INPUT_MODALITY = {
			pointer: "pointer",
			keyboard: "keyboard"
		};
		/** Attribute carrying whether focus navigation last owned focus. */
		const INPUT_MODALITY_ATTRIBUTE = "data-input-modality";
		const FOCUS_NAVIGATION = new Set([
			"Tab",
			"Home",
			"End",
			"PageUp",
			"PageDown"
		]);
		let pointer = false;
		let pointerOwnsFocus = false;
		let keyFocusOrigin;
		function publish() {
			document.documentElement.setAttribute(INPUT_MODALITY_ATTRIBUTE, pointerOwnsFocus ? INPUT_MODALITY.pointer : INPUT_MODALITY.keyboard);
		}
		/**
		* Whether the last input came from a pointer, independently of ring visibility.
		* @returns True after pointer input; false after any key.
		*/
		function pointerModality() {
			return pointer;
		}
		if (typeof window !== "undefined") {
			window.addEventListener("pointerdown", () => {
				pointer = true;
				pointerOwnsFocus = true;
				keyFocusOrigin = void 0;
				publish();
			}, true);
			window.addEventListener("keydown", (event) => {
				pointer = false;
				if (event.isComposing) {
					keyFocusOrigin = void 0;
					return;
				}
				keyFocusOrigin = event.composedPath()[0];
				if (!FOCUS_NAVIGATION.has(event.key) && !event.key.startsWith("Arrow")) return;
				pointerOwnsFocus = false;
				publish();
			}, true);
			window.addEventListener("focusin", (event) => {
				if (keyFocusOrigin === void 0 || event.composedPath()[0] === keyFocusOrigin) return;
				keyFocusOrigin = void 0;
				if (!pointerOwnsFocus) return;
				pointerOwnsFocus = false;
				publish();
			}, true);
			window.addEventListener("blur", () => {
				keyFocusOrigin = void 0;
			});
		}
		//#endregion
		//#region src/vendor-primitives/Tooltip.tsx
		/** Anchor-preserving tooltips; an optional body portal escapes clipping containers and stacking contexts that cap the bubble's z-index. */
		/**
		* Suppression channel for enclosing tooltip and hover-card anchors: a visible
		* tooltip within an anchor withdraws the enclosing preview while its bubble is shown.
		*/
		const TooltipSuppression = (0, react.createContext)(null);
		/**
		* Attach a hover/focus tooltip to an anchor element.
		* @param props.label - bubble text, or a resolver evaluated only while visible; an empty string shows only shortcut keys.
		* @param props.shortcutKeys - effective key labels rendered as platform-formatted keycaps after optional text.
		* @param props.side - placement relative to the anchor (default 'right').
		* @param props.align - horizontal anchor-edge alignment for 'bottom'/'top' bubbles: 'end' pins
		* the bubble's right edge to the anchor's (for anchors beside other hover surfaces the centered
		* bubble would overlap); default 'center'. Ignored for side 'right'.
		* @param props.portal - render the bubble under document.body, so an ancestor's clipping or its
		* stacking context (which confines the bubble's z-index to that context) cannot hide it.
		* @param props.delayMs - hover delay in milliseconds (default 0).
		* @param props.focusDelayMs - keyboard focus delay in milliseconds (default 0); blur, click,
		* mouse leave, disabling, and unmount cancel a pending show.
		* @param props.gap - anchor-to-bubble distance in pixels for 'bottom'/'top' bubbles (default 8);
		* ignored for side 'right'.
		* @param props.disabled - suppress the bubble while true; the anchor renders identically so
		* toggling never remounts it (which would cut its CSS transitions).
		* @param props.maxWidth - bubble width cap in pixels, for labels long enough that the default
		* half-viewport cap would render a slab wider than the surface the anchor sits on.
		* @param props.openOnClick - clicking also pins the bubble for reading; another click, Escape,
		* Tab, or an outside pointerdown dismisses it. Defaults to false for ordinary action tooltips.
		* @param props.children - a single anchor element; its own ref (callback or object) is forwarded alongside the tooltip's.
		* @returns the cloned anchor plus a fixed-position bubble, optionally portaled to the body.
		* The bubble stays hidden until ResizeObserver supplies its size for viewport fitting; clicking the
		* anchor dismisses the bubble unless openOnClick is enabled, and focus arriving after a pointer
		* interaction (a closing menu refocusing its trigger) never raises it.
		*/
		function Tooltip({ label, shortcutKeys, side = "right", align = "center", delayMs = 0, focusDelayMs = 0, gap = 8, disabled = false, portal = false, maxWidth, openOnClick = false, children }) {
			const id = (0, react.useId)();
			const [pinned, setPinned] = (0, react.useState)(false);
			const anchor = (0, react.useRef)(null);
			const childRef = children.ref;
			const mergedRef = (0, react.useCallback)((el) => {
				anchor.current = el;
				if (typeof childRef === "function") childRef(el);
				else if (childRef != null) childRef.current = el;
			}, [childRef]);
			const [pos, setPos] = (0, react.useState)(null);
			const bubble = (0, react.useRef)(null);
			const resolvedLabel = pos === null ? null : typeof label === "function" ? label() : label;
			const y = pos === null ? 0 : side === "right" ? pos.top + (pos.bottom - pos.top) / 2 : side === "top" ? pos.top - gap : pos.bottom + gap;
			const showTimer = (0, react.useRef)(null);
			const triggers = (0, react.useRef)({
				hover: false,
				focus: false
			});
			const suppressAncestors = (0, react.useContext)(TooltipSuppression);
			const [suppressed, setSuppressed] = (0, react.useState)(false);
			const announce = (0, react.useCallback)((active) => {
				suppressAncestors?.(active);
			}, [suppressAncestors]);
			const visible = pos !== null && !disabled;
			(0, react.useEffect)(() => {
				const el = bubble.current;
				if (pos === null || !visible || suppressed || el === null) return;
				const edgeMargin = 12;
				let size;
				let placement = side;
				const fit = () => {
					if (size === void 0) return;
					const { inlineSize: width, blockSize: height } = size;
					const offset = side === "right" ? 0 : align === "end" ? width : width / 2;
					const left = Math.max(edgeMargin, Math.min(pos.x - offset, window.innerWidth - edgeMargin - width));
					const fitsBelow = pos.bottom + gap + height <= window.innerHeight - edgeMargin;
					const fitsAbove = pos.top - gap - height >= edgeMargin;
					if (placement === "bottom" && !fitsBelow && fitsAbove) placement = "top";
					else if (placement === "top" && !fitsAbove && fitsBelow) placement = "bottom";
					el.style.left = `${left + offset}px`;
					el.style.top = `${placement === "right" ? (pos.top + pos.bottom) / 2 : placement === "top" ? pos.top - gap : pos.bottom + gap}px`;
					el.dataset.side = placement;
					el.style.visibility = "visible";
				};
				const observer = new ResizeObserver((entries) => {
					size = entries[0]?.borderBoxSize[0];
					fit();
				});
				observer.observe(el, { box: "border-box" });
				window.addEventListener("resize", fit);
				return () => {
					observer.disconnect();
					window.removeEventListener("resize", fit);
				};
			}, [
				align,
				gap,
				pos,
				side,
				suppressed,
				visible
			]);
			(0, react.useEffect)(() => {
				announce(visible);
				return () => {
					announce(false);
				};
			}, [announce, visible]);
			const cancelShow = (0, react.useCallback)(() => {
				if (showTimer.current === null) return;
				clearTimeout(showTimer.current);
				showTimer.current = null;
			}, []);
			(0, react.useEffect)(() => {
				if (pinned && (disabled || !openOnClick)) setPinned(false);
				if (disabled) {
					cancelShow();
					triggers.current = {
						hover: false,
						focus: false
					};
					setPos(null);
				}
				return cancelShow;
			}, [
				cancelShow,
				disabled,
				openOnClick,
				pinned
			]);
			const show = () => {
				if (disabled) return;
				const el = anchor.current;
				/* v8 ignore next -- the ref is attached by event time: events fire on the cloned anchor. */
				if (el === null) return;
				const r = el.getBoundingClientRect();
				setPos({
					x: side === "right" ? r.right + 10 : align === "end" ? r.right : r.left + r.width / 2,
					top: r.top,
					bottom: r.bottom
				});
				announce(true);
			};
			const showAfterDelay = (delay) => {
				cancelShow();
				if (delay <= 0) {
					show();
					return;
				}
				showTimer.current = setTimeout(() => {
					showTimer.current = null;
					show();
				}, delay);
			};
			const withdraw = (0, react.useCallback)(() => {
				setPinned(false);
				setPos(null);
				announce(false);
			}, [announce]);
			const hide = () => {
				cancelShow();
				if (!triggers.current.hover && !triggers.current.focus && !pinned) withdraw();
			};
			const dismiss = (0, react.useCallback)(() => {
				cancelShow();
				triggers.current = {
					hover: false,
					focus: false
				};
				withdraw();
			}, [cancelShow, withdraw]);
			useDismissOnOutsidePointer(anchor, openOnClick && visible, dismiss, bubble);
			(0, react.useEffect)(() => {
				if (!openOnClick || !visible) return;
				const onKeyDown = (event) => {
					if (event.key !== "Escape" && event.key !== "Tab") return;
					if (event.key === "Escape") {
						event.preventDefault();
						event.stopPropagation();
					}
					dismiss();
				};
				document.addEventListener("keydown", onKeyDown, true);
				return () => {
					document.removeEventListener("keydown", onKeyDown, true);
				};
			}, [
				dismiss,
				openOnClick,
				visible
			]);
			const content = visible && !suppressed && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				ref: bubble,
				id: openOnClick ? id : void 0,
				className: Tooltip_module_css_default.bubble,
				"data-side": side,
				"data-portal": portal || void 0,
				"data-pinned": pinned || void 0,
				"data-align": align,
				"data-has-shortcut": shortcutKeys?.length ? true : void 0,
				style: {
					left: pos.x,
					top: y,
					visibility: "hidden",
					...maxWidth === void 0 ? {} : { maxWidth }
				},
				role: "tooltip",
				"aria-label": shortcutKeys?.length ? [resolvedLabel, shortcutKeys.join(" ")].filter(Boolean).join(" ") : void 0,
				children: [resolvedLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: Tooltip_module_css_default.label,
					children: resolvedLabel
				}), shortcutKeys !== void 0 && shortcutKeys.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ShortcutKeys, {
					keys: shortcutKeys,
					variant: "tooltip"
				})]
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(TooltipSuppression.Provider, {
				value: setSuppressed,
				children: [(0, react.cloneElement)(children, {
					ref: mergedRef,
					"aria-describedby": openOnClick && visible ? [children.props["aria-describedby"], id].filter(Boolean).join(" ") : children.props["aria-describedby"],
					onMouseEnter: (e) => {
						children.props.onMouseEnter?.(e);
						triggers.current.hover = true;
						showAfterDelay(delayMs);
					},
					onMouseLeave: (e) => {
						children.props.onMouseLeave?.(e);
						triggers.current.hover = false;
						cancelShow();
						if (!pinned) withdraw();
					},
					onClick: (e) => {
						children.props.onClick?.(e);
						triggers.current.focus = false;
						cancelShow();
						if (openOnClick && !disabled && !pinned) {
							setPinned(true);
							show();
						} else withdraw();
					},
					onFocus: (e) => {
						children.props.onFocus?.(e);
						if (pointerModality()) return;
						triggers.current.focus = true;
						showAfterDelay(focusDelayMs);
					},
					onBlur: (e) => {
						children.props.onBlur?.(e);
						triggers.current.focus = false;
						hide();
					}
				}), portal ? content !== false && (0, react_dom.createPortal)(content, document.body) : content]
			});
		}
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/vendor-primitives/Toast.module.css.mjs
		const css$5 = ".HuCaUq_toast{z-index:1100;pointer-events:none;border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-toast-bg);width:max-content;max-width:min(640px,100vw - 48px);color:var(--dsw-alias-toast-label);box-shadow:var(--dsw-shadow-lv3);animation:HuCaUq_dsh-toast-in .16s ease-out, HuCaUq_dsh-toast-fade 1s ease var(--dsh-toast-hold,3s) forwards;align-items:center;gap:10px;padding:12px 16px;font-size:14px;line-height:22px;display:flex;position:fixed;top:40px;left:50%;transform:translate(-50%)}.HuCaUq_icon{color:var(--dsw-alias-state-warn-label);flex:none;place-items:center;display:grid}.HuCaUq_icon.HuCaUq_success{color:var(--dsw-alias-state-success-primary)}.HuCaUq_text{min-width:0}.HuCaUq_action{color:var(--dsw-static-deepseek-400);font:inherit;cursor:pointer;pointer-events:auto;background:0 0;border:0;margin-inline:3px;padding:0;display:inline}.HuCaUq_action:hover{opacity:.8}@keyframes HuCaUq_dsh-toast-in{0%{opacity:0;transform:translate(-50%,-6px)}to{opacity:1;transform:translate(-50%)}}@keyframes HuCaUq_dsh-toast-fade{to{opacity:0;visibility:hidden}}@media (prefers-reduced-motion:reduce){.HuCaUq_toast{animation:HuCaUq_dsh-toast-fade 1s ease var(--dsh-toast-hold,3s) forwards}}";
		const tagId$5 = "@stolyarovmn/dsh-schedule-native-manager/Toast.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$5) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$5;
			tag.textContent = css$5;
			document.head.appendChild(tag);
		}
		var Toast_module_css_default = {
			"action": "HuCaUq_action",
			"dsh-toast-fade": "HuCaUq_dsh-toast-fade",
			"dsh-toast-in": "HuCaUq_dsh-toast-in",
			"icon": "HuCaUq_icon",
			"success": "HuCaUq_success",
			"text": "HuCaUq_text",
			"toast": "HuCaUq_toast"
		};
		//#endregion
		//#region src/vendor-primitives/Toast.tsx
		/** Full-opacity hold before the fade starts, when the owner names none. */
		const HOLD_MS = 3e3;
		/** Fade duration. Must agree with the stylesheet's toast-fade duration. */
		const FADE_MS = 1e3;
		/**
		* Transient top-center banner: slides in, holds at full opacity, fades out,
		* then reports done so the owner can unmount it. Re-showing the same text
		* restarts the cycle when the owner remounts the component (key it by a
		* per-show sequence). Rendered through a body portal so an owner inside a
		* transformed or filtered ancestor cannot trap the fixed banner in that
		* ancestor's box.
		* With unchanged holdMs, parent rerenders do not extend the lifetime.
		* Completion calls the latest onDone handler; fully faded actions receive no input.
		*
		* The hold is the owner's to set, because how long a banner has to stay
		* depends on how much there is to read: a one-line limit lands in the default
		* window, while a failure that names what broke does not. One value drives
		* both the unmount timer and the stylesheet's fade delay — the stylesheet
		* reads it as a custom property — so the two can no longer disagree and leave
		* the banner unmounting mid-fade.
		* @param props.text - resolved banner copy; the owner passes localized text.
		* @param props.icon - optional leading glyph (e.g. a warning icon); ignored
		* under `tone="success"`, which brings its own glyph.
		* @param props.tone - 'success' renders the design's circled green check as
		* the leading glyph; omitted, the icon seat keeps its warning tint.
		* @param props.actions - optional inline actions continuing the sentence:
		* each renders its plain-text `prefix` (a connective like 或) followed by its
		* localized `label` as blue clickable text, flowing after `text` as one
		* sentence. Each press is the owner's to handle (e.g. undo the reported
		* change, then unmount the toast). The banner surface stays click-through —
		* only the action text takes the pointer.
		* @param props.holdMs - full-opacity hold before the fade; defaults to 3000.
		* @param props.anchor - optional element whose horizontal center the banner
		* follows (e.g. the composer card, so the banner centers over the chat column
		* rather than the whole window); omitted, it centers on the viewport.
		* @param props.onDone - called once the fade completes; unmount the toast here.
		* @returns the floating banner.
		*/
		function Toast({ text, icon, tone, anchor, holdMs = HOLD_MS, actions, onDone }) {
			const latestOnDone = (0, react.useRef)(onDone);
			(0, react.useLayoutEffect)(() => {
				latestOnDone.current = onDone;
			}, [onDone]);
			(0, react.useEffect)(() => {
				const timer = setTimeout(() => {
					latestOnDone.current();
				}, holdMs + FADE_MS);
				return () => {
					clearTimeout(timer);
				};
			}, [holdMs]);
			const [left, setLeft] = (0, react.useState)(null);
			(0, react.useLayoutEffect)(() => {
				if (anchor == null) return;
				const measure = () => {
					const rect = anchor.getBoundingClientRect();
					setLeft(rect.left + rect.width / 2);
				};
				measure();
				window.addEventListener("resize", measure);
				return () => {
					window.removeEventListener("resize", measure);
				};
			}, [anchor]);
			return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: Toast_module_css_default.toast,
				role: "alert",
				style: {
					...left === null ? {} : { left },
					"--dsh-toast-hold": `${String(holdMs)}ms`
				},
				children: [tone === "success" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: `${Toast_module_css_default.icon} ${Toast_module_css_default.success}`,
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCheckCircleOutlineRegular, {})
				}) : icon !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: Toast_module_css_default.icon,
					"aria-hidden": true,
					children: icon
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: Toast_module_css_default.text,
					children: [text, actions?.map((action) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react.Fragment, { children: [action.prefix, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: Toast_module_css_default.action,
						onClick: action.onClick,
						children: action.label
					})] }, action.label))]
				})]
			}), document.body);
		}
		//#endregion
		//#region src/vendor-primitives/overlay-top-margin.ts
		/** Shared viewport inset for overlays, derived from the desktop frame's reserved top strip. */
		/**
		* Resolve the top margin an overlay keeps from the viewport edge.
		* @param min - the overlay's own viewport margin in px, used as the floor.
		* @returns the larger of `min` and the frame clearance plus 20px; fullscreen keeps only the 20px gap.
		*/
		function overlayTopMargin(min) {
			const root = document.documentElement;
			const clearance = Number.parseFloat(getComputedStyle(root).getPropertyValue("--dsh-frame-top-clearance"));
			if (Number.isNaN(clearance)) return min;
			return Math.max(min, (root.hasAttribute("data-fullscreen") ? 0 : clearance) + 20);
		}
		//#endregion
		//#region src/vendor-primitives/useAnchoredPosition.ts
		/**
		* Keep a fixed-position floating element anchored to a trigger.
		*
		* A portaled panel is positioned from its anchor's viewport rect, which stops
		* being true the moment anything scrolls or the window resizes. This owns that
		* one concern: measure the anchor, offset the panel below or above it, clamp
		* the result inside the viewport, and re-run on scroll (capture phase, so
		* scrollers nested inside the page are caught too), on resize, and on the
		* panel's own size changes while the element is open.
		* @module @deepseek-ai/dsh-client-ui-primitives/useAnchoredPosition
		*/
		/**
		* Track an anchor and return the panel's fixed coordinates.
		* @param options - the open state, the two refs, the placement side and alignment, and the gap/margin distances.
		* @returns `left`/`top` for the panel, or `null` before the first measurement.
		*/
		function useAnchoredPosition(options) {
			const { open, anchorRef, panelRef, side = "bottom", align = "start", gap, margin } = options;
			const [position, setPosition] = (0, react.useState)(null);
			(0, react.useLayoutEffect)(() => {
				if (!open) {
					setPosition(null);
					return;
				}
				const place = () => {
					/* v8 ignore start -- geometry read from real layout: jsdom reports zero
					offset sizes, so the positive-size clamp arms are exercised by browser
					scenarios rather than unit tests. */
					const rect = anchorRef.current?.getBoundingClientRect();
					if (rect === void 0) return;
					const panel = panelRef.current;
					const width = panel?.offsetWidth ?? 0;
					const height = panel?.offsetHeight ?? 0;
					let left = align === "end" ? rect.right - width : rect.left;
					let top = side === "top" ? rect.top - gap - height : rect.bottom + gap;
					if (width > 0) left = Math.min(Math.max(left, margin), window.innerWidth - width - margin);
					if (height > 0) top = Math.min(Math.max(top, overlayTopMargin(margin)), window.innerHeight - height - margin);
					/* v8 ignore stop */
					setPosition({
						left,
						top
					});
				};
				place();
				window.addEventListener("scroll", place, true);
				window.addEventListener("resize", place);
				const panel = panelRef.current;
				let observer = null;
				if (typeof ResizeObserver !== "undefined" && panel !== null) {
					observer = new ResizeObserver(place);
					observer.observe(panel);
				}
				return () => {
					observer?.disconnect();
					window.removeEventListener("scroll", place, true);
					window.removeEventListener("resize", place);
				};
			}, [
				open,
				anchorRef,
				panelRef,
				side,
				align,
				gap,
				margin
			]);
			return position;
		}
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/client/TaskManagerPage.module.css.mjs
		const css$4 = "._8isrLa_page{width:100%;min-width:0;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-size:14px;line-height:1.6;display:flex;overflow:hidden}._8isrLa_listPane{flex-direction:column;flex:1;min-width:0;min-height:0;display:flex}._8isrLa_pageScroll{scrollbar-gutter:stable;--dsh-scrollbar-width:9px;--dsh-scrollbar-thumb-border:2px;flex:1;min-height:0;overflow:auto}._8isrLa_pageContent{max-width:960px;margin:0 auto;padding:0 clamp(24px,4vw,48px) 48px}._8isrLa_pageHeading{justify-content:space-between;align-items:center;gap:16px;margin-bottom:24px;padding-top:28px;display:flex}[data-platform=darwin] ._8isrLa_pageHeading{padding-top:calc(28px + var(--dsh-frame-top-clearance,0px))}._8isrLa_pageHeading h1{flex:1;min-width:0;margin:0;font-size:20px;font-weight:500;line-height:28px}._8isrLa_creationActions{flex:none;align-items:center;gap:16px;display:flex}._8isrLa_newButton{border-radius:16px;height:32px;padding:0 12px;font-size:13px;line-height:20px}._8isrLa_filters{flex-wrap:wrap;align-items:center;gap:8px 12px;margin-bottom:14px;display:flex}._8isrLa_filterTabs{flex-wrap:wrap;align-items:center;gap:8px 12px;display:flex}._8isrLa_filterTab{height:28px;color:var(--dsw-alias-label-tertiary);font:inherit;white-space:nowrap;cursor:pointer;background:0 0;border:0;border-radius:14px;flex:none;align-items:center;padding:0 10px;font-size:14px;line-height:22px;display:inline-flex}._8isrLa_filterTab:hover{background:var(--dsw-alias-interactive-bg-hover)}._8isrLa_filterTabActive{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}._8isrLa_searchField{border:.5px solid var(--dsw-alias-border-l3);height:36px;color:var(--dsw-alias-label-tertiary);border-radius:12px;align-items:center;margin:0 0 16px;padding:0 10px;transition:border-color .15s;display:flex}._8isrLa_searchField:hover{border-color:var(--dsw-alias-border-l2)}._8isrLa_searchField:focus-within{border-color:var(--dsw-alias-state-business-primary)}._8isrLa_searchField>:first-child{background:0 0;border:0;border-radius:0;flex:1;min-width:0;height:100%;padding:0}._8isrLa_searchField>:first-child:focus-within{border-color:#0000}._8isrLa_searchField>:first-child svg{width:14px;height:14px}._8isrLa_searchField input::placeholder{color:var(--dsw-alias-label-caption)}._8isrLa_searchField input:focus-visible{outline:none}._8isrLa_searchField input::-webkit-search-cancel-button{display:none}._8isrLa_searchClear{width:28px;height:28px;color:var(--dsw-alias-label-tertiary);flex:none;margin-right:-6px;padding:0}._8isrLa_searchClear svg{width:14px;height:14px}._8isrLa_list{display:block}._8isrLa_listRows{flex-direction:column;gap:2px;margin:0;padding:0;list-style:none;display:flex}._8isrLa_row{text-align:left;white-space:normal;border-radius:12px;justify-content:flex-start;align-items:flex-start;gap:12px;width:100%;height:auto;padding:8px;display:flex}._8isrLa_row:hover{background:var(--dsw-alias-interactive-bg-hover)}._8isrLa_rowGlyph{width:16px;height:20px;color:var(--dsw-alias-label-tertiary);flex:none;margin-top:2px}._8isrLa_rowContent{flex-direction:column;flex:1;min-width:0;display:flex}._8isrLa_rowTitle{text-overflow:ellipsis;white-space:nowrap;font-weight:500;line-height:23px;overflow:hidden}._8isrLa_rowSummary{color:var(--dsw-alias-label-tertiary);overflow-wrap:anywhere;margin-top:2px;font-size:13px;line-height:21px;display:block}._8isrLa_metadata{color:inherit;overflow-wrap:anywhere;font-size:13px;line-height:21px}._8isrLa_metadata+._8isrLa_metadata:before{content:\" · \";padding:0 2px}._8isrLa_selectedRow{background:var(--dsw-alias-interactive-bg-hover)}._8isrLa_endedRow ._8isrLa_rowTitle{color:var(--dsw-alias-label-tertiary)}._8isrLa_endedRow ._8isrLa_rowSummary{color:var(--dsw-alias-label-caption)}._8isrLa_endedRow:hover ._8isrLa_rowTitle,._8isrLa_endedRow._8isrLa_selectedRow ._8isrLa_rowTitle{color:inherit}._8isrLa_endedRow:hover ._8isrLa_rowSummary,._8isrLa_endedRow._8isrLa_selectedRow ._8isrLa_rowSummary{color:var(--dsw-alias-label-tertiary)}._8isrLa_notice{background:var(--dsw-specific-sidebar-fill);color:var(--dsw-alias-label-secondary);border-radius:10px;flex-wrap:wrap;align-items:flex-start;gap:9px;margin:0 0 20px;padding:12px 14px;font-size:12px;line-height:20px;display:flex}._8isrLa_notice p{flex:1;margin:0}._8isrLa_empty{text-align:center;color:var(--dsw-alias-label-tertiary);flex-direction:column;align-items:center;padding:48px 20px;font-size:14px;display:flex}._8isrLa_empty h2,._8isrLa_empty h3,._8isrLa_empty ._8isrLa_emptyTitle,._8isrLa_empty p{margin:0}._8isrLa_empty h2,._8isrLa_empty h3,._8isrLa_empty ._8isrLa_emptyTitle{color:var(--dsw-alias-label-tertiary);margin-bottom:8px;font-size:14px;font-weight:400;line-height:1.6}._8isrLa_emptyGlyph{color:var(--dsw-alias-label-caption);margin-bottom:12px}._8isrLa_emptyAction{margin-top:16px}._8isrLa_detail{--detail-gutter:24px;border-left:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-base);flex-direction:column;flex:0 0 47%;min-width:0;min-height:0;display:flex;position:relative}._8isrLa_detail:focus-visible{outline:none}._8isrLa_tabBody{flex-direction:column;flex:auto;min-width:0;height:100%;min-height:0;display:flex}._8isrLa_tabBody>._8isrLa_detail{border-left:0;flex:auto}._8isrLa_tabBody>._8isrLa_empty{flex:auto;justify-content:center}._8isrLa_tabBody>._8isrLa_detail ._8isrLa_detailTabsBar{height:37px;min-height:37px}._8isrLa_tabBody>._8isrLa_detail ._8isrLa_detailTab{padding-bottom:9px}._8isrLa_tabBody>._8isrLa_detail ._8isrLa_detailActions{margin-right:calc(6px - var(--detail-gutter))}._8isrLa_detailHeader{align-items:flex-start;gap:10px;margin-bottom:4px;display:flex}._8isrLa_editName{width:100%;min-width:0;min-height:32px;color:var(--dsw-alias-label-primary);background:0 0;border:0;outline:0;flex:1;padding:0;font-size:20px;font-weight:500;line-height:28px}._8isrLa_editName:hover{box-shadow:0 1px var(--dsw-alias-border-l3)}._8isrLa_editName:focus{box-shadow:0 1px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary))}._8isrLa_readonlyName{overflow-wrap:anywhere;flex:1;min-width:0;margin:0;padding:2px 0;font-size:20px;font-weight:500;line-height:28px}._8isrLa_nextRun{min-height:20px;color:var(--dsw-alias-label-tertiary);align-items:center;gap:6px;margin-bottom:20px;font-size:13px;line-height:20px;display:flex}._8isrLa_nextRun p{overflow-wrap:anywhere;min-width:0;margin:0}._8isrLa_nextRunRelative{color:inherit}._8isrLa_tabTitleIcon{color:var(--dsw-alias-label-secondary);flex:none}._8isrLa_detailTabsBar{height:44px;min-height:44px;padding:0 var(--detail-gutter);border-bottom:.5px solid var(--dsw-alias-border-l3);flex-shrink:0;justify-content:space-between;align-items:center;gap:20px;display:flex}._8isrLa_detailTabs{flex:auto;align-self:flex-end;gap:36px;min-width:0;margin-bottom:-1px;padding-bottom:1px;display:flex;overflow-x:auto}._8isrLa_detailActions{flex:none;align-items:center;margin-right:-8px}._8isrLa_detailIconButton{width:28px;height:28px;color:var(--dsw-alias-label-tertiary);flex:none;padding:0}._8isrLa_detailTab{color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;flex:none;padding:0 0 13px;font-size:13px;font-weight:500;line-height:16px;position:relative}._8isrLa_detailTab:after{content:\"\";background:0 0;border-radius:2px;height:2px;position:absolute;bottom:-1px;left:0;right:0}._8isrLa_detailTab[aria-selected=true]{color:var(--dsw-alias-state-business-primary)}._8isrLa_detailTab[aria-selected=true]:after{background:var(--dsw-alias-state-business-primary)}._8isrLa_detailScroll{min-height:0;padding:24px var(--detail-gutter) 28px;scrollbar-gutter:stable;--dsh-scrollbar-width:9px;--dsh-scrollbar-thumb-border:2px;flex:1;overflow:auto}._8isrLa_detailRecords{scrollbar-gutter:auto;flex-direction:column;padding:0;display:flex;overflow:hidden}._8isrLa_detailRecords>._8isrLa_notice{margin:24px var(--detail-gutter) 0}._8isrLa_recordsPanel:not([hidden]),._8isrLa_deliveryHistory{flex-direction:column;flex:1;min-height:0;display:flex}._8isrLa_retentionEnd{padding:0 var(--detail-gutter) 16px;color:var(--dsw-alias-label-tertiary);flex:none;font-size:12px;line-height:20px}._8isrLa_retentionLine{flex-wrap:wrap;align-items:center;gap:6px;display:flex}._8isrLa_retentionInfo{width:24px;height:24px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:0;border-radius:4px;flex:none;justify-content:center;align-items:center;padding:5px;display:inline-flex}._8isrLa_retentionInfo:hover{color:var(--dsw-alias-label-primary)}._8isrLa_retentionInfo:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}._8isrLa_retentionRule{background:var(--dsw-alias-bg-layer-1);border-radius:8px;margin-top:12px;padding:12px 14px}._8isrLa_retentionRule p{margin:0}._8isrLa_retentionRule p+p{margin-top:6px}._8isrLa_ruleCard{margin-top:28px}._8isrLa_ruleCard h3{color:var(--dsw-alias-label-tertiary);margin:0 0 8px 10px;font-size:13px;font-weight:400;line-height:20px}._8isrLa_ruleRows{border:.5px solid var(--dsw-alias-border-l3);border-radius:16px;flex-direction:column;padding:0 12px;display:flex}._8isrLa_menuGuard{display:contents}._8isrLa_zoneMenu._8isrLa_zoneMenu{height:min(420px,100dvh - 48px);max-height:min(420px,100dvh - 48px)}._8isrLa_zoneMenu [role=separator]{background:var(--dsw-alias-border-l3);height:.5px;margin:6px 4px}._8isrLa_ruleRow,._8isrLa_ruleRowMenu{border-bottom:.5px solid var(--dsw-alias-border-l3);width:100%;display:flex}._8isrLa_ruleRow{justify-content:space-between;align-items:center;gap:12px;min-height:48px}._8isrLa_ruleRows>:last-child,._8isrLa_ruleRows>:last-child>._8isrLa_ruleRowMenu{border-bottom:0}._8isrLa_ruleLabel{color:var(--dsw-alias-label-primary);flex:none;font-size:14px;line-height:1.6}._8isrLa_ruleControl{margin-right:0}._8isrLa_ruleRows ._8isrLa_ruleControl:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px}._8isrLa_ruleValue{width:100%;min-height:48px;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border:none;justify-content:space-between;align-items:center;gap:12px;margin:0;padding:0;font-size:14px;line-height:1.6;display:flex}._8isrLa_ruleValueFace{border-radius:18px;flex:0 auto;align-items:center;gap:6px;min-width:0;min-height:32px;padding:0 8px;transition:background .15s;display:flex}._8isrLa_ruleValue:not(:disabled):hover ._8isrLa_ruleValueFace{background:var(--dsw-alias-interactive-bg-hover)}._8isrLa_ruleRows ._8isrLa_ruleValue:focus-visible{outline:none}._8isrLa_ruleValue:focus-visible ._8isrLa_ruleValueFace{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px}._8isrLa_ruleValueFace>svg{color:var(--dsw-alias-label-tertiary);flex:none}._8isrLa_ruleValue:disabled{color:var(--dsw-alias-label-tertiary);cursor:default}._8isrLa_ruleCurrent{text-align:right;text-overflow:ellipsis;white-space:nowrap;flex:0 auto;min-width:0;overflow:hidden}._8isrLa_zoneSearch{box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);width:100%;color:var(--dsw-alias-label-primary);font:inherit;border-radius:7px;outline:none;padding:6px 8px;font-size:13px;line-height:20px}._8isrLa_zoneSearch:focus{border-color:var(--dsw-alias-state-business-primary)}._8isrLa_ruleWeekdays{flex-wrap:wrap;justify-content:flex-end;gap:4px;padding:6px 0;display:flex}._8isrLa_ruleMonthDays{grid-template-columns:repeat(7,minmax(36px,max-content));justify-content:flex-end;gap:4px;padding:6px 0;display:grid}._8isrLa_ruleMonthDays>*{justify-content:center;justify-self:stretch}._8isrLa_ruleInput{min-width:0;color:var(--dsw-alias-label-primary);font:inherit;text-align:right;background:0 0;border:none;border-radius:18px;flex:0 58%;margin-right:0;padding:5px 8px;font-size:14px;transition:background .15s}._8isrLa_ruleInput:not(:disabled):hover{background:var(--dsw-alias-interactive-bg-hover)}._8isrLa_ruleInput:disabled{color:var(--dsw-alias-label-tertiary)}._8isrLa_ruleInterval{flex:none;align-items:center;gap:8px;min-width:0;display:flex}._8isrLa_ruleIntervalStepper{background:var(--dsw-alias-bg-module-platform);border-radius:18px;justify-content:center;align-items:center;min-width:72px;height:36px;display:inline-flex;position:relative}._8isrLa_ruleIntervalInput{box-sizing:border-box;width:calc(var(--interval-digits,1) * 1ch + 52px);appearance:textfield;border-radius:inherit;font-variant-numeric:tabular-nums;text-align:center;flex:0 auto;min-width:72px;height:100%;padding:0 26px}._8isrLa_ruleIntervalInput::-webkit-outer-spin-button,._8isrLa_ruleIntervalInput::-webkit-inner-spin-button{appearance:none;margin:0}._8isrLa_ruleIntervalInput:not(:disabled):hover{background:0 0}._8isrLa_ruleRows ._8isrLa_ruleIntervalInput:focus-visible{outline:none}._8isrLa_ruleIntervalArrows{opacity:0;flex-direction:column;gap:2px;display:flex;position:absolute;right:8px}._8isrLa_ruleIntervalStepper:hover ._8isrLa_ruleIntervalArrows,._8isrLa_ruleIntervalStepper:focus-within ._8isrLa_ruleIntervalArrows{opacity:1}._8isrLa_ruleIntervalArrow{background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 75%, transparent);width:17px;height:12px;color:var(--dsw-alias-label-primary);cursor:pointer;border:none;border-radius:3px;justify-content:center;align-items:center;padding:0;display:inline-flex}._8isrLa_ruleIntervalArrow:hover:not(:disabled){background:var(--dsw-alias-bg-layer-1)}._8isrLa_ruleIntervalArrow:disabled{color:var(--dsw-alias-label-caption);cursor:default}._8isrLa_ruleIntervalUnit{color:var(--dsw-alias-label-primary);flex:none;font-size:14px}._8isrLa_pickerTrigger{cursor:pointer;flex:0 auto;justify-content:flex-end;align-items:center;gap:6px;display:inline-flex}._8isrLa_pickerTrigger:disabled{cursor:default}._8isrLa_pickerIcon{color:var(--dsw-alias-label-tertiary);flex:none}._8isrLa_ruleHint{color:var(--dsw-alias-label-tertiary);margin:8px 0 0 10px;font-size:13px;line-height:1.6}._8isrLa_ruleHintError{color:var(--dsw-alias-state-error-primary)}._8isrLa_instruction{box-sizing:border-box;field-sizing:content;border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-base);width:100%;max-width:100%;min-height:112px;max-height:160px;color:var(--dsw-alias-label-primary);font:inherit;resize:none;--dsh-scrollbar-width:9px;--dsh-scrollbar-thumb-border:2px;--dsh-scrollbar-track-margin:12px;border-radius:16px;outline:0;margin:0;padding:12px;font-size:14px;line-height:24px;transition:border-color .15s;display:block}._8isrLa_instruction:hover{border-color:var(--dsw-alias-border-l2)}._8isrLa_instruction:focus{border-color:var(--dsw-alias-state-business-primary)}._8isrLa_readonlyPrompt{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;font-size:14px;line-height:24px}._8isrLa_delivery{border-radius:8px;align-items:flex-start;gap:12px;margin:0 -8px;padding:14px 8px;font-size:14px;line-height:22px;display:flex;position:relative}._8isrLa_delivery:first-of-type{padding-top:0}._8isrLa_delivery:before,._8isrLa_delivery:after{background:var(--dsw-alias-border-l3);width:.5px;position:absolute;left:15.75px}._8isrLa_delivery:not(:first-of-type):before{content:\"\";height:14px;top:0}._8isrLa_delivery:not(:last-of-type):after{content:\"\";top:42px;bottom:0}._8isrLa_delivery:first-of-type:not(:last-of-type):after{top:28px}._8isrLa_deliveryGlyph{color:var(--dsw-alias-label-tertiary);flex:none;margin-top:6px}._8isrLa_deliveryBody{flex:1;min-width:0;padding:2px 0}._8isrLa_deliveryHead{align-items:center;gap:10px;display:flex}._8isrLa_deliveryTime{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:22px;display:block}._8isrLa_confirmTitle{white-space:pre-wrap;overflow-wrap:anywhere;margin:0}._8isrLa_savedPrompt{-webkit-line-clamp:2;line-clamp:2;color:var(--dsw-alias-label-tertiary);white-space:pre-wrap;overflow-wrap:anywhere;-webkit-box-orient:vertical;margin:6px 0 0;font-size:13px;line-height:22px;display:-webkit-box;overflow:hidden}._8isrLa_savedPrompt[data-expanded]{-webkit-line-clamp:none;line-clamp:none;display:block}._8isrLa_savedPromptToggle{border-radius:var(--dsw-radius-sm);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border:0;align-items:center;gap:2px;margin:2px 0 0 -6px;padding:1px 6px;font-size:12px;line-height:20px;display:inline-flex}._8isrLa_savedPromptToggle:hover{background:var(--dsw-alias-interactive-bg-hover)}._8isrLa_savedPromptToggle:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}._8isrLa_detailActions,._8isrLa_confirmActions{flex-wrap:wrap;justify-content:flex-end;gap:8px;display:flex}._8isrLa_detailHeader{flex-shrink:0}._8isrLa_detailContext{flex:none;align-items:center;min-width:0;max-width:200px;display:flex}._8isrLa_saveFooter{padding:20px var(--detail-gutter);border-top:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-base);flex-shrink:0;justify-content:flex-end;align-items:center;gap:8px;display:flex}._8isrLa_saveFooter>button{height:32px;font-size:13px}._8isrLa_saveFooter>:last-child{margin-right:-8px}._8isrLa_saveNotice{color:var(--dsw-alias-label-tertiary);margin-right:auto;font-size:12px}._8isrLa_saveFailure{padding:12px var(--detail-gutter) 0;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-state-error-primary);flex-shrink:0;margin:0;font-size:12px;line-height:1.6}._8isrLa_linkedSession{text-align:left;border:0;border-radius:14px;flex:0 auto;align-items:center;gap:6px;min-width:0;max-width:100%;height:28px;padding:0 8px;display:flex}._8isrLa_linkedSession:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px}._8isrLa_detailNotice{padding:0 var(--detail-gutter) 6px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;background:var(--dsw-alias-bg-base);flex-shrink:0;margin:0;font-size:12px}._8isrLa_linkedSessionLabel{color:var(--dsw-alias-label-secondary);flex-shrink:0;font-size:13px}._8isrLa_linkedSessionTarget{justify-content:flex-end;align-items:center;gap:4px;min-width:0;display:flex;overflow:hidden}._8isrLa_linkedSessionName{clip:rect(0 0 0 0);white-space:nowrap;width:1px;height:1px;font-size:12px;position:absolute;overflow:hidden}._8isrLa_confirmDialog{box-sizing:border-box;max-height:calc(100dvh - 48px)}._8isrLa_confirmContent{overscroll-behavior:contain;--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);min-height:0;overflow-y:auto}._8isrLa_confirmDialog>:last-child{flex-shrink:0}._8isrLa_deleteButton{color:var(--dsw-alias-state-error-primary)}._8isrLa_page :focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}._8isrLa_page ._8isrLa_editName:focus-visible,._8isrLa_page ._8isrLa_instruction:focus-visible{outline:none}@media (width<=1100px){._8isrLa_detail{--detail-gutter:20px}}@media (width<=760px){._8isrLa_hasDetails ._8isrLa_listPane{display:none}._8isrLa_detail{border-left:0;flex-basis:100%}._8isrLa_detailScroll{padding-top:20px}._8isrLa_saveNotice{display:none}}@media (width<=400px){._8isrLa_detail{--detail-gutter:16px}._8isrLa_detailTabsBar{gap:16px}._8isrLa_detailActions{gap:0}}._8isrLa_rowShell{border-radius:var(--dsw-radius-md);align-items:center;min-width:0;display:flex}._8isrLa_rowShell>._8isrLa_row{flex:auto;min-width:0}._8isrLa_rowQuickActions{flex:none;align-items:center;gap:2px;padding:0 8px 0 2px;display:flex}";
		const tagId$4 = "@stolyarovmn/dsh-schedule-native-manager/TaskManagerPage.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$4) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$4;
			tag.textContent = css$4;
			document.head.appendChild(tag);
		}
		var TaskManagerPage_module_css_default = {
			"confirmActions": "_8isrLa_confirmActions",
			"confirmContent": "_8isrLa_confirmContent",
			"confirmDialog": "_8isrLa_confirmDialog",
			"confirmTitle": "_8isrLa_confirmTitle",
			"creationActions": "_8isrLa_creationActions",
			"deleteButton": "_8isrLa_deleteButton",
			"delivery": "_8isrLa_delivery",
			"deliveryBody": "_8isrLa_deliveryBody",
			"deliveryGlyph": "_8isrLa_deliveryGlyph",
			"deliveryHead": "_8isrLa_deliveryHead",
			"deliveryHistory": "_8isrLa_deliveryHistory",
			"deliveryTime": "_8isrLa_deliveryTime",
			"detail": "_8isrLa_detail",
			"detailActions": "_8isrLa_detailActions",
			"detailContext": "_8isrLa_detailContext",
			"detailHeader": "_8isrLa_detailHeader",
			"detailIconButton": "_8isrLa_detailIconButton",
			"detailNotice": "_8isrLa_detailNotice",
			"detailRecords": "_8isrLa_detailRecords",
			"detailScroll": "_8isrLa_detailScroll",
			"detailTab": "_8isrLa_detailTab",
			"detailTabs": "_8isrLa_detailTabs",
			"detailTabsBar": "_8isrLa_detailTabsBar",
			"editName": "_8isrLa_editName",
			"empty": "_8isrLa_empty",
			"emptyAction": "_8isrLa_emptyAction",
			"emptyGlyph": "_8isrLa_emptyGlyph",
			"emptyTitle": "_8isrLa_emptyTitle",
			"endedRow": "_8isrLa_endedRow",
			"filterTab": "_8isrLa_filterTab",
			"filterTabActive": "_8isrLa_filterTabActive",
			"filterTabs": "_8isrLa_filterTabs",
			"filters": "_8isrLa_filters",
			"hasDetails": "_8isrLa_hasDetails",
			"instruction": "_8isrLa_instruction",
			"linkedSession": "_8isrLa_linkedSession",
			"linkedSessionLabel": "_8isrLa_linkedSessionLabel",
			"linkedSessionName": "_8isrLa_linkedSessionName",
			"linkedSessionTarget": "_8isrLa_linkedSessionTarget",
			"list": "_8isrLa_list",
			"listPane": "_8isrLa_listPane",
			"listRows": "_8isrLa_listRows",
			"menuGuard": "_8isrLa_menuGuard",
			"metadata": "_8isrLa_metadata",
			"newButton": "_8isrLa_newButton",
			"nextRun": "_8isrLa_nextRun",
			"nextRunRelative": "_8isrLa_nextRunRelative",
			"notice": "_8isrLa_notice",
			"page": "_8isrLa_page",
			"pageContent": "_8isrLa_pageContent",
			"pageHeading": "_8isrLa_pageHeading",
			"pageScroll": "_8isrLa_pageScroll",
			"pickerIcon": "_8isrLa_pickerIcon",
			"pickerTrigger": "_8isrLa_pickerTrigger",
			"readonlyName": "_8isrLa_readonlyName",
			"readonlyPrompt": "_8isrLa_readonlyPrompt",
			"recordsPanel": "_8isrLa_recordsPanel",
			"retentionEnd": "_8isrLa_retentionEnd",
			"retentionInfo": "_8isrLa_retentionInfo",
			"retentionLine": "_8isrLa_retentionLine",
			"retentionRule": "_8isrLa_retentionRule",
			"row": "_8isrLa_row",
			"rowContent": "_8isrLa_rowContent",
			"rowGlyph": "_8isrLa_rowGlyph",
			"rowQuickActions": "_8isrLa_rowQuickActions",
			"rowShell": "_8isrLa_rowShell",
			"rowSummary": "_8isrLa_rowSummary",
			"rowTitle": "_8isrLa_rowTitle",
			"ruleCard": "_8isrLa_ruleCard",
			"ruleControl": "_8isrLa_ruleControl",
			"ruleCurrent": "_8isrLa_ruleCurrent",
			"ruleHint": "_8isrLa_ruleHint",
			"ruleHintError": "_8isrLa_ruleHintError",
			"ruleInput": "_8isrLa_ruleInput",
			"ruleInterval": "_8isrLa_ruleInterval",
			"ruleIntervalArrow": "_8isrLa_ruleIntervalArrow",
			"ruleIntervalArrows": "_8isrLa_ruleIntervalArrows",
			"ruleIntervalInput": "_8isrLa_ruleIntervalInput",
			"ruleIntervalStepper": "_8isrLa_ruleIntervalStepper",
			"ruleIntervalUnit": "_8isrLa_ruleIntervalUnit",
			"ruleLabel": "_8isrLa_ruleLabel",
			"ruleMonthDays": "_8isrLa_ruleMonthDays",
			"ruleRow": "_8isrLa_ruleRow",
			"ruleRowMenu": "_8isrLa_ruleRowMenu",
			"ruleRows": "_8isrLa_ruleRows",
			"ruleValue": "_8isrLa_ruleValue",
			"ruleValueFace": "_8isrLa_ruleValueFace",
			"ruleWeekdays": "_8isrLa_ruleWeekdays",
			"saveFailure": "_8isrLa_saveFailure",
			"saveFooter": "_8isrLa_saveFooter",
			"saveNotice": "_8isrLa_saveNotice",
			"savedPrompt": "_8isrLa_savedPrompt",
			"savedPromptToggle": "_8isrLa_savedPromptToggle",
			"searchClear": "_8isrLa_searchClear",
			"searchField": "_8isrLa_searchField",
			"selectedRow": "_8isrLa_selectedRow",
			"tabBody": "_8isrLa_tabBody",
			"tabTitleIcon": "_8isrLa_tabTitleIcon",
			"zoneMenu": "_8isrLa_zoneMenu",
			"zoneSearch": "_8isrLa_zoneSearch"
		};
		//#endregion
		//#region src/client/CatalogFeedback.tsx
		/**
		* Render the catalog's loading and query-failure states.
		*
		* An empty panel centers a bare spinner while loading and the failure with its
		* retry; a panel that already shows content keeps a compact notice for a failed
		* refresh, and stays silent while a refresh loads, so the retained rows remain
		* readable. Deletion outcomes are not catalog states: the app-wide toast
		* announces them.
		* @param props - query state, whether content is shown, the retry action, and localized copy.
		* @returns the applicable states, or nothing while the catalog is ready.
		*/
		function CatalogFeedback({ status, populated, onRetry, t }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [status === "loading" && !populated && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: TaskManagerPage_module_css_default.empty,
				role: "status",
				"aria-label": t("list.loading"),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StateDot, { state: "ongoing" })
			}), status === "error" && (populated ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: TaskManagerPage_module_css_default.notice,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					role: "alert",
					children: t("list.error")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => {
						onRetry();
					},
					children: t("list.retry")
				})]
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: TaskManagerPage_module_css_default.empty,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWarningOutlineRegular, {
						size: 24,
						className: TaskManagerPage_module_css_default.emptyGlyph
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						className: TaskManagerPage_module_css_default.emptyTitle,
						children: t("list.error")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: TaskManagerPage_module_css_default.emptyAction,
						onClick: () => {
							onRetry();
						},
						children: t("list.retry")
					})
				]
			}))] });
		}
		//#endregion
		//#region src/vendor-util.ts
		function assertNever(value) {
			throw new Error("Unexpected value: " + String(value));
		}
		//#endregion
		//#region src/client/CalendarIcon.tsx
		/**
		* Draw the 14px calendar outline the Date row's trigger carries.
		*
		* The shared product icon set has no calendar glyph, so this package draws the
		* one its own picker needs, at that set's regular 1px stroke.
		* @param props - extra class for layout placement.
		* @returns the decorative glyph.
		*/
		function IconCalendarOutlineRegular({ className }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				width: "14",
				height: "14",
				className,
				viewBox: "0 0 14 14",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				"aria-hidden": "true",
				strokeWidth: "1",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
						x: "1.4",
						y: "2.6",
						width: "11.2",
						height: "10",
						rx: "1.6",
						stroke: "currentColor"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						d: "M1.4 5.6H12.6",
						stroke: "currentColor"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						d: "M4.4 1.4V3.6M9.6 1.4V3.6",
						stroke: "currentColor"
					})
				]
			});
		}
		//#endregion
		//#region src/client/task-timing.ts
		/**
		* Project only persisted rule fields, excluding catalog metadata and delivery receipts.
		* @param record - Rule from the current catalog.
		* @returns Independent complete expected rule for compare-and-update.
		*/
		function timingSnapshot(record) {
			const common = {
				id: record.id,
				title: record.title,
				prompt: record.prompt,
				scheduledAt: record.scheduledAt
			};
			switch (record.kind) {
				case "at": return {
					...common,
					kind: record.kind
				};
				case "after": return {
					...common,
					kind: record.kind,
					afterSeconds: record.afterSeconds
				};
				case "every": return {
					...common,
					kind: record.kind,
					everySeconds: record.everySeconds
				};
				case "daily": return {
					...common,
					kind: record.kind,
					time: record.time,
					timeZone: record.timeZone
				};
				case "weekly": return {
					...common,
					kind: record.kind,
					time: record.time,
					timeZone: record.timeZone,
					weekdays: [...record.weekdays]
				};
				case "cron": return {
					...common,
					kind: record.kind,
					expression: record.expression,
					timeZone: record.timeZone
				};
			}
			/* v8 ignore next -- Exhaustiveness guard for the closed ScheduleRecord union. */
			return assertNever(record);
		}
		/**
		* Zone a rule without a stored zone falls back to when the runtime cannot name
		* the device zone. A runtime that reports no zone stores `undefined`, which is
		* not an IANA id, so the draft needs one explicit fallback.
		*/
		const FALLBACK_ZONE = "UTC";
		/** IANA id the runtime reports for this device, or the explicit fallback. */
		function deviceZone() {
			return Intl.DateTimeFormat().resolvedOptions().timeZone || FALLBACK_ZONE;
		}
		/** Zone one rule carries when it stores one, otherwise undefined. */
		function storedZone(record) {
			return "timeZone" in record ? record.timeZone : void 0;
		}
		/**
		* The zone a new or switched-to rule starts its clock rows in, and whether that
		* zone came from the stored rule rather than this device.
		*
		* A daily, weekly, or cron record stores the zone its wall clock means, so
		* editing it keeps that zone. A one-shot `at` target and an `after` interval
		* store only the committed instant and no creation zone, so they start in this
		* device's zone.
		* @param record - rule the draft is seeded from.
		* @returns the draft's IANA zone and whether it is the no-stored-zone fallback.
		*/
		function draftZone(record) {
			const stored = storedZone(record);
			return stored === void 0 ? {
				zone: deviceZone(),
				stored: false
			} : {
				zone: stored,
				stored: true
			};
		}
		/**
		* The date and clock one instant names in one zone, keeping millisecond precision.
		*
		* The locale is fixed, so the field order never follows the interface language,
		* and each field is read by name rather than from a formatted string.
		* @param instant - canonical ISO instant.
		* @param zone - IANA zone the returned wall clock is expressed in.
		* @returns `YYYY-MM-DDTHH:MM:SS.mmm` in that zone.
		*/
		function zonedWallClock(instant, zone) {
			const at = new Date(instant);
			if (Number.isNaN(at.getTime())) return "";
			try {
				const fields = new Map(new Intl.DateTimeFormat("en-US", {
					timeZone: zone,
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					fractionalSecondDigits: 3,
					hourCycle: "h23"
				}).formatToParts(at).map((part) => [part.type, part.value]));
				return `${`${fields.get("year")}-${fields.get("month")}-${fields.get("day")}`}T${`${fields.get("hour")}:${fields.get("minute")}:${fields.get("second")}.${fields.get("fractionalSecond")}`}`;
			} catch {
				return "";
			}
		}
		/**
		* Initialize one-shot inputs in the zone the rule states, or in this device's
		* zone for a rule that stores none.
		*
		* An `at` target stores an instant and no creation zone, so its rows show that
		* instant in the draft's zone: the shown pair names the instant the record
		* already commits rather than restating it in a zone the record does not have.
		* @param record - Expected rule captured when editing starts.
		* @returns Native input values without rounding seconds or milliseconds.
		*/
		function timingDraft(record) {
			const draft = {
				date: "",
				time: "",
				timeZone: "",
				seconds: "",
				expression: ""
			};
			switch (record.kind) {
				case "at":
				case "after": {
					const zone = draftZone(record).zone;
					const wallClock = zonedWallClock(record.scheduledAt, zone);
					return {
						...draft,
						date: wallClock.slice(0, 10),
						time: wallClock.slice(11, 23),
						timeZone: zone
					};
				}
				case "every": return {
					...draft,
					seconds: String(record.everySeconds)
				};
				case "daily":
				case "weekly": return {
					...draft,
					time: record.time,
					timeZone: record.timeZone
				};
				case "cron": return {
					...draft,
					expression: record.expression,
					timeZone: record.timeZone
				};
			}
			/* v8 ignore next -- Exhaustiveness guard for the closed ScheduleRecord union. */
			return assertNever(record);
		}
		/**
		* One date as the rows and pickers expose it.
		*
		* The draft, the calendar's own comparisons, and the text submitted to the Host
		* all stay `YYYY-MM-DD`; only the exposed text takes the slashed form the design
		* states, so no caller has to parse or re-format a date merely to show it.
		* @param date - stored or staged ISO date text.
		* @returns the same date with slashes between its fields.
		*/
		function slashDate(date) {
			return date.replaceAll("-", "/");
		}
		/**
		* One clock time at whole-second precision.
		*
		* The rows and the clock picker both show `HH:MM:SS`; an untouched stored value
		* keeps its milliseconds in the draft so a save can submit them back.
		* @param time - stored or staged clock text, with or without fractional seconds.
		* @returns the same clock time at whole-second precision, or the input when it is not a clock time.
		*/
		function secondPrecision(time) {
			const match = /^(\d{2}):(\d{2})(?::(\d{2}))?/.exec(time);
			if (match === null) return time;
			return `${match[1]}:${match[2]}:${match[3] ?? "00"}`;
		}
		/**
		* Localize controlled Host failures without exposing transport or storage diagnostics.
		* @param code - Error code returned by the timing update.
		* @returns Dictionary key describing the recovery action.
		*/
		function timingError(code) {
			switch (code) {
				case "schedule_conflict": return "timing.conflict";
				case "schedule_ended": return "timing.inactive";
				case "schedule_not_found": return "timing.notFound";
				case "invalid_time_zone": return "timing.invalidZone";
				case "not_future": return "timing.notFuture";
				case "frequency_too_high": return "timing.invalidInterval";
				case "invalid_prompt":
				case "invalid_selector":
				case "invalid_rule":
				case "time_out_of_range": return "timing.invalid";
				case "internal_error": return "timing.error";
			}
			/* v8 ignore next -- Exhaustiveness guard for the closed ScheduleUpdateResult error-code union. */
			return assertNever(code);
		}
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/client/PickerPopover.module.css.mjs
		const css$3 = ".PBdDVq_panel{box-sizing:border-box;z-index:1100;background:var(--dsw-specific-menu);backdrop-filter:var(--dsw-menu-backdrop-filter);--dsw-elevation-stroke-color:var(--dsw-alias-border-l1);box-shadow:var(--dsw-elevation-prominent);--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);border:0;border-radius:16px;display:flex;position:fixed;top:auto;left:auto}";
		const tagId$3 = "@stolyarovmn/dsh-schedule-native-manager/PickerPopover.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var PickerPopover_module_css_default = { "panel": "PBdDVq_panel" };
		//#endregion
		//#region src/client/PickerPopover.tsx
		/** Anchored, outside-dismissed popover shell the timing pickers share. */
		/** Unplaced portal frame: laid out at the viewport origin but unpainted until measured. */
		const MEASURE_STYLE$1 = {
			visibility: "hidden",
			left: 0,
			top: 0
		};
		/**
		* Render one picker panel into `document.body`, fixed below its trigger.
		*
		* The panel is a portal, so an ancestor's `overflow` cannot crop it, and a
		* pointerdown outside both the trigger and the panel dismisses it.
		* @param props - open state, the trigger, the panel name and layout class, the dismissal callback, and the contents.
		* @returns the panel while open, and nothing while closed.
		*/
		function PickerPopover({ open, anchorRef, label, className, onClose, children }) {
			const panelRef = (0, react.useRef)(null);
			useDismissOnOutsidePointer(anchorRef, open, onClose, panelRef);
			const position = useAnchoredPosition({
				open,
				anchorRef,
				panelRef,
				gap: 4,
				margin: 12
			});
			if (!open) return null;
			return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				ref: panelRef,
				className: (0, import_vendor_clsx.default)(PickerPopover_module_css_default.panel, className),
				style: position ?? MEASURE_STYLE$1,
				role: "dialog",
				"aria-label": label,
				onClick: (event) => {
					event.stopPropagation();
				},
				children
			}), document.body);
		}
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/client/ClockPicker.module.css.mjs
		const css$2 = ".DFslta_clock{flex-direction:row;gap:2px;padding:3px}.DFslta_column{overscroll-behavior:contain;flex-direction:column;width:52px;max-height:216px;display:flex;overflow-y:auto}.DFslta_option{min-height:32px;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;cursor:pointer;border-radius:10px;outline:none;flex:none;justify-content:center;align-items:center;font-size:13px;line-height:1.6;display:flex}.DFslta_option:hover{background:var(--dsw-alias-interactive-bg-hover)}.DFslta_option:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}.DFslta_selected{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-button-ghost-active-fill);box-shadow:inset 0 0 0 1px var(--dsw-alias-button-ghost-active-border)}";
		const tagId$2 = "@stolyarovmn/dsh-schedule-native-manager/ClockPicker.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var ClockPicker_module_css_default = {
			"clock": "DFslta_clock",
			"column": "DFslta_column",
			"option": "DFslta_option",
			"selected": "DFslta_selected"
		};
		//#endregion
		//#region src/client/ClockPicker.tsx
		/**
		* Three-column clock picker for one staged Run time value.
		*
		* The picker owns only the panel: the row renders the read-only trigger that
		* shows the value, and its Escape guard closes the panel and hands focus back.
		*/
		/** Padded two-digit clock values from zero through `count - 1`. */
		function padded(count) {
			return Array.from({ length: count }, (_value, index) => String(index).padStart(2, "0"));
		}
		/** The picker's columns in display order, each with the label row copy names it by. */
		const COLUMNS = [
			{
				label: "timing.hour",
				options: padded(24)
			},
			{
				label: "timing.minute",
				options: padded(60)
			},
			{
				label: "timing.second",
				options: padded(60)
			}
		];
		/** A whole-second clock, the only text a pick composes onto. */
		const CLOCK_SECONDS = /^\d{2}:\d{2}:\d{2}$/;
		/**
		* The `HH:MM:SS` clock a pick composes onto.
		*
		* A value that states no clock at all starts from midnight, so the first pick
		* still submits one complete clock rather than leaving a row empty.
		* @param value - staged clock text.
		* @returns its whole-second clock, or midnight when it states none.
		*/
		function clockBase(value) {
			const seconds = secondPrecision(value);
			return CLOCK_SECONDS.test(seconds) ? seconds : "00:00:00";
		}
		/** The picker's columns in display order, by position. */
		const COLUMN_INDICES = [
			0,
			1,
			2
		];
		/**
		* Index of one column's option for one clock.
		* @param clock - whole-second clock text.
		* @param column - column index in display order.
		* @returns that column's option index, or the first option for a value the column does not list.
		*/
		function columnIndex(clock, column) {
			const options = COLUMNS[column].options;
			const start = column === 0 ? 0 : column * 3;
			return Math.max(0, options.indexOf(clock.slice(start, start + 2)));
		}
		/**
		* Render the clock panel: hours, minutes, and optionally seconds, one scrolling column each.
		* @param props - open state, the trigger, the staged clock, the pick and close callbacks, the seconds-column switch, and row copy.
		* @returns the anchored panel while open, and nothing while closed.
		*/
		function ClockPicker({ open, anchorRef, value, onPick, onClose, seconds = true, t }) {
			const columns = seconds ? COLUMNS : COLUMNS.slice(0, 2);
			const refs = (0, react.useRef)(/* @__PURE__ */ new Map());
			const valueRef = (0, react.useRef)(value);
			valueRef.current = value;
			const base = clockBase(value);
			const picked = [
				base.slice(0, 2),
				base.slice(3, 5),
				base.slice(6, 8)
			];
			const columnIndices = COLUMN_INDICES.map((column) => columnIndex(base, column));
			const [cursor, setCursor] = (0, react.useState)({
				column: 0,
				index: columnIndex(base, 0)
			});
			(0, react.useEffect)(() => {
				if (!open) return;
				setCursor({
					column: 0,
					index: columnIndex(clockBase(valueRef.current), 0)
				});
				for (const column of COLUMN_INDICES) refs.current.get(`${column}:${columnIndex(clockBase(valueRef.current), column)}`)?.scrollIntoView({ block: "nearest" });
			}, [open]);
			(0, react.useEffect)(() => {
				if (!open) return;
				refs.current.get(`${cursor.column}:${cursor.index}`)?.focus();
			}, [open, cursor]);
			/**
			* Stage one option and move the cursor onto it.
			* @param column - column index the option belongs to.
			* @param option - padded option text.
			* @param index - option index inside that column.
			*/
			const pick = (column, option, index) => {
				setCursor({
					column,
					index
				});
				const next = [...picked];
				next[column] = option;
				onPick(next.join(":"));
			};
			/**
			* Move inside one column, move between columns, or stage the option the
			* keyboard is on.
			* @param event - keydown from that option.
			* @param column - column index the option belongs to.
			* @param index - option index inside that column.
			* @param option - padded option text.
			* @param count - number of options in the column.
			*/
			const onOptionKeyDown = (event, column, index, option, count) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					pick(column, option, index);
					return;
				}
				if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
					event.preventDefault();
					const next = columns[column + (event.key === "ArrowRight" ? 1 : -1)];
					if (next === void 0) return;
					setCursor({
						column: columns.indexOf(next),
						index: Math.min(index, next.options.length - 1)
					});
					return;
				}
				if (event.key === "Home" || event.key === "End") {
					event.preventDefault();
					setCursor({
						column,
						index: event.key === "Home" ? 0 : count - 1
					});
					return;
				}
				if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
				event.preventDefault();
				const step = event.key === "ArrowDown" ? 1 : -1;
				setCursor({
					column,
					index: Math.min(Math.max(index + step, 0), count - 1)
				});
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PickerPopover, {
				open,
				anchorRef,
				label: t("timing.time"),
				className: ClockPicker_module_css_default.clock,
				onClose,
				children: columns.map((column, at) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					role: "listbox",
					"aria-label": t(column.label),
					className: ClockPicker_module_css_default.column,
					children: column.options.map((option, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						ref: (element) => {
							const key = `${at}:${index}`;
							if (element === null) refs.current.delete(key);
							else refs.current.set(key, element);
						},
						role: "option",
						"aria-selected": option === picked[at],
						tabIndex: (cursor.column === at ? cursor.index : columnIndices[at]) === index ? 0 : -1,
						className: (0, import_vendor_clsx.default)(ClockPicker_module_css_default.option, option === picked[at] && ClockPicker_module_css_default.selected),
						onClick: () => {
							pick(at, option, index);
						},
						onKeyDown: (event) => {
							onOptionKeyDown(event, at, index, option, column.options.length);
						},
						children: option
					}, option))
				}, column.label))
			});
		}
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/client/DatePicker.module.css.mjs
		const css$1 = ".jDcXiW_calendar{flex-direction:column;gap:4px;width:232px;padding:8px}.jDcXiW_head{justify-content:space-between;align-items:center;gap:4px;display:flex}.jDcXiW_title{color:var(--dsw-alias-label-primary);text-align:center;flex:auto;font-size:13px;line-height:1.6}.jDcXiW_nav{width:26px;height:26px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:0;border-radius:8px;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}.jDcXiW_nav:hover{background:var(--dsw-alias-interactive-bg-hover)}.jDcXiW_nav:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}.jDcXiW_grid{flex-direction:column;gap:2px;display:flex}.jDcXiW_week{grid-template-columns:repeat(7,1fr);gap:2px;display:grid}.jDcXiW_weekday{height:22px;color:var(--dsw-alias-label-tertiary);justify-content:center;align-items:center;font-size:11px;line-height:1.6;display:flex}.jDcXiW_cell{height:28px;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;cursor:pointer;border-radius:8px;outline:none;justify-content:center;align-items:center;font-size:13px;line-height:1.6;display:flex}.jDcXiW_cell:hover{background:var(--dsw-alias-interactive-bg-hover)}.jDcXiW_cell:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}.jDcXiW_cell[aria-current=date]{box-shadow:inset 0 0 0 .5px var(--dsw-alias-border-l3)}.jDcXiW_selected{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-button-ghost-active-fill);box-shadow:inset 0 0 0 1px var(--dsw-alias-button-ghost-active-border)}.jDcXiW_blank{height:28px}";
		const tagId$1 = "@stolyarovmn/dsh-schedule-native-manager/DatePicker.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var DatePicker_module_css_default = {
			"blank": "jDcXiW_blank",
			"calendar": "jDcXiW_calendar",
			"cell": "jDcXiW_cell",
			"grid": "jDcXiW_grid",
			"head": "jDcXiW_head",
			"nav": "jDcXiW_nav",
			"selected": "jDcXiW_selected",
			"title": "jDcXiW_title",
			"week": "jDcXiW_week",
			"weekday": "jDcXiW_weekday"
		};
		//#endregion
		//#region src/client/DatePicker.tsx
		/**
		* Month calendar for one staged one-shot date.
		*
		* The picker owns only the panel: the row renders the read-only trigger, whose
		* text exposes the date as `YYYY/MM/DD` while the draft it stages keeps the ISO
		* text this panel writes back and the Host receives. The row's Escape guard
		* closes the panel and hands focus back.
		*/
		/** ISO calendar date, the only text this row stores. */
		const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
		/** Weekday column headings, Monday first as the weekly choice orders them. */
		const WEEKDAY_KEYS$1 = [
			"frequency.weekday.1",
			"frequency.weekday.2",
			"frequency.weekday.3",
			"frequency.weekday.4",
			"frequency.weekday.5",
			"frequency.weekday.6",
			"frequency.weekday.7"
		];
		/** Arrow key to the number of days it moves the focused cell. */
		const STEP_BY_KEY = {
			ArrowLeft: -1,
			ArrowRight: 1,
			ArrowUp: -7,
			ArrowDown: 7
		};
		/**
		* The month and day one stored date opens on.
		* @param date - staged ISO date text.
		* @returns its own year, month, and day, or today when it is not an ISO calendar date.
		*/
		function viewOf(date) {
			const match = ISO_DATE.exec(date);
			if (match === null) {
				const today = /* @__PURE__ */ new Date();
				return {
					year: today.getFullYear(),
					month: today.getMonth(),
					day: today.getDate()
				};
			}
			return {
				year: Number(match[1]),
				month: Number(match[2]) - 1,
				day: Number(match[3])
			};
		}
		/** Zero-padded two-digit field. */
		function pad(value) {
			return String(value).padStart(2, "0");
		}
		/**
		* Last day of one month.
		* @param view - year and zero-based month.
		* @returns that month's length in days.
		*/
		function daysIn(view) {
			return new Date(Date.UTC(view.year, view.month + 1, 0)).getUTCDate();
		}
		/**
		* The same day in another month, clamped to that month's length.
		* @param view - current month and day.
		* @param step - months to move, negative for earlier.
		* @returns the moved view.
		*/
		function shiftMonth(view, step) {
			const months = view.year * 12 + view.month + step;
			const moved = {
				year: Math.floor(months / 12),
				month: months % 12
			};
			return {
				...moved,
				day: Math.min(view.day, daysIn(moved))
			};
		}
		/**
		* ISO text of one day in a shown month.
		* @param view - shown year and month.
		* @param day - day of that month.
		* @returns `YYYY-MM-DD`.
		*/
		function isoOf(view, day) {
			return `${view.year}-${pad(view.month + 1)}-${pad(day)}`;
		}
		/**
		* Render the month panel: one localized heading row over weeks of day cells.
		* @param props - open state, the trigger, the staged date, the pick and close callbacks, and row copy.
		* @returns the anchored panel while open, and nothing while closed.
		*/
		function DatePicker({ open, anchorRef, value, onPick, onClose, t }) {
			const refs = (0, react.useRef)(/* @__PURE__ */ new Map());
			const valueRef = (0, react.useRef)(value);
			valueRef.current = value;
			const [view, setView] = (0, react.useState)(() => viewOf(value));
			const today = /* @__PURE__ */ new Date();
			const todayIso = isoOf({
				year: today.getFullYear(),
				month: today.getMonth()
			}, today.getDate());
			(0, react.useEffect)(() => {
				if (!open) return;
				setView(viewOf(valueRef.current));
			}, [open]);
			(0, react.useEffect)(() => {
				if (!open) return;
				refs.current.get(String(view.day))?.focus();
			}, [open, view]);
			/**
			* Stage one day of the shown month and leave the keyboard on it.
			* @param day - day of the shown month.
			*/
			const pick = (day) => {
				setView((current) => ({
					...current,
					day
				}));
				onPick(isoOf(view, day));
			};
			/**
			* Move the focused cell inside the month, or stage the day it is on.
			* @param event - keydown from that cell.
			* @param day - day of the shown month the cell holds.
			*/
			const onCellKeyDown = (event, day) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					pick(day);
					return;
				}
				const step = STEP_BY_KEY[event.key] ?? 0;
				if (step === 0) return;
				event.preventDefault();
				const last = daysIn(view);
				setView((current) => ({
					...current,
					day: Math.min(Math.max(day + step, 1), last)
				}));
			};
			const offset = (new Date(Date.UTC(view.year, view.month, 1)).getUTCDay() + 6) % 7;
			const total = daysIn(view);
			const cellCount = Math.ceil((offset + total) / 7) * 7;
			const weeks = Array.from({ length: cellCount / 7 }, (_value, week) => week);
			const monthTitle = new Intl.DateTimeFormat(t("time.locale"), {
				month: "long",
				year: "numeric",
				timeZone: "UTC"
			}).format(Date.UTC(view.year, view.month, 1));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(PickerPopover, {
				open,
				anchorRef,
				label: t("timing.date"),
				className: DatePicker_module_css_default.calendar,
				onClose,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: DatePicker_module_css_default.head,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: DatePicker_module_css_default.nav,
							"aria-label": t("timing.prevMonth"),
							onClick: () => {
								setView((current) => shiftMonth(current, -1));
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronLeftOutlineRegular, {})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: DatePicker_module_css_default.title,
							"aria-live": "polite",
							children: monthTitle
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: DatePicker_module_css_default.nav,
							"aria-label": t("timing.nextMonth"),
							onClick: () => {
								setView((current) => shiftMonth(current, 1));
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronRightOutlineRegular, {})
						})
					]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: DatePicker_module_css_default.grid,
					role: "grid",
					"aria-label": monthTitle,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						role: "row",
						className: DatePicker_module_css_default.week,
						children: WEEKDAY_KEYS$1.map((key) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							role: "columnheader",
							className: DatePicker_module_css_default.weekday,
							children: t(key)
						}, key))
					}), weeks.map((week) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						role: "row",
						className: DatePicker_module_css_default.week,
						children: Array.from({ length: 7 }, (_value, column) => week * 7 + column - offset + 1).map((day) => day < 1 || day > total ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							role: "gridcell",
							"aria-hidden": "true",
							className: DatePicker_module_css_default.blank
						}, day) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							ref: (element) => {
								if (element === null) refs.current.delete(String(day));
								else refs.current.set(String(day), element);
							},
							role: "gridcell",
							"aria-selected": isoOf(view, day) === value,
							"aria-current": isoOf(view, day) === todayIso ? "date" : void 0,
							tabIndex: day === view.day ? 0 : -1,
							className: (0, import_vendor_clsx.default)(DatePicker_module_css_default.cell, isoOf(view, day) === value && DatePicker_module_css_default.selected),
							onClick: () => {
								pick(day);
							},
							onKeyDown: (event) => {
								onCellKeyDown(event, day);
							},
							children: day
						}, day))
					}, week))]
				})]
			});
		}
		//#endregion
		//#region src/client/task-cron.ts
		/**
		* Client-side parsing, description, and structured shapes of the five-field
		* cron expressions the Run time card edits.
		*
		* The Host owns canonicalization, occurrence selection, and dispatch. This
		* module parses the same dialect so the card can reject a malformed expression
		* locally, describe a valid one without a Host round trip, and recognize the
		* common shapes the card's cron builder edits as structured rows.
		*/
		/** Field bounds of the supported dialect, in `minute hour day-of-month month day-of-week` order. */
		const CRON_FIELDS = [
			{
				min: 0,
				max: 59,
				count: 60
			},
			{
				min: 0,
				max: 23,
				count: 24
			},
			{
				min: 1,
				max: 31,
				count: 31
			},
			{
				min: 1,
				max: 12,
				count: 12
			},
			{
				min: 0,
				max: 7,
				count: 7,
				foldMax: 7
			}
		];
		/** One stepped element over the whole field. */
		const CRON_STEP = /^\*\/(?<step>\d+)$/;
		/** One value, range, or range with step. */
		const CRON_ELEMENT = /^(?<start>\d+)(?:-(?<end>\d+))?(?:\/(?<step>\d+))?$/;
		/** ISO weekday dictionary keys indexed by ISO weekday minus one. */
		const CRON_WEEKDAY_KEYS = [
			"frequency.weekday.1",
			"frequency.weekday.2",
			"frequency.weekday.3",
			"frequency.weekday.4",
			"frequency.weekday.5",
			"frequency.weekday.6",
			"frequency.weekday.7"
		];
		/** Most clock times the description spells out before it names minutes and hours instead. */
		const CRON_TIME_LIST_LIMIT = 6;
		/**
		* List one inclusive arithmetic range.
		* @param from - first value.
		* @param to - last value.
		* @param step - positive increment.
		* @returns ascending values from `from` through `to`.
		*/
		function ascendingRange(from, to, step) {
			const values = [];
			for (let value = from; value <= to; value += step) values.push(value);
			return values;
		}
		/**
		* Read one in-range field element value.
		* @param text - digits of one element value.
		* @param spec - bounds of the field it belongs to.
		* @returns the value, or undefined when it is outside the field.
		*/
		function cronValue(text, spec) {
			const value = Number(text);
			return Number.isSafeInteger(value) && value >= spec.min && value <= spec.max ? value : void 0;
		}
		/**
		* Read one positive field step.
		* @param text - digits of one step.
		* @returns the step, or undefined when it is not a positive safe integer.
		*/
		function cronStep(text) {
			const value = Number(text);
			return Number.isSafeInteger(value) && value >= 1 ? value : void 0;
		}
		/**
		* Expand one comma-separated element into the values it matches.
		* @param element - one element of a field.
		* @param spec - bounds of the field it belongs to.
		* @returns matched values, or undefined when the Host would reject the element.
		*/
		function cronElementValues(element, spec) {
			if (element.length === 0) return void 0;
			if (element === "*") return ascendingRange(spec.min, spec.max, 1);
			if (element.startsWith("*")) {
				const groups = CRON_STEP.exec(element)?.groups;
				if (groups === void 0) return void 0;
				const stepText = groups["step"];
				/* v8 ignore next -- a successful fixed regex always provides the step group. */
				if (stepText === void 0) return void 0;
				const step = cronStep(stepText);
				return step === void 0 ? void 0 : ascendingRange(spec.min, spec.max, step);
			}
			const groups = CRON_ELEMENT.exec(element)?.groups;
			if (groups === void 0) return void 0;
			const startText = groups["start"];
			/* v8 ignore next -- a successful fixed regex always provides the start group. */
			if (startText === void 0) return void 0;
			const start = cronValue(startText, spec);
			if (start === void 0) return void 0;
			const end = groups["end"];
			if (end === void 0) return groups["step"] === void 0 ? [start] : void 0;
			const last = cronValue(end, spec);
			if (last === void 0 || start > last) return void 0;
			const stepText = groups["step"];
			const step = stepText === void 0 ? 1 : cronStep(stepText);
			return step === void 0 ? void 0 : ascendingRange(start, last, step);
		}
		/**
		* Expand one whitespace-free cron field into its matched value set.
		* @param raw - one field of the expression.
		* @param spec - bounds of that field.
		* @returns unique ascending values with Sunday folded, or undefined when malformed.
		*/
		function cronFieldValues(raw, spec) {
			const matched = /* @__PURE__ */ new Set();
			for (const element of raw.split(",")) {
				const values = cronElementValues(element, spec);
				if (values === void 0) return void 0;
				for (const value of values) matched.add(value === spec.foldMax ? spec.min : value);
			}
			return [...matched].sort((left, right) => left - right);
		}
		/**
		* Failure reading a value the cron parser's own matching already proved present.
		*/
		/* v8 ignore next -- constructed only by the unreachable bounds guard below. */
		var CronInvariantError = class extends Error {
			/**
			* Construct an invariant failure.
			* @param message - violated invariant.
			*/
			constructor(message) {
				super(message);
				this.name = "CronInvariantError";
			}
		};
		/**
		* Read one array element the caller's own length guard already bounds.
		* @param values - array whose length the caller checked.
		* @param index - index inside that length.
		* @returns the element at that index.
		*/
		function cronElementAt(values, index) {
			const value = values[index];
			/* v8 ignore next -- every caller reads an index inside an array length it already proved. */
			if (value === void 0) throw new CronInvariantError("cron description read an index outside its array");
			return value;
		}
		/**
		* Parse one five-field cron expression in the dialect the Host accepts.
		* @param expression - candidate `minute hour day-of-month month day-of-week` text.
		* @returns parsed fields, or undefined when the Host would reject the expression.
		*/
		function parseCronExpression(expression) {
			if (expression.length === 0 || expression.trim() !== expression) return void 0;
			const fields = expression.split(/\s+/);
			if (fields.length !== 5) return void 0;
			const [minutes, hours, daysOfMonth, months, daysOfWeek] = fields.map((field, index) => {
				const spec = cronElementAt(CRON_FIELDS, index);
				const values = cronFieldValues(field, spec);
				return values === void 0 ? void 0 : (() => {
					const starred = field.startsWith("*");
					const full = values.length === spec.count;
					return {
						values,
						starred,
						full,
						unrestricted: starred && full
					};
				})();
			});
			if (minutes === void 0 || hours === void 0 || daysOfMonth === void 0 || months === void 0 || daysOfWeek === void 0) return void 0;
			return {
				minutes,
				hours,
				daysOfMonth,
				months,
				daysOfWeek
			};
		}
		/**
		* Zero one field value to two digits.
		* @param value - number to spell.
		* @returns the value padded to at least two digits.
		*/
		function twoDigits(value) {
			return String(value).padStart(2, "0");
		}
		/**
		* Split ascending values into runs of consecutive numbers.
		* @param values - unique ascending values.
		* @returns the runs, each ascending, in value order.
		*/
		function consecutiveRuns(values) {
			const runs = [];
			for (const value of values) {
				const run = runs[runs.length - 1];
				if (run !== void 0 && cronElementAt(run, run.length - 1) + 1 === value) run.push(value);
				else runs.push([value]);
			}
			return runs;
		}
		/**
		* Join one list of numbers with the localized list separator.
		* @param values - numbers to spell.
		* @param t - cron translations supplying the separator.
		* @returns the localized list.
		*/
		function numberList(values, t) {
			return values.map(String).join(t("cron.list.join"));
		}
		/**
		* Render cron weekdays as localized names, collapsing a run of three or more
		* consecutive days into one range.
		* @param values - cron weekdays, Sunday 0 through Saturday 6, ascending.
		* @param t - cron and weekday translations.
		* @returns localized weekday text, for example `Mon–Fri` or `Mon, Wed`.
		*/
		function cronWeekdayText(values, t) {
			const join = t("cron.list.join");
			const name = (day) => t("cron.weekday.name", { weekday: t(cronElementAt(CRON_WEEKDAY_KEYS, day - 1)) });
			return consecutiveRuns(values.map((value) => value === 0 ? 7 : value).sort((left, right) => left - right)).map((run) => run.length >= 3 ? t("cron.weekday.range", {
				from: name(cronElementAt(run, 0)),
				to: name(cronElementAt(run, run.length - 1))
			}) : run.map(name).join(join)).join(join);
		}
		/**
		* Name the months a rule restricts, or nothing when it matches every month.
		* @param values - matched months, January 1 through December 12.
		* @param locale - active UI locale naming the months.
		* @param t - cron translations.
		* @returns localized month suffix, or an empty string for all twelve months.
		*/
		function cronMonthSuffix(values, locale, t) {
			if (values.length === 12) return "";
			const format = new Intl.DateTimeFormat(locale, {
				month: "long",
				timeZone: "UTC"
			});
			return t("cron.months", { months: values.map((month) => format.format(Date.UTC(2026, month - 1, 1))).join(t("cron.list.join")) });
		}
		/**
		* Describe the days one parsed rule matches.
		* @param parsed - parsed cron expression.
		* @param locale - active UI locale naming restricted months.
		* @param t - cron translations.
		* @returns whether the phrase states no day restriction at all, and the localized day phrase.
		*/
		function cronDayText(parsed, locale, t) {
			const months = cronMonthSuffix(parsed.months.values, locale, t);
			const weekdays = cronWeekdayText(parsed.daysOfWeek.values, t);
			const params = {
				days: numberList(parsed.daysOfMonth.values, t),
				weekdays,
				months
			};
			const dayOfMonth = parsed.daysOfMonth;
			const dayOfWeek = parsed.daysOfWeek;
			if (dayOfMonth.starred || dayOfWeek.starred) {
				if (dayOfMonth.full && dayOfWeek.full) return {
					everyDay: months === "",
					text: t("cron.day.every", { months })
				};
				if (dayOfMonth.full) return {
					everyDay: false,
					text: t("cron.day.weekdays", params)
				};
				if (dayOfWeek.full) return {
					everyDay: false,
					text: t("cron.day.monthDays", params)
				};
				return {
					everyDay: false,
					text: t("cron.day.bothStarred", params)
				};
			}
			if (dayOfMonth.full || dayOfWeek.full) return {
				everyDay: months === "",
				text: t("cron.day.every", { months })
			};
			return {
				everyDay: false,
				text: t("cron.day.both", params)
			};
		}
		/**
		* Name a restricted hour set as a contiguous range or an explicit list.
		* @param values - matched hours, ascending.
		* @param t - cron translations.
		* @returns localized hour scope, for example `09–17` or `09, 15`.
		*/
		function cronHourText(values, t) {
			const hours = values.map(twoDigits);
			return hours.length >= 2 && cronElementAt(values, values.length - 1) - cronElementAt(values, 0) === values.length - 1 ? t("cron.hours.range", {
				from: cronElementAt(hours, 0),
				to: cronElementAt(hours, hours.length - 1)
			}) : t("cron.hours.list", { hours: hours.join(t("cron.list.join")) });
		}
		/**
		* Read the uniform step of a field that covers its whole range.
		* @param values - unique ascending matched values.
		* @param min - lowest value of the field.
		* @param max - highest value of the field.
		* @returns the step when the values cover the whole field in equal increments, otherwise undefined.
		*/
		function cronFullRangeStep(values, min, max) {
			if (values.length < 2) return void 0;
			const first = cronElementAt(values, 0);
			if (first !== min) return void 0;
			const step = cronElementAt(values, 1) - first;
			for (let index = 1; index < values.length; index += 1) if (cronElementAt(values, index) - cronElementAt(values, index - 1) !== step) return void 0;
			return cronElementAt(values, values.length - 1) + step > max ? step : void 0;
		}
		/**
		* Describe the times of day one parsed rule matches.
		*
		* `interval` marks the phrases that state the repetition themselves; they read
		* as a whole sentence on their own and need the lower-case `joined` wording
		* when a day phrase precedes them.
		* @param parsed - parsed cron expression.
		* @param t - cron translations.
		* @returns whether the phrase states the repeating interval itself, its standalone
		* text, and its text after a day phrase.
		*/
		function cronTimeText(parsed, t) {
			const step = parsed.minutes.unrestricted ? void 0 : cronFullRangeStep(parsed.minutes.values, 0, 59);
			if (parsed.hours.unrestricted) {
				if (parsed.minutes.unrestricted) return {
					interval: true,
					text: t("cron.time.everyMinute"),
					joined: t("cron.time.joinedEveryMinute")
				};
				if (step !== void 0 && step >= 2) return {
					interval: true,
					text: t("cron.time.everyMinutes", { step }),
					joined: t("cron.time.joinedEveryMinutes", { step })
				};
				if (parsed.minutes.values.length === 1 && cronElementAt(parsed.minutes.values, 0) === 0) return {
					interval: true,
					text: t("cron.time.everyHour"),
					joined: t("cron.time.joinedEveryHour")
				};
				return {
					interval: false,
					text: t("cron.time.hourlyAt", { minutes: numberList(parsed.minutes.values, t) }),
					joined: t("cron.time.joinedHourlyAt", { minutes: numberList(parsed.minutes.values, t) })
				};
			}
			const hours = cronHourText(parsed.hours.values, t);
			if (parsed.minutes.unrestricted) {
				const text = t("cron.time.hoursEveryMinute", { hours });
				return {
					interval: false,
					text,
					joined: text
				};
			}
			if (step !== void 0 && step >= 2) {
				const text = t("cron.time.hoursEveryMinutes", {
					hours,
					step
				});
				return {
					interval: false,
					text,
					joined: text
				};
			}
			const hourStep = cronFullRangeStep(parsed.hours.values, 0, 23);
			if (parsed.minutes.values.length === 1 && cronElementAt(parsed.minutes.values, 0) === 0 && hourStep !== void 0 && hourStep >= 2) return {
				interval: true,
				text: t("cron.time.everyNHours", { count: hourStep }),
				joined: t("cron.time.joinedEveryNHours", { count: hourStep })
			};
			const times = parsed.hours.values.flatMap((hour) => parsed.minutes.values.map((minute) => `${twoDigits(hour)}:${twoDigits(minute)}`));
			const text = times.length <= CRON_TIME_LIST_LIMIT ? t("cron.time.at", { times: times.join(t("cron.list.join")) }) : t("cron.time.hoursAt", {
				hours,
				minutes: numberList(parsed.minutes.values, t)
			});
			return {
				interval: false,
				text,
				joined: text
			};
		}
		/**
		* Describe one parsed cron expression as one localized sentence.
		* @param parsed - parsed cron expression.
		* @param t - cron translations.
		* @param locale - active UI locale naming restricted months.
		* @returns localized sentence, for example `Mon–Fri at 09:00` or `Every 15 minutes`.
		*/
		function cronPreview(parsed, t, locale) {
			const day = cronDayText(parsed, locale, t);
			const time = cronTimeText(parsed, t);
			return day.everyDay && time.interval ? time.text : [day.text, time.joined].join(t("cron.part.join"));
		}
		/**
		* Recognize the structured shape one parsed expression states, when one does.
		*
		* Every shape requires an unrestricted month. Exactly one of the two day fields
		* may restrict: a restricted weekday beside a star day-of-month is a weekly
		* rule, a restricted day-of-month beside a star weekday is a monthly rule, and
		* both restricting is unrecognized because each restriction matches
		* independently under the Host's Vixie union rule. Only a literal star states a
		* day field with no restriction: a written-out full set such as `0-6` or `1-31`
		* stays a weekly or monthly rule with every value selected, so toggling the
		* last pill on never collapses its row. Stepped shapes accept any uniform
		* full-range step on the clock, spelled with a star or written out, since both
		* match the same minutes or hours.
		* @param parsed - parsed cron expression.
		* @returns the shape the builder can edit, or undefined for the raw-expression fallback.
		*/
		function recognizeCronShape(parsed) {
			if (!parsed.months.full) return void 0;
			const minuteStep = parsed.minutes.unrestricted ? 1 : cronFullRangeStep(parsed.minutes.values, 0, 59);
			const hourStep = parsed.hours.unrestricted ? 1 : cronFullRangeStep(parsed.hours.values, 0, 23);
			const minute = parsed.minutes.values.length === 1 ? cronElementAt(parsed.minutes.values, 0) : void 0;
			const hour = parsed.hours.values.length === 1 ? cronElementAt(parsed.hours.values, 0) : void 0;
			if (parsed.daysOfWeek.unrestricted) {
				if (parsed.daysOfMonth.unrestricted) {
					if (minuteStep !== void 0 && parsed.hours.full) return {
						kind: "minutely",
						step: minuteStep
					};
					if (minute !== void 0 && hourStep !== void 0) return {
						kind: "hourly",
						step: hourStep,
						minute
					};
					if (minute !== void 0 && hour !== void 0) return {
						kind: "daily",
						hour,
						minute
					};
					return;
				}
				if (minute === void 0 || hour === void 0) return void 0;
				return {
					kind: "monthly",
					days: parsed.daysOfMonth.values,
					hour,
					minute
				};
			}
			if (!parsed.daysOfMonth.unrestricted || minute === void 0 || hour === void 0) return void 0;
			return {
				kind: "weekly",
				weekdays: parsed.daysOfWeek.values.map((value) => value === 0 ? 7 : value).sort((left, right) => left - right),
				hour,
				minute
			};
		}
		/**
		* Spell ascending unique field values as cron list text, collapsing a run of
		* three or more consecutive values into one range.
		* @param values - ascending unique field values.
		* @returns cron list text, for example `1-3,10`.
		*/
		function cronRunField(values) {
			return consecutiveRuns(values).map((run) => run.length >= 3 ? `${cronElementAt(run, 0)}-${cronElementAt(run, run.length - 1)}` : run.join(",")).join(",");
		}
		/**
		* Spell one builder shape's weekday set as a cron day-of-week field.
		* @param weekdays - ISO weekdays, Monday 1 through Sunday 7.
		* @returns ascending cron weekday field text, Sunday spelled as 0.
		*/
		function cronWeekdayField(weekdays) {
			return cronRunField([...new Set(weekdays.map((day) => day % 7))].sort((left, right) => left - right));
		}
		/**
		* Spell one builder shape as the five-field expression a save submits.
		*
		* `recognizeCronShape` recognizes every expression this returns as the same
		* shape, so a builder edit never falls back to the raw-expression row.
		* @param state - builder shape to spell.
		* @returns the expression stating that shape.
		*/
		function cronShapeExpression(state) {
			switch (state.kind) {
				case "minutely": return state.step === 1 ? "* * * * *" : `*/${state.step} * * * *`;
				case "hourly": return state.step === 1 ? `${state.minute} * * * *` : `${state.minute} */${state.step} * * *`;
				case "daily": return `${state.minute} ${state.hour} * * *`;
				case "weekly": return `${state.minute} ${state.hour} * * ${cronWeekdayField(state.weekdays)}`;
				case "monthly": return `${state.minute} ${state.hour} ${cronRunField([...new Set(state.days)].sort((left, right) => left - right))} * *`;
				/* v8 ignore next -- every CronBuilderState kind has a case above. */
				default: return assertNever(state);
			}
		}
		//#endregion
		//#region src/client/schedule-format.ts
		/** Universal fallback when a runtime cannot enumerate its ICU time-zone data. */
		const FALLBACK_ZONES = ["UTC"];
		const SECOND_MS = 1e3;
		const SECOND_UNIT = {
			unit: "second",
			seconds: 1
		};
		const UNIT_SECONDS = [
			{
				unit: "day",
				seconds: 86400
			},
			{
				unit: "hour",
				seconds: 3600
			},
			{
				unit: "minute",
				seconds: 60
			},
			SECOND_UNIT
		];
		const WEEKDAY_KEYS = [
			"frequency.weekday.1",
			"frequency.weekday.2",
			"frequency.weekday.3",
			"frequency.weekday.4",
			"frequency.weekday.5",
			"frequency.weekday.6",
			"frequency.weekday.7"
		];
		/** Localized unit word for one integral magnitude. */
		function unitLabel(unit, value, t) {
			return t(`unit.${unit}.${value === 1 ? "one" : "other"}`, { count: value });
		}
		/**
		* Name one task from its stored title.
		*
		* Every decoded Host record and catalog entry carries a title that is non-empty
		* after trimming, so no name is derived from the instruction here. The
		* `schedule_create` card derives one only for a result read from a Session log
		* written before the stored field existed.
		* @param record - task being named.
		* @returns the stored title.
		*/
		function taskName(record) {
			return record.title;
		}
		/** Localized clock text that omits fractional seconds and zero seconds. */
		function clockLabel(time) {
			return time.replace(/\.\d+$/, "").replace(/:00$/, "");
		}
		/**
		* Render the stored ISO weekday set with localized names joined in locale order.
		* @param weekdays - Stored unique ascending ISO weekdays.
		* @param t - frequency, join, and unit translations.
		* @returns Localized weekday list, for example `Mon, Wed`.
		*/
		function formatWeekdays(weekdays, t) {
			return weekdays.map((weekday) => t(WEEKDAY_KEYS[weekday - 1] ?? "frequency.weekday.1")).join(t("frequency.weekday.join"));
		}
		/** UTC offset, in minutes, of one IANA zone at the current instant. */
		function zoneOffset(zone, at) {
			try {
				const value = new Intl.DateTimeFormat("en-US", {
					timeZone: zone,
					timeZoneName: "longOffset"
				}).formatToParts(at).find((part) => part.type === "timeZoneName")?.value;
				if (value === "GMT") return 0;
				const match = /^GMT([+-])(\d{2}):(\d{2})$/.exec(value ?? "");
				if (match === null) return void 0;
				const minutes = Number(match[2]) * 60 + Number(match[3]);
				return match[1] === "-" ? -minutes : minutes;
			} catch {
				return;
			}
		}
		/** Stable UTC-offset label for one valid IANA zone. */
		function zoneOffsetLabel(zone, at, prefix) {
			const minutes = zoneOffset(zone, at);
			if (minutes === void 0) return void 0;
			const absolute = Math.abs(minutes);
			const hours = String(Math.floor(absolute / 60)).padStart(2, "0");
			const remainder = String(absolute % 60).padStart(2, "0");
			return `${prefix}${minutes < 0 ? "-" : "+"}${hours}:${remainder}`;
		}
		/**
		* Localize one IANA zone through the runtime's ICU/CLDR data, prefixed by its
		* current UTC offset. The raw IANA id remains internal unless ICU cannot name
		* a valid stored alias.
		* @param zone - IANA zone to label.
		* @param t - translate providing the active ICU locale.
		* @param at - instant used to resolve the current UTC offset and zone name.
		* @returns the UTC offset and localized zone name.
		*/
		function zoneLabel(zone, t, at = Date.now()) {
			const offset = zoneOffsetLabel(zone, at, t("time.utcPrefix"));
			try {
				const name = new Intl.DateTimeFormat(t("time.locale"), {
					timeZone: zone,
					timeZoneName: "longGeneric"
				}).formatToParts(at).find((part) => part.type === "timeZoneName")?.value;
				if (offset === void 0) return name ?? zone;
				return name === void 0 || /^GMT(?:[+-]|$)/.test(name) ? offset : `${offset} · ${name}`;
			} catch {
				return offset === void 0 ? zone : `${offset} · ${zone}`;
			}
		}
		/**
		* Name one zone and mark it when it is the host's own zone.
		* @param zone - IANA zone to name.
		* @param system - the host's current IANA zone.
		* @param t - translate providing the active ICU locale and system suffix.
		* @param at - instant used to resolve the current UTC offset and zone name.
		* @returns UTC offset and localized zone name, with the system suffix when applicable.
		*/
		function zoneName(zone, system, t, at = Date.now()) {
			const name = zoneLabel(zone, t, at);
			return zone === system ? `${name}${t("rule.zone.system")}` : name;
		}
		/**
		* IANA zones this runtime enumerates, or `undefined` when it cannot enumerate.
		*
		* `Intl.supportedValuesOf('timeZone')` (ES2022) returns the engine's own
		* inventory. An engine without the method, and one whose `Intl` refuses the
		* call, both throw here; `undefined` then keeps `zoneChoices` on its minimal
		* fallback rather than an empty menu.
		* @returns the enumerated IANA zones, or `undefined` when enumeration fails.
		*/
		function timeZoneInventory() {
			try {
				return Intl.supportedValuesOf("timeZone");
			} catch {
				return;
			}
		}
		/**
		* Zones the time-zone menu offers, in menu order: the host's current zone,
		* followed by the runtime's IANA inventory ordered by current UTC offset and
		* canonical id, including a stored alias the inventory omits.
		*
		* `Intl.supportedValuesOf('timeZone')` supplies the inventory, so an engine
		* that can enumerate zones offers all of them. When enumeration is unavailable,
		* the menu falls back to the host zone, UTC, and any stored zone, so it is never
		* empty. A stored zone outside the inventory is appended,
		* so an accepted alias never disappears from the menu.
		* @param stored - zone the shown rule stores.
		* @param system - the host's current IANA zone.
		* @param at - instant used to order zones by their current UTC offset.
		* @returns IANA zones in menu order, de-duplicated.
		*/
		function zoneChoices(stored, system, at = Date.now()) {
			const inventory = timeZoneInventory();
			const zones = inventory === void 0 ? FALLBACK_ZONES : [...FALLBACK_ZONES, ...inventory];
			return [system, ...[...new Set([...zones, stored])].filter((zone) => zone !== system).map((zone) => ({
				zone,
				offset: zoneOffset(zone, at) ?? Number.POSITIVE_INFINITY
			})).sort((left, right) => {
				if (left.offset !== right.offset) return left.offset - right.offset;
				return left.zone < right.zone ? -1 : 1;
			}).map((entry) => entry.zone)];
		}
		/**
		* IANA zone a record's stored wall-clock rule interprets its time in.
		*
		* Daily, weekly, and cron records store an explicit zone. One-shot `at` and
		* `after` records, and fixed-interval `every` records, store only the UTC
		* instant, so they have no rule zone and their displayed time uses the browser zone.
		* @param record - reminder whose kind determines whether a zone is stored.
		* @returns the stored IANA zone, or undefined when the record stores none.
		*/
		function recordTimeZone(record) {
			switch (record.kind) {
				case "after":
				case "at":
				case "every": return;
				case "daily":
				case "weekly":
				case "cron": return record.timeZone;
			}
		}
		/**
		* Format exact intervals or wall-clock rules without changing their precision or zone.
		*
		* A cron rule reads as the sentence `cronPreview` derives from its expression,
		* for example `Every day at 09:00, 15:00`. An expression this parser cannot
		* read keeps the raw `Cron {expression}` form, so the stored rule stays visible
		* when the Host's dialect and this parser diverge.
		* @param record - reminder whose kind and stored rule determine its frequency.
		* @param t - frequency, weekday, and unit translations, independent of the catalog namespace.
		* @param zone - host-zone context; when present, a stored zone equal to `zone.system` is omitted
		* and another zone is named by `zone.label`. Without it ICU localizes the stored zone.
		* @returns localized one-shot, fixed-interval, daily, weekly, or cron time-and-zone text.
		*/
		function formatScheduleFrequency(record, t, zone) {
			switch (record.kind) {
				case "after":
				case "at": return t("frequency.once");
				case "cron": {
					const parsed = parseCronExpression(record.expression);
					if (parsed !== void 0) {
						const rule = cronPreview(parsed, t, t("time.locale"));
						if (zone === void 0) return t("frequency.cronRule", {
							rule,
							timeZone: zoneLabel(record.timeZone, t)
						});
						return zone.system === record.timeZone ? rule : t("frequency.cronRule", {
							rule,
							timeZone: zone.label(record.timeZone)
						});
					}
					if (zone === void 0) return t("frequency.cron", {
						expression: record.expression,
						timeZone: zoneLabel(record.timeZone, t)
					});
					return zone.system === record.timeZone ? t("frequency.cronLocal", { expression: record.expression }) : t("frequency.cron", {
						expression: record.expression,
						timeZone: zone.label(record.timeZone)
					});
				}
				case "daily": {
					const time = clockLabel(record.time);
					if (zone === void 0) return t("frequency.daily", {
						time,
						timeZone: zoneLabel(record.timeZone, t)
					});
					return zone.system === record.timeZone ? t("frequency.dailyLocal", { time }) : t("frequency.daily", {
						time,
						timeZone: zone.label(record.timeZone)
					});
				}
				case "weekly": {
					const params = {
						weekdays: formatWeekdays(record.weekdays, t),
						time: clockLabel(record.time)
					};
					if (zone === void 0) return t("frequency.weekly", {
						...params,
						timeZone: zoneLabel(record.timeZone, t)
					});
					return zone.system === record.timeZone ? t("frequency.weeklyLocal", params) : t("frequency.weekly", {
						...params,
						timeZone: zone.label(record.timeZone)
					});
				}
				case "every": {
					let selected = SECOND_UNIT;
					for (const candidate of UNIT_SECONDS) {
						if (record.everySeconds % candidate.seconds !== 0) continue;
						selected = candidate;
						break;
					}
					const value = record.everySeconds / selected.seconds;
					return t("frequency.every", {
						value,
						unit: unitLabel(selected.unit, value, t)
					});
				}
			}
			/* v8 ignore next -- The Remote decoder validates this closed union. */
			return assertNever(record);
		}
		/**
		* Format one target instant as a localized month-and-day date with its time, the
		* form the mock's task list shows and the same `Intl` field pair the universal
		* cards use.
		*
		* The month is a locale-owned name, not a zero-padded number: `en` renders
		* `Dec 31, 9:00 AM` and `zh-CN` renders `12月31日 09:00`, so neither locale can
		* produce a `12-31` string. The year appears only when the instant falls outside
		* the current year in the displayed zone, so a same-year target or delivery
		* stays compact while an older record still dates itself.
		*
		* `timeZone` carries the rule's own zone for a daily, weekly, or cron record, so
		* its occurrence reads in the task's zone. A one-shot `at` or `after` record
		* stores only the UTC instant, so callers pass no zone and it formats in the
		* browser zone.
		* @param scheduledAt - durable UTC target.
		* @param locale - BCP-47 locale owning the month name, day order, and clock.
		* @param timeZone - IANA zone of the task's own rule, or undefined for the browser zone.
		* @returns the localized month, day, and time, with the year when it is not the
		* current one, or the raw instant when the value cannot be parsed.
		*/
		function formatScheduleNextRun(scheduledAt, locale, timeZone) {
			const at = Date.parse(scheduledAt);
			if (Number.isNaN(at)) return scheduledAt;
			const zone = timeZone === void 0 ? {} : { timeZone };
			const yearOf = new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				...zone
			});
			return new Intl.DateTimeFormat(locale, {
				...yearOf.format(at) === yearOf.format(Date.now()) ? {} : { year: "numeric" },
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
				...zone
			}).format(at);
		}
		/**
		* Languages whose absolute date reads the year. The design pins English and
		* Chinese (`en` states it, `zh` reads month and day only), and every other
		* language joins English: silently dropping the year would hide the year of a
		* target that can sit months or a year away.
		*/
		const YEAR_LANGUAGES = ["en"];
		const NO_YEAR_LANGUAGES = ["zh"];
		/**
		* Whether one locale's absolute date states the year.
		* @param locale - BCP-47 locale tag.
		* @returns whether the year is stated; an unlisted language states it.
		*/
		function statesYear(locale) {
			const language = locale.toLowerCase().replace(/-.*$/, "");
			if (YEAR_LANGUAGES.includes(language)) return true;
			if (NO_YEAR_LANGUAGES.includes(language)) return false;
			return true;
		}
		/**
		* Format one target as an absolute time in this device's zone.
		*
		* A task whose stored rule names its own zone still shows its next run in the
		* reader's zone: the instant is the same one, and the reader compares it with
		* their own clock. The locale owns the month name, the field order, and the
		* separators, so the stamp reads `Sep 19, 2026, 15:51` in English and
		* `9月19日 15:51` in Chinese.
		*
		* Whether a bare date reads the year is a per-language typographic choice, and
		* the languages the design pins are stated in {@link YEAR_LANGUAGES} and
		* {@link NO_YEAR_LANGUAGES}. Every language not listed there states the year:
		* dropping it silently would hide the year of a target that can sit months or a
		* year away, which is worse than one field more than the reader needs.
		* @param scheduledAt - durable UTC target.
		* @param locale - BCP-47 locale owning the month name, field order, and clock.
		* @returns the localized absolute next run in the device zone, or the raw instant when it cannot be parsed.
		*/
		function formatScheduleAbsolute(scheduledAt, locale) {
			const at = Date.parse(scheduledAt);
			if (Number.isNaN(at)) return scheduledAt;
			return new Intl.DateTimeFormat(locale, {
				...statesYear(locale) ? { year: "numeric" } : {},
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				hourCycle: "h23"
			}).format(at);
		}
		/**
		* One next-run line as its two texts: the device-zone stamp and the distance.
		*
		* The list rows, the detail, the Session-header catalog, and the Sidebar hover
		* card all state this pair, so they take it from here instead of each composing
		* it: the stamp follows the language through `formatScheduleAbsolute`, and the
		* distance stays the reader's countdown.
		* @param scheduledAt - durable UTC target.
		* @param locale - BCP-47 locale owning the month name, field order, and clock.
		* @param now - current epoch milliseconds.
		* @param t - relative-time and unit translations.
		* @returns the absolute stamp, and the same distance wrapped in parentheses.
		*/
		function nextRunParts(scheduledAt, locale, now, t) {
			return {
				absolute: formatScheduleAbsolute(scheduledAt, locale),
				relative: `(${formatScheduleRelative(scheduledAt, now, t)})`
			};
		}
		/**
		* Format a relative target using the largest natural clock unit.
		* @param scheduledAt - durable UTC target.
		* @param now - current epoch milliseconds.
		* @param t - relative-time and unit translations.
		* @returns localized future, overdue, or due-now label.
		*/
		function formatScheduleRelative(scheduledAt, now, t) {
			const difference = Date.parse(scheduledAt) - now;
			if (difference === 0) return t("relative.now");
			const absoluteSeconds = Math.abs(difference) / SECOND_MS;
			const selected = UNIT_SECONDS.find((candidate) => absoluteSeconds >= candidate.seconds) ?? SECOND_UNIT;
			const value = Math.max(1, difference > 0 ? Math.ceil(absoluteSeconds / selected.seconds) : Math.floor(absoluteSeconds / selected.seconds));
			const unit = unitLabel(selected.unit, value, t);
			return t(difference > 0 ? "relative.future" : "relative.overdue", {
				value,
				unit
			});
		}
		//#endregion
		//#region src/client/DeliveryHistory.tsx
		/** Lazy saved delivery pages owned by the selected task's mounted records view. */
		/**
		* Render one saved prompt clamped to two lines; the toggle appears only while the clamp hides text.
		* Width changes re-measure a collapsed prompt; an expanded prompt keeps its toggle until collapsed.
		* @param props - Saved prompt text and locale.
		* @returns The prompt paragraph and, when its text exceeds two lines, the expand or collapse toggle.
		*/
		function SavedPrompt({ prompt, t }) {
			const ref = (0, react.useRef)(null);
			const id = (0, react.useId)();
			const [expanded, setExpanded] = (0, react.useState)(false);
			const [clamped, setClamped] = (0, react.useState)(false);
			(0, react.useLayoutEffect)(() => {
				if (expanded) return;
				const paragraph = ref.current;
				const measure = () => {
					setClamped(paragraph.scrollHeight > paragraph.clientHeight);
				};
				measure();
				const observer = new ResizeObserver(measure);
				observer.observe(paragraph);
				return () => {
					observer.disconnect();
				};
			}, [expanded, prompt]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				ref,
				id,
				className: TaskManagerPage_module_css_default.savedPrompt,
				"data-expanded": expanded || void 0,
				children: prompt
			}), clamped && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: TaskManagerPage_module_css_default.savedPromptToggle,
				"aria-expanded": expanded,
				"aria-controls": id,
				onClick: () => {
					setExpanded((open) => !open);
				},
				children: [t(expanded ? "delivery.collapse" : "delivery.expand"), expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronUpOutlineRegular, { size: 14 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronDownOutlineRegular, { size: 14 })]
			})] });
		}
		/**
		* Render immutable saved deliveries; the parent keys this view by task and Session.
		* Refreshes supersede pending older pages, and unmount ignores both late outcomes.
		* @param props - Exact task binding, latest receipt identity, Remote callback, task zone, and locale.
		* @returns Saved records and explicit loading, failure, and pagination actions.
		*/
		function DeliveryHistory({ id, sessionId, latestMessageId, timeZone, loadHistory, t }) {
			const [page, setPage] = (0, react.useState)();
			const [loading, setLoading] = (0, react.useState)(true);
			const [failure, setFailure] = (0, react.useState)();
			const [retentionOpen, setRetentionOpen] = (0, react.useState)(false);
			const retentionId = (0, react.useId)();
			const request = (0, react.useRef)({
				epoch: 0,
				pending: false
			});
			const load = (0, react.useCallback)(async (before) => {
				if (request.current.pending) return;
				request.current.pending = true;
				const epoch = ++request.current.epoch;
				setLoading(true);
				setFailure(void 0);
				let result;
				try {
					result = await loadHistory({
						id,
						sessionId,
						limit: 20,
						...before === void 0 ? {} : { before }
					});
				} catch (_error) {
					if (epoch !== request.current.epoch) return;
					request.current.pending = false;
					setLoading(false);
					setFailure({
						key: "delivery.error",
						before
					});
					return;
				}
				if (epoch !== request.current.epoch) return;
				request.current.pending = false;
				setLoading(false);
				if (!result.ok) setFailure({
					key: "delivery.error",
					before
				});
				else if ("code" in result.value) setFailure({
					key: result.value.code === "schedule_not_found" ? "delivery.notFound" : "delivery.cursorError",
					before: void 0
				});
				else {
					const next = result.value;
					setPage((previous) => {
						if (before === void 0 || previous === void 0) return next;
						const seen = new Set(previous.records.map((record) => record.messageId));
						const records = [...previous.records];
						for (const record of next.records) if (!seen.has(record.messageId)) {
							seen.add(record.messageId);
							records.push(record);
						}
						return {
							...next,
							records
						};
					});
				}
			}, [
				id,
				sessionId,
				loadHistory
			]);
			(0, react.useEffect)(() => {
				load();
				return () => {
					request.current.epoch++;
					request.current.pending = false;
				};
			}, [load, latestMessageId]);
			const formatOccurrence = (value) => formatScheduleNextRun(value, t("time.locale"), timeZone);
			const hasRecords = page !== void 0 && page.records.length > 0;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: TaskManagerPage_module_css_default.deliveryHistory,
				"aria-busy": loading,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: TaskManagerPage_module_css_default.detailScroll,
					children: [
						loading && !hasRecords && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: TaskManagerPage_module_css_default.empty,
							role: "status",
							"aria-label": t("delivery.loading"),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StateDot, { state: "ongoing" })
						}),
						failure !== void 0 && (hasRecords ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: TaskManagerPage_module_css_default.notice,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								children: t(failure.key)
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									load(failure.before);
								},
								children: t(failure.key === "delivery.cursorError" ? "delivery.refresh" : "delivery.retry")
							})]
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: TaskManagerPage_module_css_default.empty,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWarningOutlineRegular, {
									size: 24,
									className: TaskManagerPage_module_css_default.emptyGlyph
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									role: "alert",
									className: TaskManagerPage_module_css_default.emptyTitle,
									children: t(failure.key)
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: TaskManagerPage_module_css_default.emptyAction,
									onClick: () => {
										load(failure.before);
									},
									children: t(failure.key === "delivery.cursorError" ? "delivery.refresh" : "delivery.retry")
								})
							]
						})),
						!loading && failure === void 0 && page?.records.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: TaskManagerPage_module_css_default.empty,
							role: "status",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClockOutlineRegular, {
								size: 24,
								className: TaskManagerPage_module_css_default.emptyGlyph
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: t("delivery.empty") })]
						}),
						page?.records.map((record) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: TaskManagerPage_module_css_default.delivery,
							"aria-label": t("delivery.label"),
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClockOutlineRegular, { className: TaskManagerPage_module_css_default.deliveryGlyph }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: TaskManagerPage_module_css_default.deliveryBody,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: TaskManagerPage_module_css_default.deliveryHead,
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("time", {
										className: TaskManagerPage_module_css_default.deliveryTime,
										dateTime: record.scheduledAt,
										children: formatOccurrence(record.scheduledAt)
									})
								}), record.prompt !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SavedPrompt, {
									prompt: record.prompt,
									t
								})]
							})]
						}, record.messageId)),
						page?.nextBefore !== void 0 && failure === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: loading,
							onClick: () => {
								load(page.nextBefore);
							},
							children: t("delivery.loadMore")
						})
					]
				}), hasRecords && page.earlierRecordsPruned && page.nextBefore === void 0 && !loading && failure === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("footer", {
					className: TaskManagerPage_module_css_default.retentionEnd,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: TaskManagerPage_module_css_default.retentionLine,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("delivery.pruned") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tooltip, {
							label: t("delivery.retention"),
							side: "top",
							portal: true,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: TaskManagerPage_module_css_default.retentionInfo,
								"aria-label": t("delivery.retention"),
								"aria-expanded": retentionOpen,
								"aria-controls": retentionId,
								onClick: () => {
									setRetentionOpen((open) => !open);
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconInfoOutlineRegular, { size: 14 })
							})
						})]
					}), retentionOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						id: retentionId,
						className: TaskManagerPage_module_css_default.retentionRule,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("delivery.retentionBounds", {
							days: page.retention.days,
							records: page.retention.records
						}) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("delivery.retentionExplanation") })]
					})]
				})]
			});
		}
		//#endregion
		//#region src/client/relative-clock.ts
		/** Reference clock for the relative "time remaining" text. */
		/**
		* Refresh period for relative-time text.
		*
		* The text names whole seconds, minutes, hours, or days, so a half-minute
		* period keeps it correct to its own granularity without re-rendering a mounted
		* page on every frame.
		*/
		const RELATIVE_CLOCK_PERIOD_MS = 3e4;
		/**
		* Current epoch milliseconds, re-sampled on a fixed period.
		*
		* A relative duration is read against the moment it renders, not against the
		* moment its component mounted: a page left open across a delivery would keep
		* showing the time until the previous target.
		*
		* This is the shared clock of the mounted task page and its detail, the two
		* surfaces that sit side by side and must not disagree about how long remains.
		* Two other surfaces keep their own beat: the Session-header catalog reads
		* `Date.now()` and then a one-second interval while its popover is open, and the
		* Sidebar Session-row hover card samples `Date.now()` once per mount, because
		* that preview must not drift while the pointer rests on it.
		* @param periodMs - refresh period; defaults to {@link RELATIVE_CLOCK_PERIOD_MS}.
		* @returns epoch milliseconds, updated once per period.
		*/
		function useRelativeClock(periodMs = RELATIVE_CLOCK_PERIOD_MS) {
			const [now, setNow] = (0, react.useState)(() => Date.now());
			(0, react.useEffect)(() => {
				const timer = setInterval(() => {
					setNow(Date.now());
				}, periodMs);
				return () => {
					clearInterval(timer);
				};
			}, [periodMs]);
			return now;
		}
		//#endregion
		//#region src/client/session-link.ts
		/**
		* Check Host-list membership and archive state without activating or restoring anything.
		*
		* `SessionListState.byId` also carries local fallback rows for live Client
		* generations, so membership comes from `ids`, the Host-list projection: a
		* Session the Host list dropped reports unavailable even while a local row for
		* it survives.
		* @param id - Original Session bound to the task.
		* @param sessions - Current Session list projection.
		* @param workspaces - Current Workspace and archive projection.
		* @returns availability or the reason navigation is disabled.
		*/
		function sessionLinkState(id, sessions, workspaces) {
			if (workspaces.state === "error") return "unavailable";
			if (sessions.phase === "pending" || workspaces.phase === "pending") return "loading";
			if (workspaces.archivedSessionIds.includes(id)) return "archived";
			if (!sessions.ids.includes(id)) return "unavailable";
			return "available";
		}
		/**
		* Resolve the label of one linked Session from the Session catalog the calling
		* component already projects.
		*
		* A catalog title renders as-is; the Session id renders while the catalog holds
		* no row for the Session (missing or not yet loaded) or its row carries a blank
		* title, so the label is never empty. Every surface that names a linked Session
		* resolves the label here, so the Automation tasks rows, the task detail, and the
		* task tab all name the same Session the same way.
		* @param id - Original Session bound to the task.
		* @param sessions - Current Session list projection.
		* @returns the resolved label and whether a catalog title produced it.
		*/
		function sessionLabel(id, sessions) {
			const title = sessions.byId[id]?.title;
			if (title === void 0 || title.trim() === "") return {
				text: id,
				titled: false
			};
			return {
				text: title,
				titled: true
			};
		}
		//#endregion
		//#region src/client/recent-time-zones.ts
		/** Browser-local recently selected IANA time zones. */
		const STORAGE_KEY = "dsh.schedule.recent-time-zones.v1";
		const LIMIT = 5;
		/** First-run choices follow the device rather than guessing location from UI language. */
		function defaults(system) {
			return [...new Set([system, "UTC"])];
		}
		/**
		* Load up to five recent zones, or the system-zone/UTC first-run seed.
		* @param system - the host's current IANA zone.
		* @returns recent IANA zones in most-recent-first order.
		*/
		function loadRecentTimeZones(system) {
			if (typeof localStorage === "undefined") return defaults(system);
			try {
				const raw = localStorage.getItem(STORAGE_KEY);
				if (raw === null) return defaults(system);
				const parsed = JSON.parse(raw);
				if (!Array.isArray(parsed)) return defaults(system);
				const zones = [...new Set(parsed.filter((value) => typeof value === "string" && value !== ""))];
				return zones.length === 0 ? defaults(system) : zones.slice(0, LIMIT);
			} catch {
				return defaults(system);
			}
		}
		/**
		* Promote one exact IANA id and persist the bounded list when storage is available.
		* @param recent - current most-recent-first IANA zones.
		* @param zone - exact IANA zone to promote.
		* @returns the updated bounded most-recent-first list.
		*/
		function rememberTimeZone(recent, zone) {
			const next = [zone, ...recent.filter((value) => value !== zone)].slice(0, LIMIT);
			if (typeof localStorage !== "undefined") try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
			} catch {}
			return next;
		}
		//#endregion
		//#region \0dsh-css:/home/runner/work/dsh-schedule-tab/dsh-schedule-tab/.dsh-src/packages/client/native-schedule-fork/src/client/TaskMenu.module.css.mjs
		const css = ".zhOI2q_root{display:inline-flex;position:relative}.zhOI2q_list{box-sizing:border-box;background:var(--dsw-specific-menu);backdrop-filter:var(--dsw-menu-backdrop-filter);--dsw-elevation-stroke-color:var(--dsw-alias-border-l1);box-shadow:var(--dsw-elevation-prominent);--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);z-index:100;border:0;border-radius:16px;flex-direction:column;gap:0;min-width:144px;max-width:360px;padding:3px;display:flex;position:absolute;top:calc(100% + 4px);left:0}.zhOI2q_portal{z-index:1100;position:fixed;top:auto;left:auto}.zhOI2q_alignEnd{left:auto;right:0}.zhOI2q_scrollable{max-height:calc(100vh - 12px - max(12px, var(--dsh-frame-overlay-top,12px)))}.zhOI2q_viewport{flex-direction:column;min-height:0;display:flex}.zhOI2q_scrollable .zhOI2q_viewport{overflow-y:auto}.zhOI2q_header{border-bottom:.5px solid var(--dsw-alias-border-l2);flex:none;padding:5px}.zhOI2q_itemWrap{position:relative}.zhOI2q_item{cursor:pointer;width:100%;min-height:34px;color:var(--dsw-alias-label-primary);text-align:left;background:0 0;border:none;border-radius:8px;align-items:center;gap:6px;padding:6px 8px;font-size:13px;line-height:20px;display:flex}.zhOI2q_item:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.zhOI2q_item:focus-visible:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);outline:none}.zhOI2q_item:disabled{opacity:.4;cursor:not-allowed}.zhOI2q_itemIcon{width:14px;height:14px;color:var(--dsw-alias-label-tertiary);flex:none;justify-content:center;align-items:center;display:inline-flex}.zhOI2q_itemIcon svg,.zhOI2q_check{width:14px;height:14px}.zhOI2q_itemLabel{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;overflow:hidden}.zhOI2q_check{color:var(--dsw-alias-label-primary);flex:none}.zhOI2q_selected{background:0 0}.zhOI2q_danger,.zhOI2q_danger .zhOI2q_itemIcon{color:var(--dsw-alias-state-error-primary)}.zhOI2q_danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger)}.zhOI2q_danger:focus-visible:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger);outline:none}.zhOI2q_label{color:var(--dsw-alias-label-tertiary);padding:6px 8px;font-size:11px;line-height:15px}.zhOI2q_separator{background:var(--dsw-alias-border-l2);height:.5px;margin:3px 2px}.zhOI2q_separator+.zhOI2q_separator{display:none}";
		const tagId = "@stolyarovmn/dsh-schedule-native-manager/TaskMenu.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stolyarovmn/dsh-schedule-native-manager";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var TaskMenu_module_css_default = {
			"alignEnd": "zhOI2q_alignEnd",
			"check": "zhOI2q_check",
			"danger": "zhOI2q_danger",
			"header": "zhOI2q_header",
			"item": "zhOI2q_item",
			"itemIcon": "zhOI2q_itemIcon",
			"itemLabel": "zhOI2q_itemLabel",
			"itemWrap": "zhOI2q_itemWrap",
			"label": "zhOI2q_label",
			"list": "zhOI2q_list",
			"portal": "zhOI2q_portal",
			"root": "zhOI2q_root",
			"scrollable": "zhOI2q_scrollable",
			"selected": "zhOI2q_selected",
			"separator": "zhOI2q_separator",
			"viewport": "zhOI2q_viewport"
		};
		//#endregion
		//#region src/client/TaskMenu.tsx
		/**
		* Anchored dropdown menu of the task manager's rule rows and task header.
		*
		* This is the schedule-local copy of the shared `Menu` implementation. The
		* pinned `header` slot and the `data-menu-field` keyboard handover exist for
		* the Time zone row's search box, so the four call sites here keep that
		* capability locally instead of extending the shared card.
		*/
		/** Unplaced portal list: hidden but laid out at a fixed origin so its offset size is real. */
		const MEASURE_STYLE = {
			visibility: "hidden",
			left: 0,
			top: 0
		};
		/** Distance the list keeps from the anchor edge. */
		const ANCHOR_GAP = 4;
		/** Distance the list keeps from each viewport edge. */
		const VIEWPORT_MARGIN = 12;
		/**
		* Whether an entry is a group hairline.
		* @param entry - one menu entry.
		* @returns true for a separator entry.
		*/
		function isSeparator(entry) {
			return "type" in entry && entry.type === "separator";
		}
		/**
		* Whether an entry is a non-interactive heading.
		* @param entry - one menu entry.
		* @returns true for a heading entry.
		*/
		function isLabel(entry) {
			return "type" in entry && entry.type === "label";
		}
		/**
		* Render an anchored dropdown menu. While the list is open, Tab settles the
		* focused row — from the trigger, Tab enters the list instead — Escape and
		* Shift+Tab close it and return focus to the anchor's first enabled button, and
		* selecting a row does the same.
		* @param props.open - whether the list is showing (owner-controlled).
		* @param props.anchor - the trigger element, rendered in place.
		* @param props.items - selectable rows and optional separators or heading labels.
		* @param props.selectedId - row shown as selected.
		* @param props.onSelect - row activation callback, not called for disabled rows.
		* @param props.onClose - invoked on an outside pointer press, Escape, or a
		* window blur that moved focus into a cross-origin iframe.
		* @param props.align - list alignment against the anchor (default 'start').
		* @param props.portal - render the list into document.body, fixed-positioned
		* from the anchor rect (follows scroll and resize while open).
		* @param props.header - owner content pinned above the scrolling rows; a control
		* it marks `data-menu-field` takes the keyboard once the list is placed, which
		* is the frame a portaled list becomes focusable in.
		* @param props.className - extra class on the anchor wrapper span.
		* @param props.listClassName - extra class on the dropdown card itself.
		* @returns the anchor wrapper with the conditional list.
		*/
		function TaskMenu({ open, anchor, items = [], selectedId, onSelect, onClose, align = "start", portal = false, header, className, listClassName }) {
			const rootRef = (0, react.useRef)(null);
			const listRef = (0, react.useRef)(null);
			/** Index the arrow walk last focused, the resume point when focus left the rows. */
			const walkIndex = (0, react.useRef)(null);
			/** Whether this open already moved the keyboard into the list. */
			const handedOver = (0, react.useRef)(false);
			const openRef = (0, react.useRef)(open);
			openRef.current = open;
			/** Latest close callback, so the document listeners bind once per open. */
			const closeRef = (0, react.useRef)(onClose);
			closeRef.current = onClose;
			const dismiss = (0, react.useCallback)(() => {
				closeRef.current();
			}, []);
			const position = useAnchoredPosition({
				open: open && portal,
				anchorRef: rootRef,
				panelRef: listRef,
				align,
				gap: ANCHOR_GAP,
				margin: VIEWPORT_MARGIN
			});
			useDismissOnOutsidePointer(rootRef, open, dismiss, listRef);
			/**
			* Hand the keyboard back to the anchor's first enabled button. Focus left on
			* a removed row otherwise falls to the page body, where the next Tab restarts
			* from the top of the page.
			*/
			const refocusAnchor = () => {
				rootRef.current?.querySelector("button:not(:disabled)")?.focus();
			};
			/**
			* Post-selection focus, for the paths where the rows unmount with the list.
			* A selection whose owner keeps the menu open is left alone, and so is an
			* owner that moved focus itself: only a keyboard left on the closing list
			* (or on the body its removal produced) comes back to the anchor.
			*/
			const refocusAfterSelection = () => {
				queueMicrotask(() => {
					if (openRef.current) return;
					const active = document.activeElement;
					if (active === null || active === document.body || listRef.current?.contains(active) === true) refocusAnchor();
				});
			};
			(0, react.useEffect)(() => {
				if (!open) {
					handedOver.current = false;
					return;
				}
				if (handedOver.current) return;
				const list = listRef.current;
				/* v8 ignore next -- the list is rendered in the same commit that sets `open`, before this effect runs. */
				if (list === null) return;
				if (portal && position === null) return;
				const field = list.querySelector("[data-menu-field]");
				if (field === null) return;
				handedOver.current = true;
				field.focus();
			}, [
				open,
				portal,
				position
			]);
			(0, react.useEffect)(() => {
				if (!open) {
					walkIndex.current = null;
					return;
				}
				const onKeyDown = (e) => {
					const focused = document.activeElement;
					const insideList = listRef.current?.contains(focused) === true;
					const anchored = rootRef.current?.contains(focused) === true || insideList;
					if (e.key === "Escape") {
						dismiss();
						if (anchored) refocusAnchor();
					}
					if (e.key === "Tab") {
						const list = listRef.current;
						/* v8 ignore next -- the list is mounted whenever this effect's `open` is true. */
						if (list === null) return;
						if (!anchored) return;
						if (e.shiftKey) {
							e.preventDefault();
							dismiss();
							refocusAnchor();
							return;
						}
						if (insideList) {
							if (focused instanceof Element && focused.getAttribute("role") === "menuitem") {
								e.preventDefault();
								focused.click();
							}
							return;
						}
						const row = list.querySelector("button:not(:disabled)");
						if (row === null) return;
						e.preventDefault();
						row.focus();
						walkIndex.current = 0;
						return;
					}
					if (![
						"ArrowDown",
						"ArrowUp",
						"Home",
						"End"
					].includes(e.key)) return;
					if (e.target instanceof HTMLInputElement && (e.key === "Home" || e.key === "End")) return;
					const list = listRef.current;
					/* v8 ignore next -- the list is mounted whenever this effect's `open` is true. */
					if (list === null) return;
					if (!anchored) return;
					const buttons = Array.from(list.querySelectorAll("button:not(:disabled)"));
					if (buttons.length === 0) return;
					const index = buttons.indexOf(focused);
					const from = index >= 0 ? index : walkIndex.current;
					const next = e.key === "Home" ? 0 : e.key === "End" ? buttons.length - 1 : from === null ? e.key === "ArrowDown" ? 0 : buttons.length - 1 : (from + (e.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
					e.preventDefault();
					walkIndex.current = next;
					buttons[next]?.focus();
				};
				const onWindowBlur = () => {
					if (document.activeElement instanceof HTMLIFrameElement) dismiss();
				};
				document.addEventListener("keydown", onKeyDown);
				window.addEventListener("blur", onWindowBlur);
				return () => {
					document.removeEventListener("keydown", onKeyDown);
					window.removeEventListener("blur", onWindowBlur);
				};
			}, [open, dismiss]);
			const renderEntry = (entry) => {
				if (isSeparator(entry)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: TaskMenu_module_css_default.separator,
					role: "separator"
				}, entry.id);
				if (isLabel(entry)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: TaskMenu_module_css_default.label,
					role: "presentation",
					children: entry.text
				}, entry.id);
				const selected = entry.id === selectedId;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: TaskMenu_module_css_default.itemWrap,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "menuitem",
						className: (0, import_vendor_clsx.default)(TaskMenu_module_css_default.item, selected && TaskMenu_module_css_default.selected, entry.danger === true && TaskMenu_module_css_default.danger),
						disabled: entry.disabled,
						onClick: () => {
							onSelect(entry.id);
						},
						children: [
							entry.icon !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TaskMenu_module_css_default.itemIcon,
								children: entry.icon
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TaskMenu_module_css_default.itemLabel,
								children: entry.label
							}),
							selected && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCheckOutlineRegular, { className: TaskMenu_module_css_default.check })
						]
					})
				}, entry.id);
			};
			const list = open && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				ref: listRef,
				className: (0, import_vendor_clsx.default)(TaskMenu_module_css_default.list, listClassName, TaskMenu_module_css_default.scrollable, portal && TaskMenu_module_css_default.portal, align === "end" && !portal && TaskMenu_module_css_default.alignEnd),
				style: portal ? position ?? MEASURE_STYLE : void 0,
				role: "menu",
				onClick: (e) => {
					e.stopPropagation();
					if ((e.target instanceof Element ? e.target.closest("button[role=\"menuitem\"]") : null) !== null) refocusAfterSelection();
				},
				children: [header !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: TaskMenu_module_css_default.header,
					role: "presentation",
					children: header
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: TaskMenu_module_css_default.viewport,
					role: "presentation",
					children: items.map(renderEntry)
				})]
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				ref: rootRef,
				className: (0, import_vendor_clsx.default)(TaskMenu_module_css_default.root, className),
				children: [anchor, portal ? list !== false && (0, react_dom.createPortal)(list, document.body) : list]
			});
		}
		//#endregion
		//#region src/client/TaskDetail.tsx
		/** One retained task's rule, saved deliveries, run-time edits, deletion, and original-Session link. */
		/** Recurrence choices the Run time card's Repeat row offers, in mock menu order. */
		const RULE_CHOICES = [
			"weekly",
			"weekdays",
			"daily",
			"every-hour",
			"every-minute",
			"every-second",
			"once",
			"cron"
		];
		/** Repeat menu label of each recurrence choice. */
		const RULE_KIND_LABELS = {
			daily: "rule.daily",
			weekdays: "rule.weekdays",
			weekly: "rule.weekly",
			every: "rule.everyMinutes",
			once: "rule.once",
			cron: "rule.cron"
		};
		/** Repeat-menu label of each visible choice. */
		const RULE_CHOICE_LABELS = {
			daily: "rule.daily",
			weekdays: "rule.weekdays",
			weekly: "rule.weekly",
			"every-minute": "rule.everyMinutes",
			"every-hour": "rule.everyHours",
			"every-second": "rule.everySeconds",
			once: "rule.once",
			cron: "rule.cron"
		};
		/** Unit word the elapsed-interval row shows beside its quantity input. */
		const INTERVAL_UNIT_LABELS = {
			hour: "timing.unit.hour",
			minute: "timing.unit.minute",
			second: "timing.unit.second"
		};
		/** Lower-bound hint of the elapsed-interval row, stated in the row's own unit. */
		const INTERVAL_HINT_KEYS = {
			hour: "timing.intervalHint.hour",
			minute: "timing.intervalHint.minute",
			second: "timing.intervalHint.second"
		};
		/** Below-floor save message, stated in the same unit as the row and its hint. */
		const INTERVAL_ERROR_KEYS = {
			hour: "timing.invalidInterval.hour",
			minute: "timing.invalidInterval.minute",
			second: "timing.invalidInterval.second"
		};
		/** Messages `draftError` can return; each clears as soon as edits fix the draft. */
		const LOCAL_FAILURES = new Set([
			"rule.invalidTitle",
			"rule.invalidPrompt",
			"timing.invalidInterval",
			"rule.cronInvalid",
			"timing.invalid"
		]);
		/** Elapsed interval a rule receives when it starts repeating without a stored interval. */
		const RULE_DEFAULT_EVERY_SECONDS = 3600;
		/** Seconds represented by each friendly interval unit. */
		const INTERVAL_UNIT_SECONDS = {
			second: 1,
			minute: 60,
			hour: 3600
		};
		/** Shortest elapsed interval the Host accepts, stated in seconds. */
		const MIN_INTERVAL_SECONDS = 60;
		/** Exhaustive recurrence-choice labels of the stored rule records. */
		const RULE_KIND_BY_RECORD = {
			at: "once",
			after: "once",
			every: "every",
			daily: "daily",
			weekly: "weekly",
			cron: "cron"
		};
		/** ISO weekdays of the weekly choice in display order, Monday through Sunday. */
		const WEEKDAYS = [
			1,
			2,
			3,
			4,
			5,
			6,
			7
		];
		/** ISO weekday set the `weekdays` choice stores: Monday through Friday. */
		const WEEKDAY_RULE = [
			1,
			2,
			3,
			4,
			5
		];
		/**
		* Recurrence choices that state their rule with the clock and zone rows.
		*
		* The cron choice carries its clock inside its expression and its timing draft
		* has no time row, so it neither carries nor receives that pair: an expression
		* seeded from the occurrence's UTC clock with another zone would name a
		* different instant, and carrying an expression's empty time would empty the
		* clock row a switch to another choice shows.
		*/
		const CLOCK_KINDS = [
			"daily",
			"weekdays",
			"weekly"
		];
		/** Localized name of each ISO weekday. */
		const WEEKDAY_LABELS = {
			1: "frequency.weekday.1",
			2: "frequency.weekday.2",
			3: "frequency.weekday.3",
			4: "frequency.weekday.4",
			5: "frequency.weekday.5",
			6: "frequency.weekday.6",
			7: "frequency.weekday.7"
		};
		/**
		* Whether a stored weekly record carries exactly the Monday-to-Friday set the
		* `weekdays` choice stores, so the Repeat row shows that choice for it.
		* @param weekdays - stored ISO weekday set.
		* @returns whether the set is Monday through Friday.
		*/
		function isWeekdayRule(weekdays) {
			return weekdays.length === WEEKDAY_RULE.length && WEEKDAY_RULE.every((day) => weekdays.includes(day));
		}
		const sessionLinkMessages = {
			loading: "detail.sessionLoading",
			archived: "detail.sessionArchived",
			unavailable: "detail.sessionUnavailable"
		};
		/**
		* Own the editing state one task detail shares across both of its owners.
		*
		* The shown task is the catalog row for `taskId`, or the draft a mutation
		* pending against that row retained after the row left the catalog. The view,
		* the confirmation, and the draft all reset when `taskId` changes, so one
		* task's draft never carries into another.
		* @param injected - detail actions, localized copy, and framework readers.
		* @param catalog - the owner's authoritative task catalog snapshot.
		* @param taskId - task the owner selected, or undefined when it selected none.
		* @returns the shown task and catalog row, its element id, its confirmation, and the detail props.
		*/
		function useTaskDetail(injected, catalog, taskId) {
			const [draft, setDraft] = (0, react.useState)(null);
			const [tab, setTab] = (0, react.useState)("rule");
			const [confirmId, setConfirmId] = (0, react.useState)(null);
			const id = (0, react.useId)();
			(0, react.useEffect)(() => {
				setDraft(null);
				setTab("rule");
				setConfirmId(null);
			}, [taskId]);
			const record = taskId === void 0 ? void 0 : catalog.records.find((item) => item.id === taskId);
			return {
				record,
				task: record ?? (draft !== null && draft.id === taskId ? draft : void 0),
				id,
				confirmId,
				setConfirmId,
				setTab,
				props: {
					...injected,
					status: catalog.status,
					deleting: catalog.deleting,
					id,
					onEditState: setDraft,
					tab,
					onTabChange: setTab,
					confirmId,
					onConfirm: setConfirmId
				}
			};
		}
		/**
		* Render one task's rule or saved deliveries with confirm-first deletion and its original Session.
		*
		* A deletion this detail confirmed settles with the refreshed catalog: once
		* that refresh reports the row gone, the detail calls `onDeleted` and its owner
		* leaves the task. The app-wide toast, not this detail, announces the outcome.
		* @param props - task, catalog state, detail view, confirmation, localized copy, and action callbacks.
		* @returns the detail region, its deletion confirmation dialog, and the linked Session entry.
		*/
		function TaskDetail({ task, authoritative, id, status, deleting, onDelete, onRetry, onUpdateTiming, loadHistory, onOpenSession, onEditState, tab, onTabChange, confirmId, onConfirm, onDeleted, onClose, withinSession, useSessions, useWorkspaces, t }) {
			const sessions = useSessions((snapshot) => snapshot);
			const workspaces = useWorkspaces((snapshot) => snapshot);
			const detailTabsRef = (0, react.useRef)(null);
			const moreRef = (0, react.useRef)(null);
			const nameRef = (0, react.useRef)(null);
			const panelRef = (0, react.useRef)(null);
			const footerRef = (0, react.useRef)(null);
			const [menuOpen, setMenuOpen] = (0, react.useState)(false);
			const now = useRelativeClock();
			const busy = deleting.includes(task.id) || status === "loading";
			const confirming = authoritative && confirmId === task.id;
			const sessionLink = sessionLinkState(task.sessionId, sessions, workspaces);
			const linkedSession = sessionLabel(task.sessionId, sessions);
			const sessionNotice = sessionLink === "available" ? void 0 : t(sessionLinkMessages[sessionLink]);
			const taskIdentity = `${task.sessionId}\u0000${task.id}`;
			const [edit, setEdit] = (0, react.useState)(() => initialRuleEdit(task));
			const [intervalUnit, setIntervalUnit] = (0, react.useState)(() => preferredIntervalUnit(edit.shown.draft.seconds));
			const explicitUnit = (0, react.useRef)(false);
			const previousKind = (0, react.useRef)(edit.shown.kind);
			(0, react.useEffect)(() => {
				if (previousKind.current === edit.shown.kind) return;
				previousKind.current = edit.shown.kind;
				if (edit.shown.kind !== "every") {
					explicitUnit.current = false;
					return;
				}
				if (explicitUnit.current) return;
				setIntervalUnit(preferredIntervalUnit(edit.shown.draft.seconds));
			}, [edit.shown.kind, edit.shown.draft.seconds]);
			const [pending, setPending] = (0, react.useState)(false);
			const [failure, setFailure] = (0, react.useState)();
			const shownFailure = failure !== void 0 && LOCAL_FAILURES.has(failure) ? draftError(edit.shown) : failure;
			const [deletionConfirmed, setDeletionConfirmed] = (0, react.useState)(false);
			const deletionInFlight = (0, react.useRef)(null);
			const [trackedIdentity, setTrackedIdentity] = (0, react.useState)(taskIdentity);
			const identityRef = (0, react.useRef)(taskIdentity);
			identityRef.current = taskIdentity;
			const submissions = (0, react.useRef)(0);
			const chosenWeekdays = (0, react.useRef)(void 0);
			/** The day set this task's card remembers, or undefined when it has none. */
			const taskMemory = () => chosenWeekdays.current?.identity === taskIdentity ? chosenWeekdays.current.weekdays : void 0;
			const mounted = (0, react.useRef)(true);
			(0, react.useEffect)(() => {
				mounted.current = true;
				return () => {
					mounted.current = false;
				};
			}, []);
			(0, react.useEffect)(() => {
				panelRef.current?.focus({ preventScroll: true });
			}, [task.sessionId, task.id]);
			(0, react.useEffect)(() => {
				onEditState(pending || shownFailure !== void 0 || deletionConfirmed ? task : null);
			}, [
				pending,
				shownFailure,
				deletionConfirmed,
				task,
				onEditState
			]);
			(0, react.useEffect)(() => {
				if (deleting.includes(task.id)) {
					deletionInFlight.current = task.id;
					return;
				}
				if (!deletionConfirmed || deletionInFlight.current !== task.id) return;
				deletionInFlight.current = null;
				if (status === "ready" && authoritative) setDeletionConfirmed(false);
			}, [
				deletionConfirmed,
				deleting,
				task.id,
				status,
				authoritative
			]);
			(0, react.useEffect)(() => {
				if (confirming) footerRef.current?.querySelector("button")?.focus();
			}, [confirming]);
			const closeConfirmation = () => {
				onConfirm(null);
				moreRef.current?.focus();
			};
			const menuItems = [{
				id: "delete",
				label: t(deleting.includes(task.id) ? "delete.pending" : "delete.action"),
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconTrashOutlineRegular, {}),
				danger: true,
				disabled: busy || !authoritative
			}];
			const storedValues = ruleValues(task);
			const propKey = shownValues(storedValues);
			if (trackedIdentity !== taskIdentity) {
				submissions.current += 1;
				chosenWeekdays.current = void 0;
				explicitUnit.current = false;
				previousKind.current = storedValues.kind;
				setTrackedIdentity(taskIdentity);
				setEdit(initialRuleEdit(task));
				setIntervalUnit(preferredIntervalUnit(storedValues.draft.seconds));
				setPending(false);
				setFailure(void 0);
				setDeletionConfirmed(false);
			} else if (edit.propKey !== propKey) {
				const memory = taskMemory();
				if (memory !== void 0 && sameWeekdays(memory, edit.stored.weekdays)) chosenWeekdays.current = void 0;
				setEdit(task.status === "inactive" ? {
					propKey,
					stored: storedValues,
					shown: storedValues
				} : {
					propKey,
					stored: storedValues,
					shown: mergeRuleDraft(storedValues, edit.shown, edit.stored)
				});
			}
			(0, react.useEffect)(() => {
				if (task.status !== "inactive") return;
				setEdit((current) => shownValues(current.shown) === shownValues(current.stored) ? current : {
					...current,
					shown: current.stored
				});
			}, [task.status]);
			const shown = edit.shown;
			const dirty = shownValues(shown) !== shownValues(edit.stored);
			const deleted = deletionConfirmed && !authoritative;
			(0, react.useEffect)(() => {
				if (deleted) onDeleted();
			}, [deleted, onDeleted]);
			const nextRun = nextRunParts(task.scheduledAt, t("time.locale"), now, t);
			const rememberWeekdays = (weekdays) => {
				chosenWeekdays.current = {
					identity: taskIdentity,
					weekdays
				};
			};
			/**
			* Day set one rule states, when its kind carries one.
			* @param kind - choice the rule is stated as.
			* @param weekdays - that rule's day set.
			* @returns the set for the kinds that carry one, otherwise undefined.
			*/
			const setOf = (kind, weekdays) => kind === "weekdays" || kind === "weekly" ? weekdays : void 0;
			const chooseKind = (kind, unit) => {
				if (unit !== void 0) {
					explicitUnit.current = true;
					setIntervalUnit(unit);
				}
				if (kind === shown.kind) return;
				const leavingSet = setOf(shown.kind, shown.weekdays) ?? (taskMemory() === void 0 ? setOf(storedValues.kind, storedValues.weekdays) : void 0);
				if (leavingSet !== void 0) rememberWeekdays(leavingSet);
				setEdit((current) => {
					const restore = kind === current.stored.kind;
					const carriesClock = !restore && CLOCK_KINDS.includes(kind) && CLOCK_KINDS.includes(current.shown.kind);
					const storedSet = setOf(current.stored.kind, current.stored.weekdays);
					const carried = kind === "weekly" ? setOf(current.shown.kind, current.shown.weekdays) ?? taskMemory() ?? storedSet : void 0;
					return {
						...current,
						shown: {
							...current.shown,
							kind,
							draft: restore ? current.stored.draft : carriesClock ? {
								...seedDraft(task, kind),
								time: current.shown.draft.time,
								timeZone: current.shown.draft.timeZone
							} : unit === void 0 ? seedDraft(task, kind) : {
								...seedDraft(task, kind),
								seconds: String(seedIntervalSeconds())
							},
							weekdays: kind === "weekdays" ? [...WEEKDAY_RULE] : kind === "weekly" && carried !== void 0 ? [...carried] : restore ? current.stored.weekdays : kind === "weekly" && carriesClock ? [zonedWeekday(task.scheduledAt, current.shown.draft.timeZone)] : seedWeekdays(task)
						}
					};
				});
			};
			const chooseZone = (zone) => {
				if (zone === shown.draft.timeZone) return;
				setEdit((current) => ({
					...current,
					shown: {
						...current.shown,
						draft: {
							...current.shown.draft,
							timeZone: zone
						}
					}
				}));
			};
			const toggleWeekday = (weekday) => {
				if (shown.weekdays.length === 1 && shown.weekdays.includes(weekday)) return;
				const weekdays = shown.weekdays.includes(weekday) ? shown.weekdays.filter((day) => day !== weekday) : WEEKDAYS.filter((day) => day === weekday || shown.weekdays.includes(day));
				rememberWeekdays(weekdays);
				setEdit((current) => ({
					...current,
					shown: {
						...current.shown,
						weekdays
					}
				}));
			};
			const editDraft = (patch) => {
				setEdit((current) => ({
					...current,
					shown: {
						...current.shown,
						draft: {
							...current.shown.draft,
							...patch
						}
					}
				}));
			};
			const editContent = (patch) => {
				setEdit((current) => ({
					...current,
					shown: {
						...current.shown,
						...patch
					}
				}));
			};
			const cancelDraft = () => {
				chosenWeekdays.current = void 0;
				setEdit((current) => ({
					...current,
					shown: current.stored
				}));
				setFailure(void 0);
			};
			const saveDraft = async () => {
				const invalid = draftError(shown);
				if (invalid !== void 0) {
					setFailure(invalid);
					return;
				}
				const submitted = taskIdentity;
				const generation = ++submissions.current;
				setPending(true);
				setFailure(void 0);
				const request = {
					sessionId: task.sessionId,
					id: task.id,
					expected: timingSnapshot(task),
					...contentChange(shown, storedValues)
				};
				let result;
				try {
					result = await onUpdateTiming(timingValues(shown) === timingValues(storedValues) ? request : {
						...request,
						change: ruleChange(shown.draft, shown.kind, shown.weekdays)
					});
				} catch (_error) {
					if (!mounted.current || identityRef.current !== submitted || generation !== submissions.current) return;
					setPending(false);
					setFailure("rule.error.unknown");
					return;
				}
				if (!mounted.current || identityRef.current !== submitted || generation !== submissions.current) return;
				setPending(false);
				if (!result.ok) {
					setFailure("rule.error.unknown");
					return;
				}
				if ("code" in result.value) {
					setFailure(ruleError(result.value.code));
					return;
				}
				const saved = ruleValues(result.value.record);
				setEdit((current) => current.propKey === propKey ? {
					...current,
					stored: saved,
					shown: saved
				} : {
					...current,
					shown: current.stored
				});
			};
			const confirmDelete = () => {
				setDeletionConfirmed(true);
				closeConfirmation();
				onDelete(task.id);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("aside", {
				ref: panelRef,
				className: TaskManagerPage_module_css_default.detail,
				id,
				tabIndex: -1,
				"aria-label": t("detail.label"),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: TaskManagerPage_module_css_default.detailTabsBar,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							ref: detailTabsRef,
							className: TaskManagerPage_module_css_default.detailTabs,
							role: "tablist",
							"aria-label": t("detail.tabs"),
							children: ["rule", "records"].map((value) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"data-detail-tab": value,
								role: "tab",
								id: `${id}-${value}-tab`,
								"aria-controls": `${id}-${value}-panel`,
								"aria-selected": tab === value,
								tabIndex: tab === value ? 0 : -1,
								className: TaskManagerPage_module_css_default.detailTab,
								onClick: () => {
									onTabChange(value);
								},
								onKeyDown: (event) => {
									if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
									let next;
									switch (event.key) {
										case "ArrowLeft":
										case "ArrowRight":
											next = value === "rule" ? "records" : "rule";
											break;
										case "Home":
											next = "rule";
											break;
										case "End":
											next = "records";
											break;
										default: return;
									}
									event.preventDefault();
									onTabChange(next);
									detailTabsRef.current?.querySelector(`[data-detail-tab="${next}"]`)?.focus();
								},
								children: t(`detail.${value}`)
							}, value))
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: TaskManagerPage_module_css_default.detailActions,
							children: [
								tab === "rule" && withinSession !== task.sessionId && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: TaskManagerPage_module_css_default.detailContext,
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Button, {
										className: TaskManagerPage_module_css_default.linkedSession,
										title: linkedSession.titled ? linkedSession.text : task.sessionId,
										"aria-label": linkedSession.titled ? t("detail.openSessionTitle", { title: linkedSession.text }) : t("detail.openSession"),
										"aria-describedby": `${id}-session${sessionNotice === void 0 ? "" : ` ${id}-session-state`}`,
										disabled: sessionLink !== "available",
										onClick: () => {
											onOpenSession(task.sessionId);
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: TaskManagerPage_module_css_default.linkedSessionLabel,
											children: t("detail.session")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: TaskManagerPage_module_css_default.linkedSessionTarget,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												id: `${id}-session`,
												className: TaskManagerPage_module_css_default.linkedSessionName,
												children: linkedSession.text
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronRightOutlineRegular, {})]
										})]
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: TaskManagerPage_module_css_default.menuGuard,
									onKeyDown: (event) => {
										guardMenuEscape(event, menuOpen, () => {
											setMenuOpen(false);
											moreRef.current?.focus();
										});
									},
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TaskMenu, {
										open: menuOpen,
										onClose: () => {
											setMenuOpen(false);
										},
										items: menuItems,
										onSelect: () => {
											setMenuOpen(false);
											onConfirm(task.id);
										},
										align: "end",
										portal: true,
										anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
											size: "sm",
											className: TaskManagerPage_module_css_default.detailIconButton,
											"aria-label": t("detail.more"),
											title: t("detail.more"),
											"aria-haspopup": "menu",
											"aria-expanded": menuOpen,
											onClick: (event) => {
												moreRef.current = event.currentTarget;
												setMenuOpen((open) => !open);
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconEllipsisOutlineRegular, {})
										})
									})
								}),
								onClose !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: TaskManagerPage_module_css_default.detailIconButton,
									"aria-label": t("detail.close"),
									onClick: onClose,
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCloseOutlineRegular, {})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.detailScroll, tab === "records" && TaskManagerPage_module_css_default.detailRecords),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CatalogFeedback, {
								status,
								populated: true,
								onRetry,
								t
							}),
							tab === "rule" && !deleted && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("header", {
								className: TaskManagerPage_module_css_default.detailHeader,
								children: task.status === "inactive" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
									className: TaskManagerPage_module_css_default.readonlyName,
									children: shown.title
								}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									ref: nameRef,
									className: TaskManagerPage_module_css_default.editName,
									"aria-label": t("detail.name"),
									disabled: busy || pending,
									value: shown.title,
									onChange: (event) => {
										editContent({ title: event.target.value });
									}
								})
							}),
							tab === "rule" && !deleted && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: TaskManagerPage_module_css_default.nextRun,
								children: task.status === "active" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
									t("detail.nextRun"),
									" ",
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("time", {
										dateTime: task.scheduledAt,
										children: nextRun.absolute
									}),
									" ",
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: TaskManagerPage_module_css_default.nextRunRelative,
										children: nextRun.relative
									})
								] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("status.inactive") })
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								role: "tabpanel",
								id: `${id}-rule-panel`,
								"aria-labelledby": `${id}-rule-tab`,
								hidden: tab !== "rule" || deleted,
								tabIndex: 0,
								children: !deleted && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [task.status === "inactive" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: TaskManagerPage_module_css_default.readonlyPrompt,
									children: shown.prompt
								}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
									className: TaskManagerPage_module_css_default.instruction,
									"aria-label": t("detail.instruction"),
									disabled: busy || pending,
									value: shown.prompt,
									onChange: (event) => {
										editContent({ prompt: event.target.value });
									}
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RuleCard, {
									task,
									disabled: busy || pending || task.status === "inactive",
									values: shown,
									intervalUnit,
									failure: shownFailure === "timing.invalidInterval" ? INTERVAL_ERROR_KEYS[intervalUnit] : shownFailure,
									onChooseKind: chooseKind,
									onChooseZone: chooseZone,
									onToggleWeekday: toggleWeekday,
									onEditDraft: editDraft,
									t
								}, JSON.stringify([task.sessionId, task.id]))] })
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								role: "tabpanel",
								id: `${id}-records-panel`,
								"aria-labelledby": `${id}-records-tab`,
								className: TaskManagerPage_module_css_default.recordsPanel,
								hidden: tab !== "records",
								tabIndex: 0,
								children: tab === "records" && !deleted && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DeliveryHistory, {
									id: task.id,
									sessionId: task.sessionId,
									latestMessageId: task.lastDelivery?.messageId,
									timeZone: recordTimeZone(task),
									loadHistory,
									t
								}, JSON.stringify([task.sessionId, task.id]))
							})
						]
					}),
					tab === "rule" && sessionNotice !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						id: `${id}-session-state`,
						className: TaskManagerPage_module_css_default.detailNotice,
						role: "status",
						children: sessionNotice
					}),
					tab === "records" && shownFailure !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: TaskManagerPage_module_css_default.saveFailure,
						role: "alert",
						children: t(shownFailure === "timing.invalidInterval" ? INTERVAL_ERROR_KEYS[intervalUnit] : shownFailure)
					}),
					dirty && !deleted && task.status !== "inactive" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("footer", {
						className: TaskManagerPage_module_css_default.saveFooter,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TaskManagerPage_module_css_default.saveNotice,
								children: t("rule.unsaved")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
								disabled: pending,
								onClick: cancelDraft,
								children: t("rule.cancel")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
								variant: "primary",
								disabled: pending || !dirty,
								onClick: () => {
									saveDraft();
								},
								children: t(pending ? "rule.saving" : "rule.save")
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Modal, {
				className: TaskManagerPage_module_css_default.confirmDialog,
				contentClassName: TaskManagerPage_module_css_default.confirmContent,
				open: confirming,
				title: t("delete.title"),
				description: t("delete.description"),
				closeLabel: t("delete.close"),
				onClose: closeConfirmation,
				footer: confirming && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					ref: footerRef,
					className: TaskManagerPage_module_css_default.confirmActions,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: closeConfirmation,
						children: t("delete.cancel")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
						className: TaskManagerPage_module_css_default.deleteButton,
						disabled: busy,
						onClick: confirmDelete,
						children: t("delete.confirm")
					})]
				}),
				children: confirming && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: TaskManagerPage_module_css_default.confirmTitle,
					children: task.title
				})
			})] });
		}
		/**
		* Identify the Repeat row choice that represents a stored rule. A weekly rule
		* whose stored set is exactly Monday through Friday maps to the `weekdays`
		* choice, which is the same rule the menu's Monday-to-Friday option submits.
		* @param record - shown rule.
		* @returns the choice matching its stored recurrence kind.
		*/
		function ruleKind(record) {
			if (record.kind === "weekly" && isWeekdayRule(record.weekdays)) return "weekdays";
			return RULE_KIND_BY_RECORD[record.kind];
		}
		/**
		* Choice that states the same stored rule as another.
		*
		* The Monday-to-Friday choice and the weekly choice both submit one Host
		* `weekly` rule, so a comparison of choices must fold them together; the three
		* elapsed-interval choices already share the one `every` choice, and every other
		* choice names its own Host rule.
		* @param kind - Repeat row choice.
		* @returns the choice that states the same stored rule.
		*/
		function storedRuleChoice(kind) {
			return kind === "weekdays" ? "weekly" : kind;
		}
		/**
		* Preserve a native time's declared precision when only minutes were entered.
		* @param time - native time value.
		* @returns the same time with whole seconds.
		*/
		function withSeconds(time) {
			return time.length === 5 ? `${time}:00` : time;
		}
		/**
		* Native input values a rule gets when it is on, or switches to, one choice.
		*
		* A one-shot target, a daily clock time, a Monday-to-Friday clock time, and a
		* weekly clock time all start from the zone the stored rule states, or from
		* this device's zone when the rule stores none; the one-shot rows show the
		* committed occurrence in that zone, so the pair still names the same instant.
		* The weekly choice seeds its weekday set separately, and the cron choice seeds
		* a daily expression from that occurrence. A switch between two clock-time
		* choices replaces the seeded time and zone with the pair the card shows,
		* wherever `chooseKind` carries it, and a switch into the elapsed interval
		* replaces its seeded seconds with `seedIntervalSeconds` for the chosen unit.
		* @param record - shown rule.
		* @param kind - choice to seed.
		* @returns complete native input values for that choice.
		*/
		function seedDraft(record, kind) {
			const zone = draftZone(record).zone;
			switch (kind) {
				case "once": {
					const wallClock = zonedWallClock(record.scheduledAt, zone);
					return {
						date: wallClock.slice(0, 10),
						time: wallClock.slice(11, 23),
						timeZone: zone,
						seconds: "",
						expression: ""
					};
				}
				case "every": return {
					date: "",
					time: "",
					timeZone: "",
					seconds: String(RULE_DEFAULT_EVERY_SECONDS),
					expression: ""
				};
				case "daily":
				case "weekdays":
				case "weekly": return {
					date: "",
					time: zonedWallClock(record.scheduledAt, zone).slice(11, 23),
					timeZone: zone,
					seconds: "",
					expression: ""
				};
				case "cron": return {
					date: "",
					time: "",
					timeZone: zone,
					seconds: "",
					expression: seedCronExpression(record, zone)
				};
			}
		}
		/**
		* Cron expression the cron choice starts from: the committed occurrence's clock
		* in the choice's zone as a daily rule, the same instant and zone the other
		* wall-clock choices seed their time row with.
		* @param record - shown rule.
		* @param zone - IANA zone the seeded expression is stated in.
		* @returns five-field expression matching that occurrence.
		*/
		function seedCronExpression(record, zone) {
			const wallClock = zonedWallClock(record.scheduledAt, zone);
			return `${Number(wallClock.slice(14, 16))} ${Number(wallClock.slice(11, 13))} * * *`;
		}
		/**
		* ISO weekday set the weekly choice edits. A weekly rule keeps its stored set;
		* another kind seeds the committed occurrence's weekday in the zone `seedDraft`
		* gives that choice, so the set and the seeded clock describe the same local day.
		* A switch between two clock-time choices carries the shown clock and zone into
		* that time, and the weekly choice then takes the occurrence's weekday in that
		* zone from `zonedWeekday`, so the set and the carried clock name one local day.
		* @param record - shown rule.
		* @returns ascending ISO weekdays, never empty.
		*/
		function seedWeekdays(record) {
			if (record.kind === "weekly") return [...record.weekdays];
			const zone = draftZone(record).zone;
			return [zonedWeekday(record.scheduledAt, zone)];
		}
		/**
		* ISO weekday one instant falls on in one zone, for the weekly choice's set.
		*
		* The formatter locale is fixed, because the seeded weekday is part of the rule
		* a save submits: it must not change with the interface language.
		* @param instant - canonical instant the rule commits.
		* @param timeZone - IANA zone whose calendar day names the weekday.
		* @returns that weekday, ISO 1 through 7; an unparsable instant reads UTC.
		*/
		function zonedWeekday(instant, timeZone) {
			const at = new Date(instant);
			let calendarDay;
			try {
				const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
					timeZone,
					year: "numeric",
					month: "2-digit",
					day: "2-digit"
				}).formatToParts(at).map((part) => [part.type, part.value]));
				calendarDay = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)));
			} catch {
				calendarDay = at;
			}
			return (calendarDay.getUTCDay() + 6) % 7 + 1;
		}
		/**
		* Build the timing change one staged Run time draft saves.
		*
		* The draft already holds complete values for its choice: switching recurrence
		* seeds them at the switch, so every edit stays in the request.
		* @param draft - values the card shows.
		* @param kind - choice the values belong to.
		* @param weekdays - ISO weekday set the weekly choice saves.
		* @returns the complete timing change for the compare-and-update request.
		*/
		function ruleChange(draft, kind, weekdays) {
			switch (kind) {
				case "once": return {
					kind: "at",
					at: {
						date: draft.date,
						time: withSeconds(draft.time),
						time_zone: draft.timeZone.trim()
					}
				};
				case "every": return {
					kind: "every",
					every_seconds: Number(draft.seconds)
				};
				case "daily": return {
					kind: "daily",
					daily: {
						time: withSeconds(draft.time),
						time_zone: draft.timeZone.trim()
					}
				};
				case "cron": return {
					kind: "cron",
					cron: {
						expression: draft.expression.trim(),
						time_zone: draft.timeZone.trim()
					}
				};
				case "weekdays":
				case "weekly": return {
					kind: "weekly",
					weekly: {
						time: withSeconds(draft.time),
						time_zone: draft.timeZone.trim(),
						weekdays: kind === "weekdays" ? [...WEEKDAY_RULE] : [...weekdays]
					}
				};
			}
		}
		/**
		* Longest task name the Host accepts. The browser-safe Schedule entry exports
		* types only, so the client repeats the limit its local validation uses.
		*/
		const RULE_TITLE_MAX_LENGTH = 120;
		/**
		* Whether a staged one-shot date is a real ISO calendar date.
		*
		* The control is a text field, so the value can be anything the reader types;
		* only `YYYY-MM-DD` naming an existing day is accepted. A round trip through
		* `Date.UTC` rejects a shape-correct but impossible date such as `2026-02-31`.
		* @param value - staged date text.
		* @returns true when the text is an existing ISO calendar date.
		*/
		function validIsoDate(value) {
			if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
			const parsed = /* @__PURE__ */ new Date(`${value}T00:00:00.000Z`);
			return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
		}
		/**
		* Local validation of a staged draft before it is saved.
		* @param shown - values the detail shows.
		* @returns dictionary key of the invalid field, or undefined when the draft can be saved.
		*/
		function draftError(shown) {
			const title = shown.title.trim();
			if (title.length === 0 || title.length > RULE_TITLE_MAX_LENGTH) return "rule.invalidTitle";
			if (shown.prompt.trim().length === 0) return "rule.invalidPrompt";
			if (shown.kind === "every") return /^\d+$/.test(shown.draft.seconds) && Number(shown.draft.seconds) >= MIN_INTERVAL_SECONDS ? void 0 : "timing.invalidInterval";
			if (shown.kind === "cron") return parseCronExpression(shown.draft.expression) === void 0 ? "rule.cronInvalid" : void 0;
			if (shown.kind === "once" && !validIsoDate(shown.draft.date) || !/^\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?$/.test(shown.draft.time)) return "timing.invalid";
		}
		/**
		* Name and instruction one staged save replaces, omitting each value the
		* authoritative record already stores.
		* @param shown - values the detail edits.
		* @param stored - authoritative values the request carries as its expected record.
		* @returns content fields to submit, empty when both already match that record.
		*/
		function contentChange(shown, stored) {
			const content = {};
			const title = shown.title.trim();
			const prompt = shown.prompt.trim();
			if (title !== stored.title) content.title = title;
			if (prompt !== stored.prompt) content.prompt = prompt;
			return content;
		}
		/**
		* Display the recurrence the Repeat row shows: the staged choice while it differs
		* from the stored kind, otherwise the stored rule's localized frequency. The
		* cron choice always reads as its menu label: the rule card's own rows and
		* sentence state the rule, and an unrecognized expression has no short summary.
		* @param record - stored rule.
		* @param kind - choice the draft stages.
		* @param t - namespace-bound task-manager translate.
		* @param zone - host-zone context the frequency line uses to omit or name the stored zone.
		* @returns localized recurrence text.
		*/
		function repeatValue(record, kind, t, zone) {
			if (kind === "cron" || ruleKind(record) !== kind) return t(RULE_KIND_LABELS[kind]);
			return formatScheduleFrequency(record, t, zone);
		}
		/** Prefer the largest friendly unit that represents a stored whole-second interval exactly. */
		function preferredIntervalUnit(seconds) {
			const value = Number(seconds);
			if (Number.isSafeInteger(value) && value > 0 && value % INTERVAL_UNIT_SECONDS.hour === 0) return "hour";
			if (Number.isSafeInteger(value) && value > 0 && value % INTERVAL_UNIT_SECONDS.minute === 0) return "minute";
			return "second";
		}
		/** Repeat-menu label for one elapsed interval unit. */
		function intervalRuleLabel(unit) {
			if (unit === "hour") return "rule.everyHours";
			if (unit === "minute") return "rule.everyMinutes";
			return "rule.everySeconds";
		}
		/** Whether one visible Repeat-menu option selects an elapsed interval. */
		function isIntervalChoice(choice) {
			return choice === "every-hour" || choice === "every-minute" || choice === "every-second";
		}
		/** Stored interval unit selected by one visible interval choice. */
		function intervalChoiceUnit(choice) {
			if (choice === "every-hour") return "hour";
			if (choice === "every-minute") return "minute";
			return "second";
		}
		/**
		* Elapsed seconds the elapsed-interval row starts from when the user selects one
		* unit explicitly, so the number the row shows and the unit it shows agree: 3600
		* seconds is one whole hour and sixty whole minutes. The unit itself always
		* follows the user's choice, so this seed never has to express minutes or
		* seconds as the base unit.
		* @returns whole seconds that display as a whole number of the chosen unit.
		*/
		function seedIntervalSeconds() {
			return INTERVAL_UNIT_SECONDS.hour;
		}
		/**
		* Three shared timing messages name Save, Cancel, and a retained draft, none of
		* which this card has; the other codes keep their shared wording.
		*/
		const RULE_ERROR_OVERRIDES = {
			"timing.conflict": "rule.error.conflict",
			"timing.notFound": "rule.error.notFound",
			"timing.error": "rule.error.unknown"
		};
		/**
		* Localize a rejected rule update without exposing transport or storage diagnostics.
		* @param code - error code returned by the compare-and-update.
		* @returns dictionary key describing the recovery action.
		*/
		function ruleError(code) {
			const key = timingError(code);
			return RULE_ERROR_OVERRIDES[key] ?? key;
		}
		/**
		* Close an open dropdown on Escape before the page's own Escape handler sees
		* the key, so dismissing a menu never closes the whole task detail. Stopping
		* the key's propagation withholds it from the menu's own document listener,
		* which the page's handler honors; this guard covers a dropdown whose listener
		* stands down before that.
		* @param event - keydown from the wrapper around that menu.
		* @param open - whether this wrapper's menu is showing.
		* @param close - dismiss that menu and return focus to its trigger.
		*/
		function guardMenuEscape(event, open, close) {
			if (event.key !== "Escape") return;
			if (!open) return;
			event.stopPropagation();
			close();
		}
		/**
		* Seed the detail's editable values from one stored record.
		* @param record - rule to seed from.
		* @returns complete shown values for that rule.
		*/
		function ruleValues(record) {
			return {
				title: record.title,
				prompt: record.prompt,
				kind: ruleKind(record),
				draft: timingDraft(record),
				weekdays: seedWeekdays(record)
			};
		}
		/**
		* Seed the detail's staged draft state from one stored record.
		* @param record - rule to seed from.
		* @returns a clean draft that equals its stored values.
		*/
		function initialRuleEdit(record) {
			const values = ruleValues(record);
			return {
				propKey: shownValues(values),
				stored: values,
				shown: values
			};
		}
		/**
		* Comparison key of the staged timing values alone, without the stored record's
		* identity or committed target.
		* @param shown - values the detail displays.
		* @returns key that changes exactly when one staged timing value changes.
		*/
		function timingValues(shown) {
			const { kind, draft, weekdays } = shown;
			return JSON.stringify([
				kind,
				draft.date,
				draft.time,
				draft.timeZone,
				draft.seconds,
				draft.expression,
				weekdays
			]);
		}
		/**
		* Comparison key of every staged value, without the stored record's identity or
		* committed target. The name and instruction compare trimmed, because the Host
		* stores both trimmed.
		* @param shown - values the detail displays.
		* @returns key that changes exactly when one shown value changes.
		*/
		function shownValues(shown) {
			return JSON.stringify([
				shown.title.trim(),
				shown.prompt.trim(),
				timingValues(shown)
			]);
		}
		/**
		* Choose one merged text field: text the user changed keeps the draft value,
		* and text the user left untouched takes the refreshed record. Both sides
		* compare trimmed, because the Host stores both trimmed.
		* @param draft - text the control shows.
		* @param stored - authoritative text the draft was compared against.
		* @param authoritative - text of the refreshed record.
		* @returns the text the merge keeps.
		*/
		function reseedText(draft, stored, authoritative) {
			return draft.trim() === stored.trim() ? authoritative : draft;
		}
		/** Whether two weekday sets hold the same days in the same order. */
		function sameWeekdays(left, right) {
			return left.length === right.length && left.every((day, index) => day === right[index]);
		}
		/**
		* Whether the user changed any timing field of a draft.
		* @param draft - values the detail currently shows.
		* @param stored - values the draft was compared against.
		* @returns whether any timing field differs from the stored one.
		*/
		function editedTiming(draft, stored) {
			return draft.draft.date !== stored.draft.date || draft.draft.time !== stored.draft.time || draft.draft.timeZone !== stored.draft.timeZone || draft.draft.seconds !== stored.draft.seconds || draft.draft.expression !== stored.draft.expression || !sameWeekdays(draft.weekdays, stored.weekdays);
		}
		/**
		* Choose one merged timing field of a draft whose rule kind did not change.
		* @param draft - value the detail shows.
		* @param stored - value the draft was compared against.
		* @param authoritative - value of the refreshed record.
		* @returns the value the merge keeps.
		*/
		function reseedValue(draft, stored, authoritative) {
			return draft === stored ? authoritative : draft;
		}
		/**
		* Merge one refreshed authoritative record into a staged draft.
		*
		* Three cases, because a rule kind and the fields that describe it are one
		* value. The Monday-to-Friday choice and the weekly choice state the same Host
		* weekly rule, so the comparisons below fold them together and only the day set
		* tells them apart.
		*
		* The draft stages another kind than the stored record. Its fields describe a
		* rule the refreshed record does not state, so the draft keeps them whole.
		*
		* The draft stages the stored kind, and the refreshed record changed that kind.
		* The two rules cannot be mixed, so the draft is kept whole when the user edited
		* it and the refreshed rule is adopted whole when the user did not.
		*
		* All three kinds agree. Only here can one field differ legitimately on each
		* side, so the fields merge on their own: a field the user changed keeps the
		* draft value and every other field takes the refreshed record, which is what
		* carries a concurrent remote timing edit into an unrelated local edit.
		*
		* The name and the instruction merge field by field in every case: another
		* client's rename reaches this detail even while a rule change is staged.
		* @param authoritative - values of the refreshed record.
		* @param draft - values the detail currently shows.
		* @param stored - authoritative values the draft was compared against.
		* @returns the merged values.
		*/
		function mergeRuleDraft(authoritative, draft, stored) {
			const text = {
				title: reseedText(draft.title, stored.title, authoritative.title),
				prompt: reseedText(draft.prompt, stored.prompt, authoritative.prompt)
			};
			if (storedRuleChoice(draft.kind) !== storedRuleChoice(stored.kind)) return {
				...draft,
				...text
			};
			if (storedRuleChoice(authoritative.kind) !== storedRuleChoice(stored.kind)) return editedTiming(draft, stored) ? {
				...draft,
				...text
			} : {
				...authoritative,
				...text
			};
			const weekdays = sameWeekdays(draft.weekdays, stored.weekdays) ? authoritative.weekdays : draft.weekdays;
			const stagedChoice = draft.kind !== stored.kind || !sameWeekdays(draft.weekdays, stored.weekdays);
			return {
				...text,
				kind: storedRuleChoice(draft.kind) === "weekly" ? stagedChoice ? draft.kind : isWeekdayRule(weekdays) ? "weekdays" : "weekly" : reseedValue(draft.kind, stored.kind, authoritative.kind),
				draft: {
					date: reseedValue(draft.draft.date, stored.draft.date, authoritative.draft.date),
					time: reseedValue(draft.draft.time, stored.draft.time, authoritative.draft.time),
					timeZone: reseedValue(draft.draft.timeZone, stored.draft.timeZone, authoritative.draft.timeZone),
					seconds: reseedValue(draft.draft.seconds, stored.draft.seconds, authoritative.draft.seconds),
					expression: reseedValue(draft.draft.expression, stored.draft.expression, authoritative.draft.expression)
				},
				weekdays
			};
		}
		/**
		* Render the weekly rule's Weekday row: one pill per weekday, named by the row's
		* label and toggled in the rule the caller is editing.
		* @param props.weekdays - weekdays the rule currently selects, as the builder's stored day numbers.
		* @param props.disabled - whether the rule's controls are read-only.
		* @param props.t - frequency translator owning the weekday labels.
		* @param props.rowId - id builder for the row's label, which names the pill group.
		* @param props.onToggle - toggle one weekday in the rule being edited.
		* @returns the labelled Weekday row.
		*/
		function WeekdayRow({ weekdays, disabled, t, rowId, onToggle }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: TaskManagerPage_module_css_default.ruleRow,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: TaskManagerPage_module_css_default.ruleLabel,
					id: rowId("weekday"),
					children: t("rule.weekday")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleWeekdays, TaskManagerPage_module_css_default.ruleControl),
					role: "group",
					"aria-labelledby": rowId("weekday"),
					children: WEEKDAYS.map((weekday) => {
						const selected = weekdays.includes(weekday);
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Pill, {
							className: TaskManagerPage_module_css_default.ruleControl,
							active: selected,
							disabled,
							"aria-pressed": selected,
							"aria-label": t("rule.weekdayOption", { weekday: t(WEEKDAY_LABELS[weekday]) }),
							onClick: () => {
								onToggle(weekday);
							},
							children: t(WEEKDAY_LABELS[weekday])
						}, weekday);
					})
				})]
			});
		}
		/**
		* Render the rule's recurrence, time, and zone as rows that edit a local draft.
		*
		* No row reaches the Host on its own: the detail's Save action submits the
		* complete expected record with the staged name, instruction, and timing change
		* through `schedule.update`.
		* @param props - task, staged values, blocking state, draft callbacks, and locale.
		* @returns the bordered Run time card with its staged rows.
		*/
		function RuleCard({ task, disabled, values, intervalUnit, failure, onChooseKind, onChooseZone, onToggleWeekday, onEditDraft, t }) {
			const shown = values;
			const [repeatOpen, setRepeatOpen] = (0, react.useState)(false);
			const [zoneOpen, setZoneOpen] = (0, react.useState)(false);
			const [zoneQuery, setZoneQuery] = (0, react.useState)("");
			const [dateOpen, setDateOpen] = (0, react.useState)(false);
			const [timeOpen, setTimeOpen] = (0, react.useState)(false);
			const systemZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const [recentZones, setRecentZones] = (0, react.useState)(() => loadRecentTimeZones(systemZone));
			const frequencyZone = {
				system: systemZone,
				label: (zone) => zoneLabel(zone, t)
			};
			const repeatRef = (0, react.useRef)(null);
			const zoneRef = (0, react.useRef)(null);
			const dateRef = (0, react.useRef)(null);
			const timeRef = (0, react.useRef)(null);
			const cardId = (0, react.useId)();
			const rowId = (name) => `${cardId}-${name}`;
			(0, react.useEffect)(() => {
				if (!disabled) return;
				setDateOpen(false);
				setTimeOpen(false);
			}, [disabled]);
			const chooseChoice = (choice) => {
				setRepeatOpen(false);
				if (isIntervalChoice(choice)) {
					onChooseKind("every", intervalChoiceUnit(choice));
					return;
				}
				onChooseKind(choice);
			};
			const intervalMin = Math.ceil(MIN_INTERVAL_SECONDS / INTERVAL_UNIT_SECONDS[intervalUnit]);
			const intervalValue = shown.draft.seconds === "" ? void 0 : Number(shown.draft.seconds) / INTERVAL_UNIT_SECONDS[intervalUnit];
			const stepInterval = (delta) => {
				const next = intervalValue === void 0 ? intervalMin : Math.max(intervalMin, intervalValue + delta);
				onEditDraft({ seconds: String(Math.round(next * INTERVAL_UNIT_SECONDS[intervalUnit])) });
			};
			const chooseZone = (zone) => {
				setZoneOpen(false);
				setZoneQuery("");
				setRecentZones((recent) => rememberTimeZone(recent, zone));
				onChooseZone(zone);
			};
			const zoneCatalog = (0, react.useMemo)(() => {
				if (!zoneOpen) return [];
				const at = Date.now();
				const byLabel = /* @__PURE__ */ new Map();
				for (const zone of zoneChoices(shown.draft.timeZone, systemZone, at)) {
					const label = zoneName(zone, systemZone, t, at);
					const existing = byLabel.get(label);
					if (existing === void 0) {
						byLabel.set(label, {
							id: zone,
							label,
							disabled,
							zones: [zone]
						});
						continue;
					}
					existing.zones.push(zone);
					if (zone === shown.draft.timeZone) existing.id = zone;
				}
				return [...byLabel.values()];
			}, [
				disabled,
				shown.draft.timeZone,
				systemZone,
				t,
				zoneOpen
			]);
			const zoneLocale = t("time.locale");
			const normalizedZoneQuery = zoneQuery.trim().toLocaleLowerCase(zoneLocale);
			const namedZone = (zones, preferred) => {
				if (normalizedZoneQuery === "") return void 0;
				const exact = zones.find((zone) => zone.toLocaleLowerCase(zoneLocale) === normalizedZoneQuery);
				if (exact !== void 0) return exact;
				const partial = zones.filter((zone) => zone.toLocaleLowerCase(zoneLocale).includes(normalizedZoneQuery));
				if (partial.length === 0) return void 0;
				return partial.includes(preferred) ? preferred : partial[0];
			};
			const zoneItems = zoneCatalog.filter((item) => `${item.zones.join(" ")} ${item.label}`.toLocaleLowerCase(zoneLocale).includes(normalizedZoneQuery)).map((item) => ({
				...item,
				id: namedZone(item.zones, item.id) ?? item.id
			}));
			const recentItems = normalizedZoneQuery === "" ? recentZones.flatMap((zone) => {
				const item = zoneCatalog.find((choice) => choice.zones.includes(zone));
				return item === void 0 ? [] : [{
					...item,
					id: zone
				}];
			}).filter((item, index, items) => items.findIndex((candidate) => candidate.label === item.label) === index) : [];
			const recentLabels = new Set(recentItems.map((item) => item.label));
			const availableZoneItems = zoneItems.filter((item) => !recentLabels.has(item.label));
			const shownZoneItems = recentItems.length === 0 ? availableZoneItems : availableZoneItems.length === 0 ? recentItems : [
				...recentItems,
				{
					type: "separator",
					id: "__recent"
				},
				...availableZoneItems
			];
			const parsedCron = shown.kind === "cron" ? parseCronExpression(shown.draft.expression) : void 0;
			const clockHint = shown.kind === "once" && !draftZone(task).stored ? "timing.zoneNoStored" : void 0;
			const clockLine = failure ?? clockHint;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: TaskManagerPage_module_css_default.ruleCard,
				"aria-label": t("rule.title"),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: t("rule.title") }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: TaskManagerPage_module_css_default.ruleRows,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TaskManagerPage_module_css_default.menuGuard,
								onKeyDown: (event) => {
									guardMenuEscape(event, repeatOpen, () => {
										setRepeatOpen(false);
										repeatRef.current?.focus();
									});
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TaskMenu, {
									className: TaskManagerPage_module_css_default.ruleRowMenu,
									open: repeatOpen,
									onClose: () => {
										setRepeatOpen(false);
									},
									items: RULE_CHOICES.map((value) => ({
										id: value,
										label: t(RULE_CHOICE_LABELS[value]),
										disabled
									})),
									selectedId: shown.kind === "every" ? `every-${intervalUnit}` : shown.kind,
									onSelect: (id) => {
										chooseChoice(id);
									},
									align: "end",
									portal: true,
									anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										ref: repeatRef,
										type: "button",
										className: TaskManagerPage_module_css_default.ruleValue,
										disabled,
										"aria-haspopup": "menu",
										"aria-expanded": repeatOpen,
										onClick: () => {
											setRepeatOpen((open) => !open);
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: TaskManagerPage_module_css_default.ruleLabel,
											children: t("rule.repeat")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleValueFace, TaskManagerPage_module_css_default.ruleControl),
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: TaskManagerPage_module_css_default.ruleCurrent,
												children: shown.kind === "every" ? t(intervalRuleLabel(intervalUnit)) : repeatValue(task, shown.kind, t, frequencyZone)
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronDownOutlineRegular, {})]
										})]
									})
								})
							}),
							shown.kind === "weekly" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WeekdayRow, {
								weekdays: shown.weekdays,
								disabled,
								t,
								rowId,
								onToggle: onToggleWeekday
							}),
							shown.kind === "every" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: TaskManagerPage_module_css_default.ruleRow,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
									className: TaskManagerPage_module_css_default.ruleLabel,
									htmlFor: rowId("interval"),
									children: t("timing.interval")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: TaskManagerPage_module_css_default.ruleInterval,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: TaskManagerPage_module_css_default.ruleIntervalStepper,
										style: { "--interval-digits": String(intervalValue ?? "").length || 1 },
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											id: rowId("interval"),
											className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleInput, TaskManagerPage_module_css_default.ruleControl, TaskManagerPage_module_css_default.ruleIntervalInput),
											type: "number",
											min: intervalMin,
											step: "any",
											disabled,
											value: intervalValue ?? "",
											"aria-describedby": rowId("interval-hint"),
											onChange: (event) => {
												const value = event.target.value;
												onEditDraft({ seconds: value === "" ? "" : String(Math.round(Number(value) * INTERVAL_UNIT_SECONDS[intervalUnit])) });
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: TaskManagerPage_module_css_default.ruleIntervalArrows,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: TaskManagerPage_module_css_default.ruleIntervalArrow,
												"aria-label": t("timing.intervalIncrease"),
												disabled,
												onClick: () => {
													stepInterval(1);
												},
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronUpOutlineRegular, { size: 9 })
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: TaskManagerPage_module_css_default.ruleIntervalArrow,
												"aria-label": t("timing.intervalDecrease"),
												disabled: disabled || intervalValue !== void 0 && intervalValue <= intervalMin,
												onClick: () => {
													stepInterval(-1);
												},
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronDownOutlineRegular, { size: 9 })
											})]
										})]
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: TaskManagerPage_module_css_default.ruleIntervalUnit,
										children: t(INTERVAL_UNIT_LABELS[intervalUnit])
									})]
								})]
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								shown.kind === "once" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: TaskManagerPage_module_css_default.ruleRow,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
										className: TaskManagerPage_module_css_default.ruleLabel,
										htmlFor: rowId("date"),
										children: t("timing.date")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: TaskManagerPage_module_css_default.menuGuard,
										onKeyDown: (event) => {
											guardMenuEscape(event, dateOpen, () => {
												setDateOpen(false);
												dateRef.current?.focus();
											});
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											ref: dateRef,
											id: rowId("date"),
											type: "button",
											className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleInput, TaskManagerPage_module_css_default.ruleControl, TaskManagerPage_module_css_default.pickerTrigger),
											disabled,
											"aria-label": t("timing.date"),
											"aria-haspopup": "dialog",
											"aria-expanded": dateOpen,
											"aria-describedby": clockHint === void 0 ? void 0 : rowId("time-hint"),
											onClick: () => {
												setDateOpen((open) => !open);
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: slashDate(shown.draft.date) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCalendarOutlineRegular, { className: TaskManagerPage_module_css_default.pickerIcon })]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DatePicker, {
											open: dateOpen,
											anchorRef: dateRef,
											value: shown.draft.date,
											onPick: (date) => {
												onEditDraft({ date });
											},
											onClose: () => {
												setDateOpen(false);
											},
											t
										})]
									})]
								}),
								shown.kind !== "cron" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: TaskManagerPage_module_css_default.ruleRow,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
										className: TaskManagerPage_module_css_default.ruleLabel,
										htmlFor: rowId("time"),
										children: t("timing.time")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: TaskManagerPage_module_css_default.menuGuard,
										onKeyDown: (event) => {
											guardMenuEscape(event, timeOpen, () => {
												setTimeOpen(false);
												timeRef.current?.focus();
											});
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											ref: timeRef,
											id: rowId("time"),
											type: "button",
											className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleInput, TaskManagerPage_module_css_default.ruleControl, TaskManagerPage_module_css_default.pickerTrigger),
											disabled,
											"aria-label": t("timing.time"),
											"aria-haspopup": "dialog",
											"aria-expanded": timeOpen,
											"aria-describedby": clockHint === void 0 ? void 0 : rowId("time-hint"),
											onClick: () => {
												setTimeOpen((open) => !open);
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: secondPrecision(shown.draft.time) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClockOutlineRegular, { className: TaskManagerPage_module_css_default.pickerIcon })]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ClockPicker, {
											open: timeOpen,
											anchorRef: timeRef,
											value: shown.draft.time,
											onPick: (time) => {
												onEditDraft({ time });
											},
											onClose: () => {
												setTimeOpen(false);
											},
											t
										})]
									})]
								}),
								shown.kind === "cron" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CronRows, {
									task,
									disabled,
									expression: shown.draft.expression,
									timeZone: shown.draft.timeZone,
									hintId: rowId("expression-hint"),
									onEditExpression: (expression) => {
										onEditDraft({ expression });
									},
									t
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: TaskManagerPage_module_css_default.menuGuard,
									onKeyDown: (event) => {
										guardMenuEscape(event, zoneOpen, () => {
											setZoneOpen(false);
											zoneRef.current?.focus();
										});
									},
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TaskMenu, {
										className: TaskManagerPage_module_css_default.ruleRowMenu,
										open: zoneOpen,
										onClose: () => {
											setZoneOpen(false);
											setZoneQuery("");
										},
										items: shownZoneItems.length > 0 ? shownZoneItems : [{
											id: "__empty",
											label: t("timing.zoneNoResults"),
											disabled: true
										}],
										listClassName: TaskManagerPage_module_css_default.zoneMenu,
										header: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											className: TaskManagerPage_module_css_default.zoneSearch,
											type: "search",
											value: zoneQuery,
											placeholder: t("timing.zoneSearch"),
											"aria-label": t("timing.zoneSearch"),
											"data-menu-field": "",
											onChange: (event) => {
												setZoneQuery(event.target.value);
											}
										}),
										selectedId: shown.draft.timeZone,
										onSelect: (id) => {
											chooseZone(id);
										},
										align: "end",
										portal: true,
										anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											ref: zoneRef,
											type: "button",
											className: TaskManagerPage_module_css_default.ruleValue,
											disabled,
											"aria-haspopup": "menu",
											"aria-expanded": zoneOpen,
											onClick: () => {
												setZoneOpen((open) => {
													if (open) setZoneQuery("");
													return !open;
												});
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: TaskManagerPage_module_css_default.ruleLabel,
												children: t("timing.zone")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleValueFace, TaskManagerPage_module_css_default.ruleControl),
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: TaskManagerPage_module_css_default.ruleCurrent,
													children: zoneName(shown.draft.timeZone, systemZone, t)
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronDownOutlineRegular, {})]
											})]
										})
									})
								})
							] })
						]
					}),
					shown.kind === "every" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						id: rowId("interval-hint"),
						role: failure === void 0 ? void 0 : "alert",
						className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleHint, failure !== void 0 && TaskManagerPage_module_css_default.ruleHintError),
						children: t(failure ?? INTERVAL_HINT_KEYS[intervalUnit])
					}),
					shown.kind !== "every" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: shown.kind === "cron" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						id: rowId("expression-hint"),
						role: failure === void 0 && parsedCron !== void 0 ? void 0 : "alert",
						className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleHint, (failure !== void 0 || parsedCron === void 0) && TaskManagerPage_module_css_default.ruleHintError),
						children: failure !== void 0 ? t(failure) : parsedCron === void 0 ? t("rule.cronInvalid") : cronPreview(parsedCron, t, t("time.locale"))
					}) : clockLine !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						id: rowId("time-hint"),
						role: failure === void 0 ? void 0 : "alert",
						className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleHint, failure !== void 0 && TaskManagerPage_module_css_default.ruleHintError),
						children: t(clockLine)
					}) })
				]
			});
		}
		/** Cron builder frequency choices in menu order; `raw` edits the expression text itself. */
		const CRON_SHAPE_CHOICES = [
			"monthly",
			"weekly",
			"daily",
			"hourly",
			"minutely",
			"raw"
		];
		/** Days a month can hold, in the date grid's order. */
		const MONTH_DAYS = Array.from({ length: 31 }, (_value, index) => index + 1);
		/** Frequency-menu label of each builder choice; the stepped shapes reuse the Repeat menu's wording. */
		const CRON_SHAPE_LABELS = {
			monthly: "cronForm.monthly",
			weekly: "cronForm.weekly",
			daily: "cronForm.daily",
			hourly: "rule.everyHours",
			minutely: "rule.everyMinutes",
			raw: "rule.cronLabel"
		};
		/** Whole minutes between runs a switch to the minutely shape starts from. */
		const CRON_DEFAULT_MINUTE_STEP = 5;
		/**
		* Render the cron choice as structured rows when the staged expression matches
		* one recognized shape, and as the raw expression input otherwise.
		*
		* The builder owns no rule state: every row edit regenerates the staged
		* expression, so storage stays a plain cron rule. Choosing the raw option keeps
		* the expression text editable even while it stays recognizable, until another
		* shape is chosen.
		* @param props - staged expression, blocking state, expression callback, and locale.
		* @returns the cron rows of the Run time card.
		*/
		function CronRows({ task, disabled, expression, timeZone, hintId, onEditExpression, t }) {
			const parsed = parseCronExpression(expression);
			const shape = parsed === void 0 ? void 0 : recognizeCronShape(parsed);
			const [rawChosen, setRawChosen] = (0, react.useState)(false);
			const [freqOpen, setFreqOpen] = (0, react.useState)(false);
			const [timeOpen, setTimeOpen] = (0, react.useState)(false);
			const freqRef = (0, react.useRef)(null);
			const timeRef = (0, react.useRef)(null);
			const baseId = (0, react.useId)();
			const rowId = (name) => `${baseId}-${name}`;
			(0, react.useEffect)(() => {
				if (disabled) setTimeOpen(false);
			}, [disabled]);
			const builder = rawChosen ? void 0 : shape;
			const chooseShape = (choice) => {
				setFreqOpen(false);
				if (choice === "raw") {
					setRawChosen(true);
					return;
				}
				setRawChosen(false);
				if (choice === shape?.kind) return;
				const wallClock = zonedWallClock(task.scheduledAt, timeZone);
				const minute = shape !== void 0 && shape.kind !== "minutely" ? shape.minute : Number(wallClock.slice(14, 16));
				const hour = shape?.kind === "daily" || shape?.kind === "weekly" || shape?.kind === "monthly" ? shape.hour : Number(wallClock.slice(11, 13));
				switch (choice) {
					case "minutely":
						onEditExpression(cronShapeExpression({
							kind: "minutely",
							step: CRON_DEFAULT_MINUTE_STEP
						}));
						return;
					case "hourly":
						onEditExpression(cronShapeExpression({
							kind: "hourly",
							step: 1,
							minute
						}));
						return;
					case "daily":
						onEditExpression(cronShapeExpression({
							kind: "daily",
							hour,
							minute
						}));
						return;
					case "weekly":
						onEditExpression(cronShapeExpression({
							kind: "weekly",
							weekdays: [zonedWeekday(task.scheduledAt, timeZone)],
							hour,
							minute
						}));
						return;
					case "monthly":
						onEditExpression(cronShapeExpression({
							kind: "monthly",
							days: [Number(wallClock.slice(8, 10))],
							hour,
							minute
						}));
						return;
					/* v8 ignore next -- the switch covers every CronShapeChoice, so the default holds no reachable statement. */
					default: assertNever(choice);
				}
			};
			const toggleDay = (current, weekday) => {
				if (current.weekdays.length === 1 && current.weekdays.includes(weekday)) return;
				const weekdays = current.weekdays.includes(weekday) ? current.weekdays.filter((day) => day !== weekday) : WEEKDAYS.filter((day) => day === weekday || current.weekdays.includes(day));
				onEditExpression(cronShapeExpression({
					...current,
					weekdays
				}));
			};
			const toggleDate = (current, day) => {
				if (current.days.length === 1 && current.days.includes(day)) return;
				const days = current.days.includes(day) ? current.days.filter((value) => value !== day) : MONTH_DAYS.filter((value) => value === day || current.days.includes(value));
				onEditExpression(cronShapeExpression({
					...current,
					days
				}));
			};
			const pad = (value) => String(value).padStart(2, "0");
			const clock = builder?.kind === "daily" || builder?.kind === "weekly" || builder?.kind === "monthly" ? `${pad(builder.hour)}:${pad(builder.minute)}` : "";
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: TaskManagerPage_module_css_default.menuGuard,
					onKeyDown: (event) => {
						guardMenuEscape(event, freqOpen, () => {
							setFreqOpen(false);
							freqRef.current?.focus();
						});
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TaskMenu, {
						className: TaskManagerPage_module_css_default.ruleRowMenu,
						open: freqOpen,
						onClose: () => {
							setFreqOpen(false);
						},
						items: CRON_SHAPE_CHOICES.map((value) => ({
							id: value,
							label: t(CRON_SHAPE_LABELS[value]),
							disabled
						})),
						selectedId: builder?.kind ?? "raw",
						onSelect: (id) => {
							chooseShape(id);
						},
						align: "end",
						portal: true,
						anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							ref: freqRef,
							type: "button",
							className: TaskManagerPage_module_css_default.ruleValue,
							disabled,
							"aria-haspopup": "menu",
							"aria-expanded": freqOpen,
							"aria-describedby": hintId,
							onClick: () => {
								setFreqOpen((open) => !open);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: TaskManagerPage_module_css_default.ruleLabel,
								children: t("cronForm.frequency")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleValueFace, TaskManagerPage_module_css_default.ruleControl),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: TaskManagerPage_module_css_default.ruleCurrent,
									children: t(builder === void 0 ? "rule.cronLabel" : CRON_SHAPE_LABELS[builder.kind])
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronDownOutlineRegular, {})]
							})]
						})
					})
				}),
				builder?.kind === "monthly" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: TaskManagerPage_module_css_default.ruleRow,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: TaskManagerPage_module_css_default.ruleLabel,
						id: rowId("dates"),
						children: t("cronForm.dates")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleMonthDays, TaskManagerPage_module_css_default.ruleControl),
						role: "group",
						"aria-labelledby": rowId("dates"),
						children: MONTH_DAYS.map((day) => {
							const selected = builder.days.includes(day);
							return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Pill, {
								className: TaskManagerPage_module_css_default.ruleControl,
								active: selected,
								disabled,
								"aria-pressed": selected,
								"aria-label": t("cronForm.dateOption", { day }),
								onClick: () => {
									toggleDate(builder, day);
								},
								children: day
							}, day);
						})
					})]
				}),
				builder?.kind === "weekly" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WeekdayRow, {
					weekdays: builder.weekdays,
					disabled,
					t,
					rowId,
					onToggle: (weekday) => {
						toggleDay(builder, weekday);
					}
				}),
				(builder?.kind === "minutely" || builder?.kind === "hourly") && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: TaskManagerPage_module_css_default.ruleRow,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
						className: TaskManagerPage_module_css_default.ruleLabel,
						htmlFor: rowId("step"),
						children: t("timing.interval")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: TaskManagerPage_module_css_default.ruleInterval,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CronStepper, {
							id: rowId("step"),
							min: 1,
							max: builder.kind === "minutely" ? 59 : 23,
							value: builder.step,
							disabled,
							increaseLabel: t("timing.intervalIncrease"),
							decreaseLabel: t("timing.intervalDecrease"),
							onChange: (step) => {
								onEditExpression(cronShapeExpression({
									...builder,
									step
								}));
							}
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: TaskManagerPage_module_css_default.ruleIntervalUnit,
							children: t(builder.kind === "minutely" ? "timing.unit.minute" : "timing.unit.hour")
						})]
					})]
				}),
				builder?.kind === "hourly" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: TaskManagerPage_module_css_default.ruleRow,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
						className: TaskManagerPage_module_css_default.ruleLabel,
						htmlFor: rowId("minute"),
						children: t("cronForm.atMinute")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: TaskManagerPage_module_css_default.ruleInterval,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CronStepper, {
							id: rowId("minute"),
							min: 0,
							max: 59,
							value: builder.minute,
							disabled,
							increaseLabel: t("cronForm.minuteIncrease"),
							decreaseLabel: t("cronForm.minuteDecrease"),
							onChange: (minute) => {
								onEditExpression(cronShapeExpression({
									...builder,
									minute
								}));
							}
						})
					})]
				}),
				(builder?.kind === "daily" || builder?.kind === "weekly" || builder?.kind === "monthly") && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: TaskManagerPage_module_css_default.ruleRow,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
						className: TaskManagerPage_module_css_default.ruleLabel,
						htmlFor: rowId("time"),
						children: t("timing.time")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: TaskManagerPage_module_css_default.menuGuard,
						onKeyDown: (event) => {
							guardMenuEscape(event, timeOpen, () => {
								setTimeOpen(false);
								timeRef.current?.focus();
							});
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							ref: timeRef,
							id: rowId("time"),
							type: "button",
							className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleInput, TaskManagerPage_module_css_default.ruleControl, TaskManagerPage_module_css_default.pickerTrigger),
							disabled,
							"aria-label": t("timing.time"),
							"aria-haspopup": "dialog",
							"aria-expanded": timeOpen,
							onClick: () => {
								setTimeOpen((open) => !open);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: clock }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClockOutlineRegular, { className: TaskManagerPage_module_css_default.pickerIcon })]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ClockPicker, {
							open: timeOpen,
							anchorRef: timeRef,
							value: clock,
							seconds: false,
							onPick: (time) => {
								onEditExpression(cronShapeExpression({
									...builder,
									hour: Number(time.slice(0, 2)),
									minute: Number(time.slice(3, 5))
								}));
							},
							onClose: () => {
								setTimeOpen(false);
							},
							t
						})]
					})]
				}),
				builder === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: TaskManagerPage_module_css_default.ruleRow,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
						className: TaskManagerPage_module_css_default.ruleLabel,
						htmlFor: rowId("expression"),
						children: t("rule.cronLabel")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						id: rowId("expression"),
						className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleInput, TaskManagerPage_module_css_default.ruleControl),
						type: "text",
						spellCheck: false,
						autoComplete: "off",
						disabled,
						"aria-invalid": parsed === void 0,
						"aria-describedby": hintId,
						value: expression,
						onChange: (event) => {
							onEditExpression(event.target.value);
						}
					})]
				})
			] });
		}
		/**
		* One whole-number stepper of the cron builder, styled like the elapsed-interval
		* stepper. Values clamp to the shape's own bounds, and an emptied or fractional
		* input stages nothing, so the regenerated expression stays valid on every edit.
		* @param props - bounds, staged value, blocking state, arrow labels, and callback.
		* @returns the stepper pill.
		*/
		function CronStepper({ id, min, max, value, disabled, increaseLabel, decreaseLabel, onChange }) {
			const clamp = (next) => Math.min(max, Math.max(min, next));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: TaskManagerPage_module_css_default.ruleIntervalStepper,
				style: { "--interval-digits": String(value).length },
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					id,
					className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.ruleInput, TaskManagerPage_module_css_default.ruleControl, TaskManagerPage_module_css_default.ruleIntervalInput),
					type: "number",
					min,
					max,
					step: 1,
					disabled,
					value,
					onChange: (event) => {
						const next = Number(event.target.value);
						if (event.target.value === "" || !Number.isSafeInteger(next)) return;
						onChange(clamp(next));
					}
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: TaskManagerPage_module_css_default.ruleIntervalArrows,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: TaskManagerPage_module_css_default.ruleIntervalArrow,
						"aria-label": increaseLabel,
						disabled: disabled || value >= max,
						onClick: () => {
							onChange(clamp(value + 1));
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronUpOutlineRegular, { size: 9 })
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: TaskManagerPage_module_css_default.ruleIntervalArrow,
						"aria-label": decreaseLabel,
						disabled: disabled || value <= min,
						onClick: () => {
							onChange(clamp(value - 1));
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconChevronDownOutlineRegular, { size: 9 })
					})]
				})]
			});
		}
		//#endregion
		//#region src/client/TaskManagerPage.tsx
		/** Cross-session retained reminders with local search and selection. */
		/**
		* Render retained tasks with authoritative deletion and timing-only edits.
		* @param props - framework catalog snapshot, localized copy, and action callbacks.
		* @returns the searchable task list beside the selected task's detail.
		*/
		function TaskManagerPage(props) {
			const { useCatalog, onNewTask, onRetry, onOpenSession, t } = props;
			const catalog = useCatalog((snapshot) => snapshot);
			const { records, status } = catalog;
			const [search, setSearch] = (0, react.useState)("");
			const [statusFilter, setStatusFilter] = (0, react.useState)("all");
			const [selectedId, setSelectedId] = (0, react.useState)(null);
			const [quickConfirmId, setQuickConfirmId] = (0, react.useState)(null);
			const now = useRelativeClock();
			const detail = useTaskDetail(props, catalog, selectedId ?? void 0);
			const { record: catalogRecord, task: selected, id: detailId, confirmId, setConfirmId, setTab } = detail;
			const rowRef = (0, react.useRef)(null);
			const headingRef = (0, react.useRef)(null);
			const confirming = records.find((record) => record.id === confirmId);
			(0, react.useEffect)(() => {
				if (quickConfirmId === null || selectedId !== quickConfirmId || selected === void 0) return;
				setConfirmId(quickConfirmId);
				setQuickConfirmId(null);
			}, [
				quickConfirmId,
				selectedId,
				selected,
				setConfirmId
			]);
			const rows = (0, react.useMemo)(() => {
				const query = search.trim().toLowerCase();
				return records.filter((record) => (statusFilter === "all" || record.status === statusFilter) && (record.prompt.toLowerCase().includes(query) || record.sessionId.toLowerCase().includes(query) || taskName(record).toLowerCase().includes(query))).toSorted((left, right) => Date.parse(left.scheduledAt) - Date.parse(right.scheduledAt));
			}, [
				records,
				search,
				statusFilter
			]);
			const emptyTitle = statusFilter === "inactive" && search.trim() === "" ? "list.emptyInactive" : records.length === 0 ? "list.empty" : "list.noMatches";
			const frequencyZone = {
				system: Intl.DateTimeFormat().resolvedOptions().timeZone,
				label: (zone) => zoneLabel(zone, t)
			};
			const frequency = (record) => formatScheduleFrequency(record, t, frequencyZone);
			(0, react.useEffect)(() => {
				if (selectedId !== null) return;
				if (rowRef.current !== null) {
					(rowRef.current.isConnected ? rowRef.current : headingRef.current)?.focus();
					rowRef.current = null;
				}
			}, [selectedId]);
			(0, react.useEffect)(() => {
				if (status !== "ready") return;
				if (selectedId !== null && selected === void 0) setSelectedId(null);
				if (confirmId !== null && confirming === void 0) setConfirmId(null);
			}, [
				status,
				selectedId,
				selected,
				confirmId,
				confirming
			]);
			const closeDetails = () => {
				setSelectedId(null);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.page, selected !== void 0 && TaskManagerPage_module_css_default.hasDetails),
				"aria-label": t("title"),
				"data-testid": "task-manager-page",
				onKeyDown: (event) => {
					if (event.key !== "Escape" || event.defaultPrevented || confirmId !== null || selectedId === null) return;
					event.preventDefault();
					event.stopPropagation();
					closeDetails();
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: TaskManagerPage_module_css_default.listPane,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: TaskManagerPage_module_css_default.pageScroll,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: TaskManagerPage_module_css_default.pageContent,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: TaskManagerPage_module_css_default.pageHeading,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", {
										ref: headingRef,
										tabIndex: -1,
										children: t("title")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: TaskManagerPage_module_css_default.creationActions,
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
											variant: "primary",
											size: "sm",
											className: TaskManagerPage_module_css_default.newButton,
											icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconPlusOutlineRegular, { size: 13 }),
											onClick: onNewTask,
											children: t("new.action")
										})
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: TaskManagerPage_module_css_default.filters,
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: TaskManagerPage_module_css_default.filterTabs,
										role: "group",
										"aria-label": t("statusFilter.label"),
										children: [
											"all",
											"active",
											"inactive"
										].map((value) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.filterTab, statusFilter === value && TaskManagerPage_module_css_default.filterTabActive),
											"aria-pressed": statusFilter === value,
											onClick: () => {
												setStatusFilter(value);
											},
											children: t(value === "all" ? "statusFilter.all" : `status.${value}`)
										}, value))
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: TaskManagerPage_module_css_default.searchField,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Input, {
										type: "search",
										icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconSearchOutlineRegular, {}),
										"aria-label": t("search.label"),
										placeholder: t("search.placeholder"),
										value: search,
										onChange: (event) => {
											setSearch(event.target.value);
										}
									}), search !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: TaskManagerPage_module_css_default.searchClear,
										"aria-label": t("search.clear"),
										onClick: () => {
											setSearch("");
										},
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCloseOutlineRegular, {})
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: TaskManagerPage_module_css_default.list,
									children: [
										selected === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CatalogFeedback, {
											status,
											populated: rows.length > 0,
											onRetry,
											t
										}),
										status === "ready" && rows.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: TaskManagerPage_module_css_default.empty,
											role: "status",
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClockOutlineRegular, {
													size: 24,
													className: TaskManagerPage_module_css_default.emptyGlyph
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t(emptyTitle) }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
													variant: "outline",
													className: TaskManagerPage_module_css_default.emptyAction,
													onClick: onNewTask,
													children: t("empty.action")
												})
											]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
											className: TaskManagerPage_module_css_default.listRows,
											"aria-label": t("list.label"),
											"aria-busy": status === "loading",
											children: rows.map((record) => {
												const nextRun = nextRunParts(record.scheduledAt, t("time.locale"), now, t);
												return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
													className: TaskManagerPage_module_css_default.rowShell,
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Button, {
														className: (0, import_vendor_clsx.default)(TaskManagerPage_module_css_default.row, selectedId === record.id && TaskManagerPage_module_css_default.selectedRow, record.status === "inactive" && TaskManagerPage_module_css_default.endedRow),
														"aria-label": taskName(record),
														"aria-describedby": `${detailId}-metadata-${record.id}`,
														"aria-expanded": selectedId === record.id,
														"aria-controls": selectedId === record.id ? detailId : void 0,
														onClick: (event) => {
															rowRef.current = event.currentTarget;
															setSelectedId(record.id);
															setTab("rule");
														},
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClockOutlineRegular, { className: TaskManagerPage_module_css_default.rowGlyph }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
															className: TaskManagerPage_module_css_default.rowContent,
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																className: TaskManagerPage_module_css_default.rowTitle,
																children: taskName(record)
															}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
																className: TaskManagerPage_module_css_default.rowSummary,
																id: `${detailId}-metadata-${record.id}`,
																children: [
																	record.status === "inactive" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																		className: TaskManagerPage_module_css_default.metadata,
																		children: t("status.inactive")
																	}),
																	/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																		className: TaskManagerPage_module_css_default.metadata,
																		children: frequency(record)
																	}),
																	record.status === "active" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
																		className: TaskManagerPage_module_css_default.metadata,
																		children: [
																			t("list.nextPrefix"),
																			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("time", {
																				dateTime: record.scheduledAt,
																				children: nextRun.absolute
																			}),
																			" ",
																			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																				className: TaskManagerPage_module_css_default.nextRunRelative,
																				children: nextRun.relative
																			})
																		]
																	})
																]
															})]
														})]
													}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: TaskManagerPage_module_css_default.rowQuickActions,
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
															size: "sm",
															className: TaskManagerPage_module_css_default.detailIconButton,
															"aria-label": t("detail.openSession"),
															title: t("detail.openSession"),
															onClick: () => {
																onOpenSession(record.sessionId);
															},
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconQueueOutlineRegular, {})
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
															size: "sm",
															className: TaskManagerPage_module_css_default.detailIconButton,
															"aria-label": t("delete.action"),
															title: t("delete.action"),
															onClick: () => {
																setQuickConfirmId(record.id);
																setSelectedId(record.id);
																setTab("rule");
															},
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconTrashOutlineRegular, {})
														})]
													})]
												}, record.id);
											})
										})
									]
								})
							]
						})
					})
				}), selected !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TaskDetail, {
					...detail.props,
					task: selected,
					authoritative: catalogRecord !== void 0,
					onDeleted: closeDetails,
					onClose: closeDetails
				})]
			});
		}
		//#endregion
		//#region src/client/catalog-source.ts
		/**
		* Create a catalog whose Remote subscriptions follow its framework subscribers.
		* Mutations retain visible rows until an authoritative list read succeeds, and
		* each deletion resolves with its own outcome for the caller to report.
		* @param deps - Remote calls and invalidation subscriptions.
		* @returns observable catalog and component callbacks.
		*/
		function createCatalogSource(deps) {
			let snapshot = {
				records: [],
				status: "loading",
				deleting: [],
				settled: false,
				readRequest: 0,
				readSettled: 0
			};
			const listeners = /* @__PURE__ */ new Set();
			let disposers = [];
			let epoch = 0;
			let lifecycle = 0;
			const publish = (next) => {
				snapshot = next;
				for (const listener of listeners) listener();
			};
			const read = async (request, current) => {
				let result;
				try {
					result = await deps.list();
				} catch (_error) {
					if (current === epoch) publish({
						...snapshot,
						status: "error"
					});
					return;
				}
				if (current !== epoch) return;
				publish(result.ok ? {
					...snapshot,
					records: result.value,
					status: "ready",
					settled: true,
					readSettled: request
				} : {
					...snapshot,
					status: "error"
				});
			};
			let batching = false;
			let inFlight;
			let inFlightRequest = 0;
			const refresh = (supersede = false, since = 0) => {
				const request = snapshot.readRequest + 1;
				publish({
					...snapshot,
					status: "loading",
					readRequest: request
				});
				if (!supersede && batching && inFlight !== void 0 && inFlightRequest > since) return inFlight;
				if (!batching) {
					batching = true;
					Promise.resolve().then(() => {
						batching = false;
					});
				}
				const pending = read(request, ++epoch);
				inFlightRequest = request;
				inFlight = pending;
				pending.finally(() => {
					if (inFlight === pending) inFlight = void 0;
				});
				return pending;
			};
			const invalidate = () => {
				refresh(true);
			};
			const remove = async (id) => {
				if (snapshot.deleting.includes(id)) return "pending";
				const started = lifecycle;
				publish({
					...snapshot,
					deleting: [...snapshot.deleting, id]
				});
				let result;
				try {
					result = await deps.remove(id);
				} catch (_error) {
					if (started === lifecycle) publish({
						...snapshot,
						deleting: snapshot.deleting.filter((value) => value !== id)
					});
					return "failed";
				}
				if (started !== lifecycle) return result.ok ? "deleted" : "failed";
				publish({
					...snapshot,
					deleting: snapshot.deleting.filter((value) => value !== id)
				});
				if (result.ok) await refresh(true);
				return result.ok ? "deleted" : "failed";
			};
			return {
				hooks: { catalog: {
					getSnapshot: () => snapshot,
					subscribe(listener) {
						listeners.add(listener);
						if (listeners.size === 1) {
							lifecycle++;
							disposers = [deps.subscribeChanged(invalidate), deps.subscribeReset(invalidate)];
							invalidate();
						}
						return () => {
							listeners.delete(listener);
							if (listeners.size !== 0) return;
							for (const dispose of disposers) dispose();
							disposers = [];
							epoch++;
							lifecycle++;
							snapshot = {
								...snapshot,
								deleting: []
							};
						};
					}
				} },
				onDelete: remove,
				onRetry: (since = 0) => refresh(false, since)
			};
		}
		//#endregion
		//#region src/client/DeleteToast.tsx
		/**
		* Create the one deletion-outcome store the overlay entry shows.
		* @returns the observable notice with its report and dismiss actions.
		*/
		function createDeleteToastSource() {
			let state = null;
			let seq = 0;
			const listeners = /* @__PURE__ */ new Set();
			const publish = (next) => {
				state = next;
				for (const listener of listeners) listener();
			};
			return {
				hooks: { toast: {
					getSnapshot: () => state,
					subscribe(listener) {
						listeners.add(listener);
						return () => {
							listeners.delete(listener);
						};
					}
				} },
				report: (outcome) => {
					if (outcome === "pending") return;
					publish({
						kind: outcome === "deleted" ? "deleted" : "deleteFailed",
						seq: ++seq
					});
				},
				dismiss: () => {
					publish(null);
				}
			};
		}
		/**
		* Render the current deletion notice: a success banner for a confirmed
		* deletion, a warning for one that could not be confirmed, or nothing.
		* @param props - the notice hook, its dismissal, and the locale seat.
		* @returns the banner on display, or null.
		*/
		function ScheduleDeleteToast({ useToast, dismiss, t }) {
			const toast = useToast((current) => current);
			if (toast === null) return null;
			return toast.kind === "deleted" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toast, {
				text: t("toast.deleted"),
				tone: "success",
				onDone: dismiss
			}, `schedule-delete-${String(toast.seq)}`) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toast, {
				text: t("toast.deleteFailed"),
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWarningOutlineRegular, {}),
				onDone: dismiss
			}, `schedule-delete-${String(toast.seq)}`);
		}
		//#endregion
		exports.ScheduleDeleteToast = ScheduleDeleteToast;
		exports.TaskManagerPage = TaskManagerPage;
		exports.createCatalogSource = createCatalogSource;
		exports.createDeleteToastSource = createDeleteToastSource;
		exports.sessionLinkState = sessionLinkState;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map
window.__ModuleLoader__.load({
  id: '@stolyarovmn/dsh-client-ui-schedule-tab',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const PACKAGE = '@stolyarovmn/dsh-client-ui-schedule-tab'
    const nativeManager = require('@stolyarovmn/dsh-schedule-native-manager')
    const NS = 'schedule-attention-enhancer'
    const PANEL_ID = 'schedules'
    const SEEN_STORAGE_KEY = PACKAGE + '/seen-v2'
    const LEGACY_SEEN_STORAGE_KEY = PACKAGE + '/seen-v1'
    const NOTIFIED_STORAGE_KEY = PACKAGE + '/delivery-notified-v1'
    const SESSION_SEEN_STORAGE_KEY = PACKAGE + '/session-delivery-seen-v1'
    const PREFERENCES_STORAGE_KEY = PACKAGE + '/notification-preferences-v1'
    const MAX_IDS = 4000

    const en = {
      panel: 'Automation tasks',
      unread: '{count} unread automation task updates',
      overdue: '{count} overdue automation tasks',
      delivered: 'Scheduled task delivered: {title}',
      openConversation: 'Open conversation',
      dismiss: 'Dismiss notification',
      settingsTitle: 'Attention and notifications',
      settingsDescription: 'Choose which Automation Tasks events should ask for your attention in this browser.',
      settingsPopupTitle: 'Popup notifications',
      settingsPopupDescription: 'Show a popup when a scheduled task records a new delivery.',
      settingsNewTasksTitle: 'New tasks',
      settingsNewTasksDescription: 'Count newly discovered active tasks in the Automation Tasks badge.',
      settingsNewDeliveriesTitle: 'New deliveries',
      settingsNewDeliveriesDescription: 'Count newly recorded deliveries in the Automation Tasks badge.',
      settingsBrowserLocal: 'These preferences are stored in this browser. Opening Automation tasks marks task-center attention as read; scheduled Session activity stays unread until its conversation is opened.',
      sessionUnread: 'New scheduled activity',
    }
    const zh = {
      ...en,
      panel: '自动化任务',
      unread: '{count} 条未读自动化任务更新',
      overdue: '{count} 个自动化任务已逾期',
      delivered: '计划任务已投递：{title}',
      openConversation: '打开对话',
      dismiss: '关闭通知',
      settingsTitle: '提醒与通知',
      settingsDescription: '选择此浏览器中哪些自动化任务事件需要引起你的注意。',
      settingsPopupTitle: '弹出通知',
      settingsPopupDescription: '计划任务产生新的投递记录时显示弹出通知。',
      settingsNewTasksTitle: '新任务',
      settingsNewTasksDescription: '在自动化任务徽标中统计新发现的活动任务。',
      settingsNewDeliveriesTitle: '新投递',
      settingsNewDeliveriesDescription: '在自动化任务徽标中统计新记录的投递。',
      settingsBrowserLocal: '这些偏好保存在当前浏览器中。打开自动化任务只会清除任务中心提醒；计划会话活动会一直保留到打开对应对话。',
      sessionUnread: '新的计划任务活动',
    }
    const ru = {
      ...en,
      panel: 'Задачи автоматизации',
      unread: 'Непрочитанных обновлений задач: {count}',
      overdue: 'Просроченных задач: {count}',
      delivered: 'Сработала задача: {title}',
      openConversation: 'Открыть диалог',
      dismiss: 'Закрыть уведомление',
      settingsTitle: 'Внимание и уведомления',
      settingsDescription: 'Выберите, какие события Automation Tasks должны привлекать внимание в этом браузере.',
      settingsPopupTitle: 'Всплывающие уведомления',
      settingsPopupDescription: 'Показывать всплывающее уведомление при появлении новой доставки задачи.',
      settingsNewTasksTitle: 'Новые задачи',
      settingsNewTasksDescription: 'Учитывать новые активные задачи в счётчике Automation tasks.',
      settingsNewDeliveriesTitle: 'Новые доставки',
      settingsNewDeliveriesDescription: 'Учитывать новые доставки в счётчике Automation tasks.',
      settingsBrowserLocal: 'Настройки сохраняются в этом браузере. Открытие Automation tasks снимает внимание только в центре задач; индикатор Session остаётся до открытия самого диалога.',
      sessionUnread: 'Новая активность по расписанию',
    }

    const DEFAULT_PREFERENCES = Object.freeze({ popup: true, newTasks: true, newDeliveries: true })

    function identity(record) { return record.sessionId + ':' + record.id }
    function taskKey(record) { return 'task:' + identity(record) }
    function deliveryMarker(record) {
      const delivery = record.lastDelivery
      if (!delivery) return null
      return delivery.messageId ?? delivery.deliveredAt ?? delivery.scheduledAt ?? null
    }
    function deliveryKey(record) {
      const marker = deliveryMarker(record)
      return marker === null ? null : 'delivery:' + identity(record) + ':' + marker
    }
    function taskTitle(record) { return record.title || record.prompt || record.id }
    function isOverdue(record, now) {
      return record.status === 'active' && Number.isFinite(Date.parse(record.scheduledAt)) && Date.parse(record.scheduledAt) <= now
    }

    function readArray(key) {
      try {
        const raw = window.localStorage?.getItem?.(key)
        const value = raw == null ? [] : JSON.parse(raw)
        return Array.isArray(value) ? value.filter(item => typeof item === 'string').slice(-MAX_IDS) : []
      } catch { return [] }
    }
    function writeArray(key, values) {
      try { window.localStorage?.setItem?.(key, JSON.stringify([...values].slice(-MAX_IDS))) } catch {}
    }
    function hasStorageKey(key) {
      try { return window.localStorage?.getItem?.(key) != null } catch { return false }
    }

    function normalizePreferences(value) {
      return {
        popup: value?.popup !== false,
        newTasks: value?.newTasks !== false,
        newDeliveries: value?.newDeliveries !== false,
      }
    }
    function readPreferences() {
      try {
        const raw = window.localStorage?.getItem?.(PREFERENCES_STORAGE_KEY)
        return raw == null ? { ...DEFAULT_PREFERENCES } : normalizePreferences(JSON.parse(raw))
      } catch { return { ...DEFAULT_PREFERENCES } }
    }
    function writePreferences(value) {
      try { window.localStorage?.setItem?.(PREFERENCES_STORAGE_KEY, JSON.stringify(value)) } catch {}
    }

    let preferencesSnapshot = readPreferences()
    const preferenceListeners = new Set()
    const preferencesSource = {
      getSnapshot: () => preferencesSnapshot,
      subscribe(listener) { preferenceListeners.add(listener); return () => preferenceListeners.delete(listener) },
    }
    function publishPreferences(next, persist = true) {
      const normalized = normalizePreferences(next)
      if (
        normalized.popup === preferencesSnapshot.popup
        && normalized.newTasks === preferencesSnapshot.newTasks
        && normalized.newDeliveries === preferencesSnapshot.newDeliveries
      ) return
      preferencesSnapshot = normalized
      if (persist) writePreferences(normalized)
      for (const listener of [...preferenceListeners]) listener()
    }
    function setPreference(key, enabled) {
      if (!Object.hasOwn(DEFAULT_PREFERENCES, key)) return
      publishPreferences({ ...preferencesSnapshot, [key]: enabled === true })
    }
    function startPreferencesStorageSync() {
      if (typeof window?.addEventListener !== 'function') return () => {}
      const onStorage = event => {
        if (event.key !== PREFERENCES_STORAGE_KEY) return
        publishPreferences(readPreferences(), false)
      }
      window.addEventListener('storage', onStorage)
      return () => window.removeEventListener('storage', onStorage)
    }

    let seenRevision = 0
    const seenListeners = new Set()
    const seenSource = {
      getSnapshot: () => seenRevision,
      subscribe(listener) { seenListeners.add(listener); return () => seenListeners.delete(listener) },
    }
    function bumpSeen() {
      seenRevision += 1
      for (const listener of [...seenListeners]) listener()
    }

    function readSeen(records = []) {
      if (hasStorageKey(SEEN_STORAGE_KEY)) return new Set(readArray(SEEN_STORAGE_KEY))
      if (hasStorageKey(LEGACY_SEEN_STORAGE_KEY)) {
        const legacy = new Set(readArray(LEGACY_SEEN_STORAGE_KEY))
        const migrated = new Set([...legacy].map(value => 'task:' + value))
        for (const record of records) {
          if (!legacy.has(identity(record))) continue
          const key = deliveryKey(record)
          if (key) migrated.add(key)
        }
        writeArray(SEEN_STORAGE_KEY, migrated)
        return migrated
      }
      const baseline = new Set()
      for (const record of records) {
        if (record.status === 'active') baseline.add(taskKey(record))
        const key = deliveryKey(record)
        if (key) baseline.add(key)
      }
      writeArray(SEEN_STORAGE_KEY, baseline)
      return baseline
    }
    function commitSeen(seen) { writeArray(SEEN_STORAGE_KEY, seen); bumpSeen() }

    function readSessionSeen(records = []) {
      if (hasStorageKey(SESSION_SEEN_STORAGE_KEY)) return new Set(readArray(SESSION_SEEN_STORAGE_KEY))
      const baseline = new Set()
      for (const record of records) {
        const key = deliveryKey(record)
        if (key) baseline.add(key)
      }
      writeArray(SESSION_SEEN_STORAGE_KEY, baseline)
      return baseline
    }
    function commitSessionSeen(seen) { writeArray(SESSION_SEEN_STORAGE_KEY, seen); bumpSeen() }
    function markSessionSeen(records, sessionId) {
      const seen = readSessionSeen(records)
      let changed = false
      for (const record of records) {
        if (record.sessionId !== sessionId) continue
        const key = deliveryKey(record)
        if (key && !seen.has(key)) { seen.add(key); changed = true }
      }
      if (changed) commitSessionSeen(seen)
    }
    function markSessionRecordSeen(record) {
      const key = deliveryKey(record)
      if (!key) return
      const seen = readSessionSeen([record])
      if (seen.has(key)) return
      seen.add(key)
      commitSessionSeen(seen)
    }
    function sessionHasUnread(records, sessionId) {
      const seen = readSessionSeen(records)
      return records.some(record => {
        if (record.sessionId !== sessionId) return false
        const key = deliveryKey(record)
        return key !== null && !seen.has(key)
      })
    }

    function markAllSeen(records) {
      const seen = readSeen(records)
      let changed = false
      for (const record of records) {
        if (record.status === 'active' && !seen.has(taskKey(record))) { seen.add(taskKey(record)); changed = true }
        const key = deliveryKey(record)
        if (key && !seen.has(key)) { seen.add(key); changed = true }
      }
      if (changed) commitSeen(seen)
    }
    function markRecordSeen(record) {
      const seen = readSeen([record])
      let changed = false
      if (record.status === 'active' && !seen.has(taskKey(record))) { seen.add(taskKey(record)); changed = true }
      const key = deliveryKey(record)
      if (key && !seen.has(key)) { seen.add(key); changed = true }
      if (changed) commitSeen(seen)
    }

    function readNotified() { return new Set(readArray(NOTIFIED_STORAGE_KEY)) }
    function ensureNotifiedBaseline(records) {
      if (hasStorageKey(NOTIFIED_STORAGE_KEY)) return
      const baseline = new Set()
      for (const record of records) {
        const key = deliveryKey(record)
        if (key) baseline.add(key)
      }
      writeArray(NOTIFIED_STORAGE_KEY, baseline)
    }
    function markNotified(record) {
      const key = deliveryKey(record)
      if (!key) return false
      const notified = readNotified()
      if (notified.has(key)) return false
      notified.add(key)
      writeArray(NOTIFIED_STORAGE_KEY, notified)
      return true
    }
    function markCurrentDeliveriesNotified(records) {
      const notified = readNotified()
      let changed = false
      for (const record of records) {
        const key = deliveryKey(record)
        if (key && !notified.has(key)) { notified.add(key); changed = true }
      }
      if (changed) writeArray(NOTIFIED_STORAGE_KEY, notified)
    }

    function consumeSuppressed(records, preferences) {
      const seen = readSeen(records)
      let changed = false
      if (!preferences.newTasks) {
        for (const record of records) {
          if (record.status === 'active' && !seen.has(taskKey(record))) { seen.add(taskKey(record)); changed = true }
        }
      }
      if (!preferences.newDeliveries) {
        for (const record of records) {
          const key = deliveryKey(record)
          if (key && !seen.has(key)) { seen.add(key); changed = true }
        }
      }
      if (changed) commitSeen(seen)
      if (!preferences.popup) {
        const notified = readNotified()
        let notifiedChanged = false
        for (const record of records) {
          const key = deliveryKey(record)
          if (key && !notified.has(key)) { notified.add(key); notifiedChanged = true }
        }
        if (notifiedChanged) writeArray(NOTIFIED_STORAGE_KEY, notified)
      }
    }

    function applyPreferenceSuppression(records) {
      consumeSuppressed(records, preferencesSnapshot)
      if (!preferencesSnapshot.popup) toastSource.clear()
    }

    function deliveryKeyForReceipt(record, receipt) {
      const marker = receipt?.messageId ?? receipt?.deliveredAt ?? receipt?.scheduledAt ?? null
      return marker === null ? null : 'delivery:' + identity(record) + ':' + marker
    }

    function unreadDeliveryCount(record, seen, historyByTask) {
      const latest = deliveryKey(record)
      if (latest === null || seen.has(latest)) return 0
      const history = historyByTask.get(identity(record))
      if (!Array.isArray(history) || history.length === 0) return 1
      let count = 0
      for (const receipt of history) {
        const key = deliveryKeyForReceipt(record, receipt)
        if (key !== null && seen.has(key)) break
        count += 1
        if (count >= 10) break
      }
      return Math.max(1, count)
    }

    function summary(records, now, preferences, historyByTask) {
      const seen = readSeen(records)
      let unread = 0
      let overdue = 0
      for (const record of records) {
        if (isOverdue(record, now)) overdue += 1
        const deliveries = preferences.newDeliveries ? unreadDeliveryCount(record, seen, historyByTask) : 0
        if (deliveries > 0) { unread += deliveries; continue }
        if (preferences.newTasks && record.status === 'active' && !seen.has(taskKey(record))) unread += 1
        if (unread >= 10) unread = 10
      }
      return { unread, overdue }
    }

    function createToastSource() {
      let current = null
      let queue = []
      let sequence = 0
      const listeners = new Set()
      const publish = value => { current = value; for (const listener of [...listeners]) listener() }
      const showNext = () => {
        if (current !== null || queue.length === 0) return
        publish({ record: queue.shift(), sequence: ++sequence })
      }
      return {
        getSnapshot: () => current,
        subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener) },
        enqueue(record) { queue.push(record); showNext() },
        dismiss() { publish(null); queueMicrotask(showNext) },
        clear() { queue = []; publish(null) },
      }
    }

    const toastSource = createToastSource()
    function createCatalogSource(ctx) {
      let snapshot = { records: [], status: 'loading', historyByTask: new Map() }
      let generation = 0
      let subscribers = 0
      let started = false
      let disposed = false
      let unsubscribeChanged = () => {}
      let unsubscribeReset = () => {}
      const listeners = new Set()
      const publish = value => { snapshot = value; for (const listener of [...listeners]) listener() }
      const shouldEnrichHistory = records => {
        const preferences = preferencesSnapshot
        if (!preferences.newDeliveries) return false
        const seen = readSeen(records)
        const candidates = records.filter(record => {
          const key = deliveryKey(record)
          return key !== null && !seen.has(key)
        })
        return candidates
      }
      async function refresh() {
        const current = ++generation
        let result
        try { result = await ctx.remote.schedule.catalog() }
        catch {
          if (current === generation && !disposed) publish({ ...snapshot, status: 'error' })
          return
        }
        if (disposed || current !== generation || !result?.ok || !Array.isArray(result.value?.records)) {
          if (!disposed && current === generation) publish({ ...snapshot, status: 'error' })
          return
        }
        const records = result.value.records
        ensureNotifiedBaseline(records)
        consumeSuppressed(records, preferencesSnapshot)
        const historyByTask = new Map()
        const candidates = shouldEnrichHistory(records)
        if (candidates.length < 10) {
          let cursor = 0
          const workers = Array.from({ length: Math.min(4, candidates.length) }, async () => {
            while (cursor < candidates.length) {
              const record = candidates[cursor++]
              let history
              try {
                history = await ctx.remote.schedule.history({ sessionId: record.sessionId, id: record.id, limit: 10 })
              } catch { continue }
              if (history?.ok && Array.isArray(history.value?.records)) historyByTask.set(identity(record), history.value.records)
            }
          })
          await Promise.all(workers)
        }
        if (disposed || current !== generation) return
        const previous = snapshot.records
        publish({ records, status: 'ready', historyByTask })
        if (started) detectDeliveries(previous, records)
        else markCurrentDeliveriesNotified(records)
        started = true
      }
      function detectDeliveries(previous, records) {
        const previousById = new Map(previous.map(record => [identity(record), deliveryMarker(record)]))
        const preferences = preferencesSnapshot
        for (const record of records) {
          const marker = deliveryMarker(record)
          if (marker === null || previousById.get(identity(record)) === marker) continue
          if (preferences.popup && markNotified(record)) toastSource.enqueue(record)
        }
      }
      function start() {
        unsubscribeChanged = ctx.remote.$on('schedule/changed', refresh)
        unsubscribeReset = ctx.on('connection/reset', refresh)
        void refresh()
      }
      return {
        getSnapshot: () => snapshot,
        subscribe(listener) {
          listeners.add(listener)
          subscribers += 1
          if (subscribers === 1) start()
          return () => {
            listeners.delete(listener)
            subscribers -= 1
            if (subscribers === 0) {
              generation += 1
              unsubscribeChanged()
              unsubscribeReset()
              unsubscribeChanged = () => {}
              unsubscribeReset = () => {}
            }
          }
        },
        refresh,
        dispose() {
          disposed = true
          generation += 1
          unsubscribeChanged()
          unsubscribeReset()
          listeners.clear()
        },
      }
    }

    function PreferenceSwitch({ checked, onChange, label, description }) {
      return h('label', { className: 'sat_prefRow' },
        h('span', { className: 'sat_prefCopy' },
          h('span', { className: 'sat_prefTitle' }, label),
          h('span', { className: 'sat_prefDescription' }, description)),
        h('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': checked,
          className: 'sat_prefSwitch' + (checked ? ' sat_prefSwitchOn' : ''),
          onClick: () => onChange(!checked),
        }, h('span', { className: 'sat_prefThumb' })))
    }

    function OwnedPluginPreferences({ usePreferences, setPreference: setValue, t }) {
      const preferences = usePreferences(value => value)
      return h('section', { className: 'sat_prefSection' },
        h('style', null, pluginCss),
        h('div', { className: 'sat_prefHeader' },
          h('h2', { className: 'sat_prefHeading' }, t('settingsTitle')),
          h('p', { className: 'sat_prefDescription' }, t('settingsDescription'))),
        h('div', { className: 'sat_prefList' },
          h(PreferenceSwitch, {
            checked: preferences.popup,
            onChange: enabled => setValue('popup', enabled),
            label: t('settingsPopupTitle'),
            description: t('settingsPopupDescription'),
          }),
          h(PreferenceSwitch, {
            checked: preferences.newTasks,
            onChange: enabled => setValue('newTasks', enabled),
            label: t('settingsNewTasksTitle'),
            description: t('settingsNewTasksDescription'),
          }),
          h(PreferenceSwitch, {
            checked: preferences.newDeliveries,
            onChange: enabled => setValue('newDeliveries', enabled),
            label: t('settingsNewDeliveriesTitle'),
            description: t('settingsNewDeliveriesDescription'),
          })),
        h('p', { className: 'sat_prefFootnote' }, t('settingsBrowserLocal')))
    }

    function PluginPreferences(props) {
      const subject = props?.subject
      if (subject?.kind !== 'bundle' || subject.pkg?.name !== PACKAGE) return null
      return h(OwnedPluginPreferences, props)
    }

    function AttentionIcon({ active, useCatalog, usePreferences, t }) {
      const catalog = useCatalog(value => value)
      const preferences = usePreferences(value => value)
      React.useSyncExternalStore(seenSource.subscribe, seenSource.getSnapshot, seenSource.getSnapshot)
      const state = summary(catalog.records, Date.now(), preferences, catalog.historyByTask)
      const panelWasActiveRef = React.useRef(active)
      React.useEffect(() => {
        const justActivated = active && !panelWasActiveRef.current
        panelWasActiveRef.current = active
        if (justActivated && catalog.records.length > 0) markAllSeen(catalog.records)
      }, [active, catalog.records])
      return h('span', { className: 'sat_panelIconWrap' },
        h('span', { className: 'sat_panelIcon', 'aria-hidden': true },
          h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none' },
            h('circle', { cx: 8, cy: 8, r: 6.15, stroke: 'currentColor', strokeWidth: 1.2 }),
            h('path', { d: 'M8 4.5v3.7l2.3 1.45', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' }))),
        state.unread > 0
          ? h('span', { className: 'sat_panelBadge', 'aria-label': t('unread', { count: state.unread }) }, state.unread > 9 ? '9+' : String(state.unread))
          : state.overdue > 0
            ? h('span', { className: 'sat_panelOverdue', 'aria-label': t('overdue', { count: state.overdue }) }, '!')
            : null)
    }

    function SessionActivityMark({ sessionId, useCatalog, useMainView, t }) {
      const catalog = useCatalog(value => value)
      const mainView = useMainView(value => value)
      React.useSyncExternalStore(seenSource.subscribe, seenSource.getSnapshot, seenSource.getSnapshot)
      const unread = sessionHasUnread(catalog.records, sessionId)
      React.useEffect(() => {
        if (!unread) return
        if (mainView.activePanelId === null && mainView.mainSessionId === sessionId) {
          markSessionSeen(catalog.records, sessionId)
        }
      }, [unread, mainView.activePanelId, mainView.mainSessionId, catalog.records, sessionId])
      if (!unread) return null
      return h('span', { className: 'sat_sessionDot', role: 'img', 'aria-label': t('sessionUnread') })
    }

    function DeliveryToast({ useToast, useCatalog, dismiss, onOpen, t }) {
      const current = useToast(value => value)
      useCatalog(value => value)
      if (current == null) return null
      return h('div', { className: 'sat_toast', role: 'status' },
        h('span', { className: 'sat_toastIcon', 'aria-hidden': true },
          h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none' },
            h('circle', { cx: 8, cy: 8, r: 6.15, stroke: 'currentColor', strokeWidth: 1.2 }),
            h('path', { d: 'M8 4.5v3.7l2.3 1.45', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' }))),
        h('span', { className: 'sat_toastCopy' },
          h('strong', null, t('delivered', { title: taskTitle(current.record) })),
          h('button', { type: 'button', className: 'sat_toastOpen', onClick: () => onOpen(current.record) }, t('openConversation'))),
        h('button', { type: 'button', className: 'sat_toastClose', 'aria-label': t('dismiss'), onClick: dismiss }, '×'))
    }

    const pluginCss = `
      .sat_panelIconWrap{position:relative;display:inline-flex;width:16px;height:16px;align-items:center;justify-content:center;overflow:visible}
      .sat_panelIcon{display:inline-flex;width:16px;height:16px;color:var(--dsw-alias-label-secondary)}
      .sat_panelBadge{position:absolute;top:-5px;right:-7px;display:flex;min-width:12px;height:12px;box-sizing:border-box;padding:0 3px;border-radius:6px;align-items:center;justify-content:center;background:var(--dsw-alias-button-ghost-active-fill);color:var(--dsw-alias-label-primary);font-size:8px;font-weight:600;line-height:12px;box-shadow:0 0 0 1px var(--dsw-alias-bg-layer-1)}
      .sat_panelOverdue{position:absolute;top:-5px;right:-5px;display:flex;width:11px;height:11px;align-items:center;justify-content:center;border-radius:50%;background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-label-primary-foreground);font-size:8px;font-weight:700;line-height:11px;box-shadow:0 0 0 1px var(--dsw-alias-bg-layer-1)}
      .sat_sessionDot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-success-primary)}
      .sat_toast{position:fixed;top:12px;right:12px;z-index:1200;display:flex;width:min(380px,calc(100vw - 24px));box-sizing:border-box;gap:10px;padding:12px 14px;border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-2);box-shadow:0 8px 30px rgba(0,0,0,.24);color:var(--dsw-alias-label-primary)}
      .sat_toastIcon{flex:none;display:inline-flex;width:18px;height:18px;margin-top:1px;color:var(--dsw-alias-state-business-primary)}
      .sat_toastCopy{display:flex;min-width:0;flex:1;flex-direction:column;gap:3px;font-size:12px;line-height:18px}.sat_toastCopy strong{font-weight:600;overflow-wrap:anywhere}
      .sat_toastOpen{align-self:flex-start;padding:0;border:0;background:transparent;color:var(--dsw-alias-link);font:inherit;cursor:pointer}.sat_toastOpen:hover{text-decoration:underline}
      .sat_toastClose{flex:none;width:24px;height:24px;margin:-4px -6px 0 0;padding:0;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-tertiary);font-size:18px;line-height:24px;cursor:pointer}.sat_toastClose:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
      .sat_prefSection{display:flex;flex-direction:column;gap:16px;padding:4px 0 12px}.sat_prefHeader{display:flex;flex-direction:column;gap:4px}.sat_prefHeading{margin:0;font-size:14px;line-height:22px;font-weight:600}.sat_prefDescription{margin:0;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
      .sat_prefList{display:flex;flex-direction:column;border-top:.5px solid var(--dsw-alias-border-l4)}.sat_prefRow{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:12px 0;border-bottom:.5px solid var(--dsw-alias-border-l4)}.sat_prefCopy{display:flex;min-width:0;flex:1;flex-direction:column;gap:2px}.sat_prefTitle{color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px;font-weight:500}.sat_prefDescription{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
      .sat_prefSwitch{position:relative;flex:none;width:34px;height:18px;padding:0;border:0;border-radius:9px;background:var(--dsw-alias-bg-layer-2);cursor:pointer;box-shadow:inset 0 0 0 .5px var(--dsw-alias-border-l3)}.sat_prefSwitchOn{background:var(--dsw-alias-label-primary)}.sat_prefThumb{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:var(--dsw-alias-label-primary);transition:transform .12s ease}.sat_prefSwitchOn .sat_prefThumb{transform:translateX(16px);background:var(--dsw-alias-bg-layer-1)}
      .sat_prefSwitch:focus-visible,.sat_toastOpen:focus-visible,.sat_toastClose:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}
      .sat_prefFootnote{margin:0;color:var(--dsw-alias-label-caption);font-size:11px;line-height:17px}
    `

    return {
      name: 'schedule-attention-enhancer',
      inject: ['slots', 'locale', 'uiWorkspace', 'sessions', 'workspaces', 'remote'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { en, zh, ru }), 'schedule-attention: locale')
        ctx.effect(startPreferencesStorageSync, 'schedule-attention: storage sync')
        ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({
          name: 'plugins.detail.section', id: 'schedule-attention-notifications', order: 30, locale: NS,
          inject: () => ({ hooks: { preferences: preferencesSource }, setPreference }),
        }, PluginPreferences))
        ctx.inject(['remote.schedule'], (scope) => {
          const catalog = createCatalogSource(scope)

          let nativeCatalog
          nativeCatalog = nativeManager.createCatalogSource({
            list: () => scope.remote.schedule.catalog(),
            remove: async (id) => {
              const record = nativeCatalog.hooks.catalog.getSnapshot().records.find(item => item.id === id)
              if (record === undefined) return { ok: true, value: { id, deleted: false, code: 'schedule_not_found' } }
              return scope.remote.schedule.delete({ sessionId: record.sessionId, id })
            },
            subscribeChanged: listener => scope.remote.$on('schedule/changed', listener),
            subscribeReset: listener => scope.on('connection/reset', listener),
          })
          const deleteToast = nativeManager.createDeleteToastSource()
          const reportedDelete = async (id) => {
            const outcome = await nativeCatalog.onDelete(id)
            deleteToast.report(outcome)
            return outcome
          }
          const updateTask = async (request) => {
            const result = await scope.remote.schedule.update(request)
            if (result?.ok && ('record' in result.value || result.value.code === 'schedule_conflict'
              || result.value.code === 'schedule_ended' || result.value.code === 'schedule_not_found')) {
              await nativeCatalog.onRetry(nativeCatalog.hooks.catalog.getSnapshot().readRequest)
            }
            return result
          }
          const openSession = (id) => {
            markSessionSeen(catalog.getSnapshot().records, id)
            ctx.uiWorkspace.openSession(id)
          }

          scope.slots.inject('shell.overlay', () => scope.slots.register({
            name: 'shell.overlay', id: 'schedule-attention.native-delete-toast', order: 19, locale: 'schedule.manager',
            inject: () => ({ hooks: deleteToast.hooks, dismiss: deleteToast.dismiss }),
          }, nativeManager.ScheduleDeleteToast))

          scope.slots.inject('main', () => scope.slots.register({
            name: 'main', key: PANEL_ID, priority: -100, locale: 'schedule.manager',
            inject: () => ({
              hooks: nativeCatalog.hooks,
              onDelete: reportedDelete,
              onRetry: nativeCatalog.onRetry,
              onUpdateTiming: updateTask,
              loadHistory: request => scope.remote.schedule.history(request),
              onOpenSession: openSession,
              onNewTask: () => { ctx.uiWorkspace.startSession() },
            }),
          }, nativeManager.TaskManagerPage))
          scope.effect(() => preferencesSource.subscribe(() => {
            applyPreferenceSuppression(catalog.getSnapshot().records)
          }), 'schedule-attention: apply preference changes')
          scope.slots.inject('sidebar.session.row.leading', () => scope.slots.register({
            name: 'sidebar.session.row.leading', id: 'schedule-mark', order: 10, priority: -100, locale: NS,
            inject: () => ({ hooks: { catalog } }),
          }, SessionActivityMark))
          scope.slots.inject('sidebar.panellist', () => scope.slots.register({
            name: 'sidebar.panellist', id: PANEL_ID, order: 10, priority: -100, locale: NS,
            label: () => scope.locale.bind(NS)('panel'),
            inject: () => ({ hooks: { catalog, preferences: preferencesSource } }),
          }, AttentionIcon))
          scope.slots.inject('shell.overlay', () => scope.slots.register({
            name: 'shell.overlay', id: 'schedule-attention.delivery-toast', order: 20, locale: NS,
            inject: () => ({
              hooks: { toast: toastSource, catalog },
              dismiss: toastSource.dismiss,
              onOpen: (record) => {
                markRecordSeen(record)
                markSessionRecordSeen(record)
                toastSource.dismiss()
                ctx.uiWorkspace.openSession(record.sessionId)
              },
            }),
          }, DeliveryToast))
        })
      },
    }
  },
})
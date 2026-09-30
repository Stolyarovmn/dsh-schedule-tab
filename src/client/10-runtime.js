		const react = require("react");
		const jsx = require("react/jsx-runtime");
		const primitives = require("@deepseek-ai/dsh-client-ui-primitives");

		const PACKAGE = "@stolyarovmn/dsh-client-ui-schedule-tab";
		const PANEL_ID = "schedules";
		const NS = "schedule-control-center";
		const TASK_KIND = "scheduleTask";
		const HISTORY_PAGE = 20;
		const SEEN_STORAGE_KEY = PACKAGE + "/seen-v2";
		const LEGACY_SEEN_STORAGE_KEY = PACKAGE + "/seen-v1";
		const MAX_SEEN_IDS = 4000;
		const ClockIcon = primitives.IconAlarmClockOutlineRegular
			?? primitives.IconClockOutlineRegular
			?? primitives.IconClockOutline16
			?? primitives.IconAlarmClockOutline16
			?? null;
		const EditIcon = primitives.IconEditOutlineRegular;
		const HistoryIcon = primitives.IconFlatListOutlineRegular ?? primitives.IconListPenOutlineRegular ?? primitives.IconClockOutlineRegular;
				const TrashIcon = primitives.IconTrashOutlineRegular;
		const CopyIcon = primitives.IconCopyOutlineRegular;
		const PlusIcon = primitives.IconPlusOutlineRegular;
		const SearchIcon = primitives.IconSearchOutlineRegular;
		const WarningIcon = primitives.IconWarningOutlineRegular;
		const CloseIcon = primitives.IconCloseOutlineRegular;
		const ChevronRightIcon = primitives.IconChevronRightOutlineRegular;

		const css = [
			".scc_root{height:100%;box-sizing:border-box;display:flex;flex-direction:column;background:var(--dsw-specific-page,transparent);color:var(--dsw-alias-label-primary);font-size:14px}",
			".scc_header{flex:none;display:flex;align-items:center;gap:10px;padding:16px 20px 10px}",
			".scc_title{font-size:16px;font-weight:600;line-height:24px}",
			".scc_count{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px}",
			".scc_spacer{flex:1}",
			".scc_toolbar{flex:none;padding:0 12px 10px;border-bottom:0.5px solid var(--dsw-alias-border-l1);display:flex;flex-direction:column;gap:8px}",
			".scc_toolbarRow{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}",
			".scc_searchNative{width:100%}",
			".scc_filters,.scc_grouping,.scc_actions{display:flex;align-items:center;gap:6px;flex-wrap:wrap}",
			".scc_actions{min-height:30px}",
			".scc_groupLabel{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;margin-right:2px}",
			".scc_chip,.scc_action{border:0.5px solid var(--dsw-alias-border-l1);border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:18px;padding:3px 9px;cursor:pointer;outline:none}",
			".scc_chipCount{margin-left:5px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}",
			".scc_chipActive .scc_chipCount{color:inherit}",
			".scc_action{border-radius:7px;padding:4px 8px}",
			".scc_iconButton{width:28px!important;min-width:28px!important;height:28px!important;padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}",
			".scc_iconButtonActive{background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent))!important;color:var(--dsw-alias-interactive-primary)!important}",
			".scc_iconButtonDanger{color:var(--dsw-alias-state-danger-label,var(--dsw-alias-state-warn-label))!important}",
			".scc_iconButtonDanger:hover{background:var(--dsw-alias-state-danger-tertiary,var(--dsw-alias-state-warn-tertiary))!important}",
			".scc_confirmTask{margin:0;font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary);overflow-wrap:anywhere}",
			".scc_chip:hover,.scc_action:hover{background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".scc_chip:focus-visible,.scc_action:focus-visible{border-color:var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary))}",
			".scc_chipActive{border-color:var(--dsw-alias-interactive-primary);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent))}",
			".scc_action:disabled{opacity:.45;cursor:default}",
			".scc_banner{margin:8px 12px 0;padding:8px 10px;border:0.5px solid var(--dsw-alias-state-warn-primary);border-radius:9px;color:var(--dsw-alias-state-warn-label);background:var(--dsw-alias-state-warn-tertiary);display:flex;align-items:center;gap:8px;font-size:12px}",
			".scc_body{flex:1;min-height:0;display:flex}",
			".scc_list{flex:1;overflow:auto;margin:0;padding:8px;display:flex;flex-direction:column;gap:12px;--dsh-scrollbar-thumb:var(--dsh-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsh-alias-scrollbar-hover-l2)}",
			".scc_group{display:flex;flex-direction:column;gap:6px}",
			".scc_groupHeader{display:flex;align-items:center;gap:7px;padding:1px 5px;color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:600;line-height:18px}",
			".scc_groupCount{color:var(--dsw-alias-label-tertiary);font-weight:400}",
			".scc_groupList{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}",
			".scc_row{box-sizing:border-box;border:0.5px solid var(--dsw-alias-border-l1);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;flex:none;cursor:default}",
			".scc_rowMain{display:flex;flex-direction:column;gap:8px;cursor:pointer;outline:none}",
			".scc_row:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".scc_rowMain:focus-visible{outline:2px solid var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary));outline-offset:2px;border-radius:8px}",
			".scc_rowOverdue{border-color:var(--dsw-alias-state-warn-primary);background:var(--dsw-alias-state-warn-tertiary)}",
			".scc_rowInactive{opacity:.8}",
			".scc_rowTitle{font-size:14px;font-weight:600;line-height:20px;overflow-wrap:anywhere}",
			".scc_rowTitleLine{display:flex;align-items:center;gap:8px;min-width:0}",
			".scc_rowTitleLine .scc_rowTitle{min-width:0;flex:0 1 auto}",
			".scc_attentionDot{display:inline-block;width:8px;height:8px;min-width:8px;border-radius:50%;background:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px var(--dsw-specific-page,var(--dsw-alias-bg-base,#111))}",
			".scc_attentionDotWarn{background:var(--dsw-alias-state-warn-primary)}",
			".scc_prompt{font-size:13px;line-height:19px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;white-space:pre-wrap}",
			".scc_badges{display:flex;align-items:center;gap:6px;flex-wrap:wrap}",
			".scc_badge{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 7px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-interactive-bg-hover,transparent)}",
			".scc_badgeRecurring{color:var(--dsw-alias-state-business-label,var(--dsw-alias-label-secondary));border:0.5px solid var(--dsw-alias-state-business-primary);background:var(--dsw-alias-state-business-tertiary,var(--dsw-alias-interactive-bg-hover,transparent))}",
			".scc_badgeWarn{color:var(--dsw-alias-state-warn-label);background:var(--dsw-alias-state-warn-tertiary)}",
			".scc_badgeInactive{color:var(--dsw-alias-label-tertiary);border:0.5px solid var(--dsw-alias-border-l1)}",
			".scc_meta,.scc_source{display:flex;align-items:center;gap:6px;flex-wrap:wrap;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:17px}",
			".scc_metaStrong{color:var(--dsw-alias-label-secondary);font-weight:500}",
			".scc_sep{color:var(--dsw-alias-label-dimmed)}",
			".scc_sourceName{color:var(--dsw-alias-label-primary);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:520px}",
			".scc_detail{border-top:0.5px solid var(--dsw-alias-border-l1);padding-top:10px;display:flex;flex-direction:column;gap:9px;cursor:default}",
			".scc_detailTitle{font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary)}",
			".scc_history{display:flex;flex-direction:column;gap:7px}",
			".scc_historyRow{display:grid;grid-template-columns:minmax(155px,auto) minmax(155px,auto) minmax(180px,1fr) auto;gap:8px;align-items:start;font-size:12px;line-height:17px;color:var(--dsw-alias-label-tertiary)}",
			".scc_historyPrompt{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;white-space:pre-wrap}",
			".scc_historyId{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--dsw-alias-label-tertiary);font-size:11px;overflow-wrap:anywhere}",
			".scc_historyNote{font-size:12px;color:var(--dsw-alias-label-tertiary)}",
			".scc_empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:40px 24px;text-align:center}",
			".scc_emptyIcon{color:var(--dsw-alias-label-tertiary);display:inline-flex}",
			".scc_emptyTitle{font-size:14px;font-weight:600;color:var(--dsw-alias-label-secondary);line-height:20px}",
			".scc_emptyHint{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:18px;max-width:500px;overflow-wrap:anywhere}",
			".scc_sidebarGlyph{display:inline-flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);transition:color 120ms ease}",
			".scc_sidebarGlyph.scc_sidebarNew{color:var(--dsw-alias-state-business-primary)}",
			".scc_sidebarGlyph.scc_sidebarWarn{color:var(--dsw-alias-state-warn-primary)}",
			"button:has(.scc_sidebarGlyph[data-compact='false'][data-has-count='true']){position:relative;padding-right:68px}",
			".scc_sidebarCount{position:absolute;right:8px;top:50%;transform:translateY(-50%);min-width:50px;text-align:right;color:var(--dsw-alias-label-tertiary);font-size:12px;font-weight:500;line-height:18px;font-variant-numeric:tabular-nums;pointer-events:none}",
			".scc_sidebarCountNew{color:var(--dsw-alias-state-business-primary);font-weight:600}",
			".scc_sidebarCountWarn{color:var(--dsw-alias-state-warn-primary);font-weight:600}",
			".scc_sidebarCountSep{color:var(--dsw-alias-label-dimmed);font-weight:400;margin:0 1px}",
			".scc_sidebarDot{position:absolute;left:21px;top:6px;width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px var(--dsw-specific-sidebar,var(--dsw-specific-page,#111));pointer-events:none}",
			".scc_sidebarWarn .scc_sidebarDot{background:var(--dsw-alias-state-warn-primary)}",
			".scc_root{position:relative}",
			".scc_hasInlineDetail>.scc_header,.scc_hasInlineDetail>.scc_toolbar,.scc_hasInlineDetail>.scc_banner,.scc_hasInlineDetail>.scc_body{margin-right:min(520px,42vw)}",
			".scc_inlineDetail{position:absolute;top:0;right:0;bottom:0;width:min(520px,42vw);box-sizing:border-box;border-left:0.5px solid var(--dsw-alias-border-l1);background:var(--dsw-specific-page,var(--dsw-alias-bg-base,#111));display:flex;flex-direction:column;z-index:2}",
			".scc_nativeDetailHost{overflow:hidden;padding:0}",
			".scc_nativeDetailHost>[data-testid='task-manager-page']{display:flex!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;background:inherit!important}",
			".scc_nativeDetailHost>[data-testid='task-manager-page']>:first-child{display:none!important}",
			".scc_nativeDetailHost>[data-testid='task-manager-page']>aside{display:flex!important;flex:1 1 100%!important;width:100%!important;max-width:none!important;min-width:0!important;border-left:0!important}",
			".scc_detailBar{flex:none;display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:0.5px solid var(--dsw-alias-border-l1)}",
			".scc_detailTabs{display:flex;align-items:center;gap:4px;min-width:0}",
			".scc_detailTab{border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:13px;padding:7px 9px;border-bottom:2px solid transparent;cursor:pointer}",
			".scc_detailTabActive{color:var(--dsw-alias-label-primary);border-bottom-color:var(--dsw-alias-interactive-primary)}",
			".scc_detailBarSpacer{flex:1}",
			".scc_detailScroll{flex:1;min-height:0;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:14px}",
			".scc_detailHeading{font-size:18px;font-weight:650;line-height:24px;color:var(--dsw-alias-label-primary);margin:0}",
			".scc_detailNext{font-size:12px;color:var(--dsw-alias-label-tertiary);line-height:18px}",
			".scc_editorText,.scc_editorTextarea,.scc_editorSelect{box-sizing:border-box;width:100%;border:0.5px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base,transparent);color:var(--dsw-alias-label-primary);font:inherit;padding:8px 10px;outline:none}",
			".scc_editorTextarea{min-height:88px;resize:vertical;line-height:19px}",
			".scc_editorText:focus,.scc_editorTextarea:focus,.scc_editorSelect:focus{border-color:var(--dsw-alias-focus-primary,var(--dsw-alias-interactive-primary))}",
			".scc_editorCard{border:0.5px solid var(--dsw-alias-border-l1);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:10px}",
			".scc_editorCardTitle{font-size:13px;font-weight:600;color:var(--dsw-alias-label-secondary)}",
			".scc_editorRow{display:grid;grid-template-columns:120px minmax(0,1fr);gap:10px;align-items:center}",
			".scc_editorLabel{font-size:12px;color:var(--dsw-alias-label-tertiary)}",
			".scc_editorPair{display:grid;grid-template-columns:minmax(0,1fr) minmax(110px,.55fr);gap:8px}",
			".scc_weekdays{display:flex;gap:5px;flex-wrap:wrap}",
			".scc_weekday{min-width:34px;border:0.5px solid var(--dsw-alias-border-l1);border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);padding:5px 8px;cursor:pointer}",
			".scc_weekdayActive{border-color:var(--dsw-alias-interactive-primary);background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent));color:var(--dsw-alias-label-primary)}",
			".scc_editorHint{font-size:12px;color:var(--dsw-alias-label-tertiary);line-height:17px}",
			".scc_editorError{font-size:12px;color:var(--dsw-alias-state-danger-label,var(--dsw-alias-state-warn-label));line-height:17px}",
			".scc_saveBar{flex:none;display:flex;align-items:center;gap:8px;padding:10px 12px;border-top:0.5px solid var(--dsw-alias-border-l1);background:var(--dsw-specific-page,var(--dsw-alias-bg-base,#111))}",
			".scc_saveNotice{font-size:12px;color:var(--dsw-alias-label-tertiary);margin-right:auto}",
			".scc_readonly{font-size:13px;color:var(--dsw-alias-label-secondary);line-height:19px;white-space:pre-wrap;overflow-wrap:anywhere}",
			".scc_selectedRow{border-color:var(--dsw-alias-interactive-primary);background:var(--dsw-alias-interactive-bg-selected,var(--dsw-alias-interactive-bg-hover,transparent))}",
			".scc_searchWrap{position:relative}",
			".scc_searchWrap .scc_searchNative{padding-right:38px}",
			".scc_searchClear{position:absolute!important;right:5px;top:50%;transform:translateY(-50%);width:28px!important;height:28px!important;min-width:28px!important;padding:0!important}",
			"@media(max-width:900px){.scc_hasInlineDetail>.scc_header,.scc_hasInlineDetail>.scc_toolbar,.scc_hasInlineDetail>.scc_banner,.scc_hasInlineDetail>.scc_body{margin-right:0}.scc_inlineDetail{width:100%;left:0}.scc_editorRow{grid-template-columns:1fr}}",
			"@media(max-width:760px){.scc_historyRow{grid-template-columns:1fr}.scc_header{padding-left:12px;padding-right:12px}}"
		].join("");

		const cssId = PACKAGE + "/client.css";
		if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + cssId + '"]') === null) {
			const style = document.createElement("style");
			style.dataset.plugin = PACKAGE;
			style.dataset.pluginCss = cssId;
			style.textContent = css;
			document.head.appendChild(style);
		}


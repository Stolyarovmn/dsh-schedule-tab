/**
 * Host half of the DSH 0.1.7-rc.2 Schedule Control Center.
 *
 * Native Schedule activation is declarative in cordis.patch.yml. Keeping this
 * entry side-effect free avoids runtime loader mutation and dependency cycles.
 */
export const inject = [];

export function apply() {
	// The browser half owns the control-center UI. The bundle patch enables the
	// native rc2 time-context, schedule, and ui-schedule rows before boot.
}

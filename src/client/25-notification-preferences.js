		const NOTIFICATION_PREFERENCES_STORAGE_KEY = PACKAGE + "/notification-preferences-v1";
		const DEFAULT_NOTIFICATION_PREFERENCES = Object.freeze({
			popup: true,
			newTasks: true,
			newDeliveries: true
		});

		function normalizeNotificationPreferences(value) {
			return {
				popup: value?.popup !== false,
				newTasks: value?.newTasks !== false,
				newDeliveries: value?.newDeliveries !== false
			};
		}

		function readNotificationPreferences() {
			try {
				const raw = window.localStorage?.getItem?.(NOTIFICATION_PREFERENCES_STORAGE_KEY);
				if (raw == null) return { ...DEFAULT_NOTIFICATION_PREFERENCES };
				return normalizeNotificationPreferences(JSON.parse(raw));
			} catch {
				return { ...DEFAULT_NOTIFICATION_PREFERENCES };
			}
		}

		let notificationPreferencesSnapshot = readNotificationPreferences();
		const notificationPreferencesListeners = new Set();
		const notificationPreferencesSource = {
			getSnapshot: () => notificationPreferencesSnapshot,
			subscribe(listener) {
				notificationPreferencesListeners.add(listener);
				return () => { notificationPreferencesListeners.delete(listener); };
			}
		};

		function publishNotificationPreferences(next) {
			notificationPreferencesSnapshot = normalizeNotificationPreferences(next);
			try {
				window.localStorage?.setItem?.(
					NOTIFICATION_PREFERENCES_STORAGE_KEY,
					JSON.stringify(notificationPreferencesSnapshot)
				);
			} catch {}
			for (const listener of [...notificationPreferencesListeners]) listener();
		}

		function setNotificationPreference(key, enabled) {
			if (!Object.hasOwn(DEFAULT_NOTIFICATION_PREFERENCES, key)) return;
			if (notificationPreferencesSnapshot[key] === enabled) return;
			publishNotificationPreferences({ ...notificationPreferencesSnapshot, [key]: enabled === true });
		}

		function startNotificationPreferencesStorageSync() {
			if (typeof window === "undefined" || typeof window.addEventListener !== "function") return () => {};
			const onStorage = (event) => {
				if (event.key !== NOTIFICATION_PREFERENCES_STORAGE_KEY) return;
				const next = readNotificationPreferences();
				if (
					next.popup === notificationPreferencesSnapshot.popup
					&& next.newTasks === notificationPreferencesSnapshot.newTasks
					&& next.newDeliveries === notificationPreferencesSnapshot.newDeliveries
				) return;
				notificationPreferencesSnapshot = next;
				for (const listener of [...notificationPreferencesListeners]) listener();
			};
			window.addEventListener("storage", onStorage);
			return () => window.removeEventListener("storage", onStorage);
		}

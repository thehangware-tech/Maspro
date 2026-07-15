import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NotificationPreferences {
  orderUpdates: boolean;
  promotions: boolean;
  priceDropAlerts: boolean;
  flashSaleAlerts: boolean;
}

interface NotificationState {
  pushToken: string | null;
  permissionStatus: "undetermined" | "granted" | "denied";
  preferences: NotificationPreferences;

  setPushToken: (token: string) => void;
  setPermissionStatus: (status: NotificationState["permissionStatus"]) => void;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      pushToken: null,
      permissionStatus: "undetermined",
      preferences: {
        orderUpdates: true,
        promotions: true,
        priceDropAlerts: true,
        flashSaleAlerts: true,
      },

      setPushToken: (token) => set({ pushToken: token }),
      setPermissionStatus: (status) => set({ permissionStatus: status }),
      updatePreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
    }),
    {
      name: "maspro-notifications-v1",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

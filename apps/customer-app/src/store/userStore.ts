import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  type: "home" | "work" | "other";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  dob?: string;
  gender?: string;
  memberSince?: string;
  favoriteSports: string[];
  addresses: Address[];
}

interface UserState {
  isAuthenticated: boolean;
  profile: UserProfile | null;

  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  clearProfile: () => void;
  setAuthenticated: (value: boolean) => void;

  addAddress: (address: Address) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => Address | undefined;
}

const EMPTY_PROFILE: UserProfile = {
  id: "guest",
  name: "Guest User",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  memberSince: new Date().toISOString(),
  favoriteSports: [],
  addresses: [],
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        profile: EMPTY_PROFILE,

        setProfile: (profile) => set({ profile, isAuthenticated: true }),
        updateProfile: (updates) =>
          set((state) => ({
            profile: state.profile ? { ...state.profile, ...updates } : null,
          })),
        clearProfile: () => set({ profile: null, isAuthenticated: false }),
        setAuthenticated: (value) => set({ isAuthenticated: value }),

        addAddress: (address) =>
          set((state) => {
            if (!state.profile) return {};
            const newAddresses = address.isDefault
              ? state.profile.addresses.map((a) => ({ ...a, isDefault: false }))
              : state.profile.addresses;
            return {
              profile: {
                ...state.profile,
                addresses: [...newAddresses, address],
              },
            };
          }),

        updateAddress: (id, updates) =>
          set((state) => {
            if (!state.profile) return {};
            return {
              profile: {
                ...state.profile,
                addresses: state.profile.addresses.map((a) =>
                  a.id === id ? { ...a, ...updates } : a,
                ),
              },
            };
          }),

        deleteAddress: (id) =>
          set((state) => {
            if (!state.profile) return {};
            const remaining = state.profile.addresses.filter(
              (a) => a.id !== id,
            );
            // If we deleted the default, promote the first remaining address
            const hasDefault = remaining.some((a) => a.isDefault);
            if (!hasDefault && remaining.length > 0) {
              remaining[0].isDefault = true;
            }
            return { profile: { ...state.profile, addresses: remaining } };
          }),

        setDefaultAddress: (id) =>
          set((state) => {
            if (!state.profile) return {};
            return {
              profile: {
                ...state.profile,
                addresses: state.profile.addresses.map((a) => ({
                  ...a,
                  isDefault: a.id === id,
                })),
              },
            };
          }),

        getDefaultAddress: () => {
          const profile = get().profile;
          if (!profile) return undefined;
          return (
            profile.addresses.find((a) => a.isDefault) ?? profile.addresses[0]
          );
        },
      }),
      {
        name: "maspro-user-v1",
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
    { name: "UserStore", enabled: __DEV__ },
  ),
);

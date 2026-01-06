import { create } from "zustand";

type Store = {
  loadingText: string;
  name: string;
  setStore: (key: keyof Store, value: string) => void;
  resetStore: () => void;
};

export const useStore = create<Store>((set) => ({
  loadingText: "",
  name: "",
  setStore: (key: keyof Store, value: string) => set(() => ({ [key]: value })),
  resetStore: () => set(() => ({ name: "" })),
}));

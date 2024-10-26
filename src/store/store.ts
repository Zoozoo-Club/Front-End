import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  IAuthStore,
  IBear,
  ICommonModalStore,
  ILoginModalStore,
} from "./types";

// set: 함수형으로 사용하면 이전값을 받아 사용, 인자로넣으면 해당값을 덮어쓰기
export const useBearStore = create<IBear>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: number) => set({ bears: newBears }),
}));

export const useCommonModalStore = create<ICommonModalStore>((set) => ({
  modal: {
    show: false,
    title: "",
    message: "",
  },
  onClick: () => {},
  openModal: (title: string, message: string, onClick: () => void) =>
    set({ modal: { show: true, title, message }, onClick }),
  closeModal: () => set({ modal: { show: false, title: "", message: "" } }),
}));

export const useLoginModalStore = create<ILoginModalStore>((set) => ({
  isOpen: false,
  closeModal: () => set({ isOpen: false }),
  openModal: () => set({ isOpen: true }),
}));
// Zustand store with persist middleware to save to localStorage
export const useAuthStore = create(
  persist<IAuthStore>(
    (set) => ({
      nickname: null,
      token: null,
      login: (nickname: string, token: string) => set({ nickname, token }),
      logout: () => set({ nickname: null, token: null }),
    }),
    {
      name: "user-storage", // 로컬스토리지에 저장할 이름 (키)
      getStorage: () => localStorage, // 로컬스토리지를 사용
    }
  )
);

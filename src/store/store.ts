import { create } from "zustand";
import { IBear, ICommonModalStore } from "./types";

// example
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

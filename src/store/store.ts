import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  IAuthStore,
  IBear,
  ICommonModalStore,
  ILoginModalStore,
} from './types';
// 요일별 메시지 정의
const dailyMessages: Record<string, string> = {
  월: '월! 월스트릿 프로처럼 신투와 함께해요!',
  화: '화! 화제의 종목을 신투에서 찾아봐요!',
  수: '수! 수익을 위해 공부는 신투에서!',
  목: '목! 목표는 신투와 함께 세워봐요!',
  금: '금! 금방 이뤄질거에요, 신투와 함께라면!',
  토: '주말에도 신한투자증권과 함께해요!',
  일: '주말에도 신한투자증권과 함께해요!',
};

// 요일에 따른 메시지 가져오기 함수
const getDailyMessage = () => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const today = new Date().getDay(); // 0: 일요일, 1: 월요일, ... , 6: 토요일
  return dailyMessages[daysOfWeek[today]]; // 오늘의 요일에 맞는 메시지 반환
};

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
    title: '',
    message: '',
  },
  onClick: () => {},
  openModal: (title: string, message: string, onClick: () => void) =>
    set({ modal: { show: true, title, message }, onClick }),
  closeModal: () => set({ modal: { show: false, title: '', message: '' } }),
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
      login: (nickname: string, token: string) => {
        set({ nickname, token });
        useLoginModalStore.getState().closeModal();
        useCommonModalStore
          .getState()
          .openModal('로그인 성공', getDailyMessage(), () =>
            useCommonModalStore.getState().closeModal()
          );
      },
      logout: () => set({ nickname: null, token: null }),
    }),
    {
      name: 'user-storage', // 로컬스토리지에 저장할 이름 (키)
      getStorage: () => localStorage, // 로컬스토리지를 사용
    }
  )
);

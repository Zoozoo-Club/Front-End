// src/hooks/useRequireAuth.ts
import { useAuthStore } from '@/store/store';
import { useLoginModalStore } from '@/store/store';

export const useAuthCheck = () => {
  const token = useAuthStore((state) => state.token);
  const openLoginModal = useLoginModalStore((state) => state.openModal);

  const checkAuth = (callback: () => void) => {
    if (!token) {
      openLoginModal();
      return;
    }
    callback();
  };

  return { checkAuth };
};

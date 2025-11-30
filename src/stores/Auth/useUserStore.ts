import type { UserState } from '@/types/store/UserStore';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create<UserState>()(
  persist<UserState>(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
);

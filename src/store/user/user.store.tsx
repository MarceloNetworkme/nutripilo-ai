import { create } from 'zustand';
import type { UserResponse } from '../../infra/cosmos/users/response/user-response.model';

interface UserStore {
    user?: UserResponse;
    isOnboarded: boolean;
    setUser: (user: UserResponse) => void;
    setIsOnboarded: () => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: undefined,
    isOnboarded: false,
    setUser: (user: UserResponse) => set({ user }),
    setIsOnboarded: () => set({ isOnboarded: true }),
}));

export default useUserStore;

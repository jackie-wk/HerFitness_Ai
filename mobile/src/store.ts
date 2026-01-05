import { create } from 'zustand';
import { UserProfile, WellnessPlan, UserState } from './types';

interface AppStore {
  profile: UserProfile | null;
  plan: WellnessPlan | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile) => void;
  setPlan: (plan: WellnessPlan) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  profile: null,
  plan: null,
  isLoading: false,
  error: null,
  setProfile: (profile) => set({ profile }),
  setPlan: (plan) => set({ plan }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({
    profile: null,
    plan: null,
    isLoading: false,
    error: null,
  }),
}));

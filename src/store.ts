import { create } from 'zustand';

interface AppState {
  syncProgress: number;
  setSyncProgress: (progress: number) => void;
  oxygenLevel: number;
  setOxygenLevel: (level: number) => void;
  soulId: string | null;
  setSoulId: (id: string) => void;
  isBreathing: boolean;
  setIsBreathing: (breathing: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  syncProgress: 0,
  setSyncProgress: (progress) => set({ syncProgress: progress }),
  oxygenLevel: 100,
  setOxygenLevel: (level) => set({ oxygenLevel: Math.max(0, Math.min(100, level)) }),
  soulId: null,
  setSoulId: (id) => set({ soulId: id }),
  isBreathing: false,
  setIsBreathing: (breathing) => set({ isBreathing: breathing }),
}));

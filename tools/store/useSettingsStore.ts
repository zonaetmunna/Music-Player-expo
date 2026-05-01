import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeMode = 'system' | 'light' | 'dark';
export type AppLanguage = 'en' | 'bn';

type SettingsStore = {
  themeMode: ThemeMode;
  language: AppLanguage;
  setThemeMode: (mode: ThemeMode) => void;
  setLanguage: (language: AppLanguage) => void;
  resolvedScheme: () => 'light' | 'dark';
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      themeMode: 'system',
      language: 'en',
      setThemeMode: (mode) => set({ themeMode: mode }),
      setLanguage: (language) => set({ language }),
      resolvedScheme: () => {
        const mode = get().themeMode;
        if (mode === 'system') {
          return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
        }
        return mode;
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        language: state.language,
      }),
    },
  ),
);

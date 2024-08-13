import { SettingsProps } from '@/types/settings.type';
import { create } from 'zustand';

const useSettings = create<({
  settings: SettingsProps;
  setSettings: (settings: SettingsProps) => void;
})>((set) => ({
  settings: {
    id: 1,
    promotionSign: false,
    promotionSignText: "",
    showUnavailableProduct: false
  },
  setSettings: (settingsData: SettingsProps) =>
    set(() => ({
      settings: settingsData
    }))
}));

export default useSettings;
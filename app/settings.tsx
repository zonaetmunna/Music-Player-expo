import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useT } from '@/constants/i18n';
import { useColors } from '@/constants/tokens';
import type { AppLanguage, ThemeMode } from '@/tools/store/useSettingsStore';
import { useSettingsStore } from '@/tools/store/useSettingsStore';

type ChoiceButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

const ChoiceButton = ({ label, active, onPress }: ChoiceButtonProps) => (
  <Pressable
    onPress={onPress}
    style={{
      borderRadius: 14,
      borderWidth: 1,
      borderColor: active ? '#fc3c44' : 'rgba(255,255,255,0.15)',
      backgroundColor: active ? 'rgba(252,60,68,0.18)' : '#111',
      paddingVertical: 12,
      paddingHorizontal: 14,
      marginTop: 10,
    }}
  >
    <Text style={{ color: '#fff', fontWeight: '600' }}>{label}</Text>
  </Pressable>
);

const SettingsScreen = () => {
  const t = useT();
  const colors = useColors();
  const themeMode = useSettingsStore((s) => s.themeMode);
  const setThemeMode = useSettingsStore((s) => s.setThemeMode);
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);

  const setTheme = (value: ThemeMode) => setThemeMode(value);
  const setLang = (value: AppLanguage) => setLanguage(value);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={['top']}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: 40,
        }}
      >
        <View className="mb-5 flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="size-10 items-center justify-center rounded-full border border-white/15 bg-[#111]"
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </Pressable>
          <Text style={{ color: colors.text, fontSize: 20, fontWeight: '700' }}>
            {t('settings')}
          </Text>
          <View className="size-10" />
        </View>

        <View className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-4">
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>
            {t('theme')}
          </Text>
          <ChoiceButton
            label={t('system')}
            active={themeMode === 'system'}
            onPress={() => setTheme('system')}
          />
          <ChoiceButton
            label={t('light')}
            active={themeMode === 'light'}
            onPress={() => setTheme('light')}
          />
          <ChoiceButton
            label={t('dark')}
            active={themeMode === 'dark'}
            onPress={() => setTheme('dark')}
          />
        </View>

        <View className="mt-4 rounded-2xl border border-white/10 bg-[#0f0f0f] p-4">
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>
            {t('language')}
          </Text>
          <ChoiceButton
            label={t('english')}
            active={language === 'en'}
            onPress={() => setLang('en')}
          />
          <ChoiceButton
            label={t('bangla')}
            active={language === 'bn'}
            onPress={() => setLang('bn')}
          />
        </View>

        <Text className="mt-4 text-center text-sm text-neutral-400">
          {t('appliedInstantly')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

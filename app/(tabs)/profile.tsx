import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useT } from '@/constants/i18n';
import { useColors } from '@/constants/tokens';
import { usePlayerStore, usePlaylistStore } from '@/tools/store/usePlayerStore';

const ProfileScreen = () => {
  const files = usePlayerStore((s) => s.files);
  const playlists = usePlaylistStore((s) => s.playlists);
  const favorites = usePlaylistStore((s) => s.favorites);
  const tabBarHeight = useBottomTabBarHeight();
  const t = useT();
  const colors = useColors();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={['top']}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: tabBarHeight + 120,
        }}
      >
        <LinearGradient
          colors={['#2a0a3a', '#111', '#000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 24, padding: 20 }}
        >
          <View className="items-center">
            <View className="size-24 items-center justify-center rounded-full border border-white/15 bg-white/10">
              <Ionicons name="person" size={42} color="#fff" />
            </View>
            <Text className="mt-4 text-2xl font-bold text-white">
              {t('musicLover')}
            </Text>
            <Text className="mt-1 text-sm text-neutral-300">
              {t('keepVibe')}
            </Text>
          </View>
        </LinearGradient>

        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-2xl border border-white/10 bg-[#111] p-4">
            <Text className="text-xs text-neutral-400">{t('tracks')}</Text>
            <Text className="mt-2 text-2xl font-bold text-white">
              {files.length}
            </Text>
          </View>
          <View className="flex-1 rounded-2xl border border-white/10 bg-[#111] p-4">
            <Text className="text-xs text-neutral-400">{t('favorites')}</Text>
            <Text className="mt-2 text-2xl font-bold text-white">
              {favorites.length}
            </Text>
          </View>
          <View className="flex-1 rounded-2xl border border-white/10 bg-[#111] p-4">
            <Text className="text-xs text-neutral-400">{t('playlists')}</Text>
            <Text className="mt-2 text-2xl font-bold text-white">
              {playlists.length}
            </Text>
          </View>
        </View>

        <View className="mt-5 rounded-2xl border border-white/10 bg-[#111] p-4">
          <Text className="text-base font-semibold text-white">
            {t('activity')}
          </Text>
          <View className="mt-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Ionicons name="time-outline" size={18} color="#9ca3af" />
              <Text className="text-neutral-300">{t('listeningStreak')}</Text>
            </View>
            <Text className="font-semibold text-white">{t('sevenDays')}</Text>
          </View>
          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons
                name="music-note-outline"
                size={18}
                color="#9ca3af"
              />
              <Text className="text-neutral-300">{t('mostPlayedGenre')}</Text>
            </View>
            <Text className="font-semibold text-white">{t('pop')}</Text>
          </View>
          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Ionicons name="sparkles-outline" size={18} color="#9ca3af" />
              <Text className="text-neutral-300">{t('mood')}</Text>
            </View>
            <Text className="font-semibold text-white">{t('chill')}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/settings')}
          className="mt-5 flex-row items-center justify-between rounded-2xl border border-white/10 bg-[#111] p-4"
        >
          <Text className="text-base font-semibold text-white">
            {t('openSettings')}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

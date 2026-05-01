import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import TracksList from '@/components/TracksList';
import { useT } from '@/constants/i18n';
import { useColors } from '@/constants/tokens';
import { usePlayerStore, usePlaylistStore } from '@/tools/store/usePlayerStore';

const FavoritesScreen = () => {
  const files = usePlayerStore((s) => s.files);

  const favorites = usePlaylistStore((s) => s.favorites);

  const favoriteIds = favorites.map((item) => item.id);

  const favoriteSongs = files.filter((song) => favoriteIds.includes(song.id));

  const tabBarHeight = useBottomTabBarHeight();
  const t = useT();
  const colors = useColors();

  if (favoriteSongs.length === 0) {
    return (
      <View
        style={{
          paddingBottom: tabBarHeight,
          backgroundColor: colors.background,
        }}
        className="flex-1 items-center justify-center bg-black px-6"
      >
        <Ionicons name="heart-outline" size={92} color="#666" />
        <Text className="text-neutral-400 text-xl font-semibold mt-4">
          {t('noFavoritesYet')}
        </Text>
        <Text className="text-neutral-500 text-base mt-2 text-center">
          {t('tapHeartToAdd')}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="pb-40 size-full">
        <TracksList
          tracks={favoriteSongs}
          contentContainerStyle={{
            paddingBottom: tabBarHeight,
          }}
        />
      </View>
    </View>
  );
};

export default FavoritesScreen;

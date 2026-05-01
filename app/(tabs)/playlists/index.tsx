import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import LoadingScreen from '@/components/LoadingScreen';
import PlaylistsList from '@/components/PlaylistsList';
import { useT } from '@/constants/i18n';
import { useColors } from '@/constants/tokens';
import { usePlaylistStore } from '@/tools/store/usePlayerStore';

const PlaylistScreen = () => {
  const router = useRouter();

  const loadPlaylists = usePlaylistStore((s) => s.loadPlaylists);
  const isLoading = usePlaylistStore((s) => s.isLoading);
  const setIsLoading = usePlaylistStore((s) => s.setIsLoading);

  useFocusEffect(
    useCallback(() => {
      const fetchPlaylists = async () => {
        try {
          setIsLoading(true);
          await loadPlaylists('all');
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPlaylists();
    }, [loadPlaylists, setIsLoading]),
  );

  const getPlaylists = usePlaylistStore((s) => s.playlists);
  // console.log(getPlaylists);
  // console.log("getPlaylists", getPlaylists);

  const [search, setSearch] = useState('');
  const t = useT();
  const colors = useColors();

  const filteredPlaylists = useMemo(() => {
    if (search.trim() === '')
      return getPlaylists.map((s) =>
        s.id === 'most-played'
          ? {
              ...s,
              coverArt: Image.resolveAssetSource(
                require('@/assets/images/most-played.png'),
              ).uri,
            }
          : s.id === 'recent'
            ? {
                ...s,
                coverArt: Image.resolveAssetSource(
                  require('@/assets/images/recent.png'),
                ).uri,
              }
            : s.id === 'downloads'
              ? {
                  ...s,
                  coverArt: Image.resolveAssetSource(
                    require('@/assets/images/download.png'),
                  ).uri,
                }
              : s,
      );
    const lowerSearch = search.toLowerCase();
    return getPlaylists.filter(
      (t) =>
        t?.name?.toLowerCase().includes(lowerSearch) ||
        t?.description?.toLowerCase().includes(lowerSearch),
    );
  }, [getPlaylists, search]);

  const handlePlaylistPress = (playlistId: string) => {
    router.push({
      pathname: '/playlists/[name]',
      params: { name: playlistId },
    });
  };
  const insets = useSafeAreaInsets();

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView
      className="flex-1 px-5"
      style={{
        backgroundColor: colors.background,
        paddingBottom: insets.bottom === 0 ? 10 : insets.bottom - 20,
        elevation: 2,
      }}
    >
      <View className="absolute left-0 right-0 bg-neutral-900 px-4 pb-2 z-10">
        <View className="flex-row items-center w-full bg-neutral-800 rounded-lg px-3">
          <TextInput
            className="text-white text-base flex-1 py-2"
            placeholder={t('searchInPlaylists')}
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity
              className="pl-2 py-2"
              onPress={() => setSearch('')}
            >
              <Ionicons name="close" color="red" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="pl-2 py-2">
              <Ionicons name="search" color="#fff" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <PlaylistsList
        playlists={filteredPlaylists}
        onPlaylistPress={handlePlaylistPress}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default PlaylistScreen;

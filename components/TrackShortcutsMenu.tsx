import { useRouter } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import {
  ActionSheetIOS,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { toast } from 'sonner-native';
import { useT } from '@/constants/i18n';
import { fetchLyrics } from '@/tools/fetchLyrics';
import { usePlayerStore, usePlaylistStore } from '@/tools/store/usePlayerStore';
import type { Song } from '@/types/types';

type TrackShortcutsMenuProps = PropsWithChildren<{
  track: Song;
  isInPlaylist: boolean;
  playlistId?: string;
}>;

const TrackShortcutsMenu = ({
  track,
  children,
  isInPlaylist,
  playlistId,
}: TrackShortcutsMenuProps) => {
  const router = useRouter();
  const toggleFavorite = usePlaylistStore((s) => s.toggleFavorite);
  const removeTrackFromPlaylist = usePlaylistStore(
    (s) => s.removeTrackFromPlaylist,
  );
  const isFavorite = usePlaylistStore((s) => s.isFavorite(track.uri));

  const setLyrics = usePlayerStore((s) => s.setLyrics);
  const t = useT();

  const [visible, setVisible] = useState(false);

  const doToggleFavorite = () => {
    toggleFavorite(track.id || '');
    setVisible(false);
  };

  const doAddToPlaylist = () => {
    setVisible(false);
    router.push({
      pathname: '/(modals)/addToPlaylist',
      params: { trackUri: track.uri },
    });
  };

  const handleActionIndex = (index: number) => {
    if (index === 0) doToggleFavorite();
    else if (index === 1) doAddToPlaylist();
  };

  const removeFromPlaylist = () => {
    if (!playlistId) return;
    removeTrackFromPlaylist(playlistId, track.id || '');
  };

  const goToAlbum = () => {
    if (!track.album) {
      toast.error(t('noAlbumError'));
      return;
    }
    setVisible(false);
    router.navigate({
      pathname: '/album/[name]',
      params: { name: track.album.replaceAll(' ', '+') },
    });
  };

  const goToArtist = () => {
    if (!track.artist) {
      toast.error(t('noArtistError'));
      return;
    }
    setVisible(false);
    router.navigate({
      pathname: '/(tabs)/artists/[name]',
      params: { name: track.artist },
    });
  };

  const openMenu = () => {
    if (Platform.OS === 'ios') {
      const favoriteLabel = isFavorite
        ? t('removeFromFavorites')
        : t('addToFavorites');
      const options = [favoriteLabel, t('addToPlaylist'), t('cancel')];
      const cancelButtonIndex = 2;
      ActionSheetIOS.showActionSheetWithOptions(
        { options, cancelButtonIndex },
        handleActionIndex,
      );
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <Pressable onPress={openMenu}>{children}</Pressable>

      {/* Fancy dark modal menu for Android / Expo Go */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          className="bg-black/60 justify-end size-full"
          onPress={() => setVisible(false)}
        >
          <View
            className="bg-[#1c1c1e] rounded-t-2xl shadow-lg justify-end"
            style={{ justifyContent: 'flex-end', paddingBottom: 20 }}
          >
            <TouchableOpacity
              className="px-5 py-4 border-b border-white/10"
              onPress={() => fetchLyrics(track, setLyrics)}
            >
              <Text className="text-base text-gray-100">
                ⬇ {t('fetchLyrics')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-5 py-4 border-b border-white/10"
              onPress={goToArtist}
            >
              <Text className="text-base text-gray-100">
                🎙 {t('showArtist')}
              </Text>
            </TouchableOpacity>

            {track.album && (
              <TouchableOpacity
                className="px-5 py-4 border-b border-white/10"
                onPress={goToAlbum}
              >
                <Text className="text-base text-gray-100">
                  🎶 {t('showAlbum')}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              className="px-5 py-4 border-b border-white/10"
              onPress={doAddToPlaylist}
            >
              <Text className="text-base text-gray-100">
                ➕ {t('addToPlaylist')}
              </Text>
            </TouchableOpacity>

            {isInPlaylist && (
              <TouchableOpacity
                className="px-5 py-4 border-b border-white/10"
                onPress={removeFromPlaylist}
              >
                <Text className="text-base text-gray-100">
                  ❌ {t('removeFromPlaylist')}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              className="px-5 py-4 border-b border-white/10"
              onPress={doToggleFavorite}
            >
              <Text className="text-base text-gray-100">
                {isFavorite
                  ? `★ ${t('removeFromFavorites')}`
                  : `☆ ${t('addToFavorites')}`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-5 py-4 mt-1 border-t border-white/20"
              onPress={() => setVisible(false)}
            >
              <Text className="text-base text-red-500 font-semibold text-center">
                {t('cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default TrackShortcutsMenu;

import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '@/components/AnimatedButton';
import { useT } from '@/constants/i18n';
import { useColors } from '@/constants/tokens';
import { usePlayerStore } from '@/tools/store/usePlayerStore';
import type { Song } from '@/types/types';

const EditLyricsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const getSongInfo = usePlayerStore((s) => s.getSongInfo);
  const updateLyrics = usePlayerStore((s) => s.setLyrics);
  const t = useT();
  const colors = useColors();

  const [song, setSong] = useState<Song | null>(null);
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const info = await getSongInfo(id);
      setSong(info);
      if (info?.lyrics) setLyrics(info.lyrics);
      setLoading(false);
    })();
  }, [getSongInfo, id]);

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    setLyrics(text);
  };

  const handleSave = async () => {
    if (!song?.id) return;
    await updateLyrics(song.id, lyrics);
    router.back();
  };

  if (loading)
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );

  if (!song)
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-gray-400 text-lg">{t('songNotFound')}</Text>
      </View>
    );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      className="b z-50"
      pointerEvents="box-none"
    >
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-5 pt-3"
        style={{ elevation: 10 }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">{t('editLyrics')}</Text>
        <TouchableOpacity onPress={handleSave}>
          <FontAwesome6 name="check" size={26} color="#22c55e" />
        </TouchableOpacity>
      </View>
      {/* Background blur */}
      {song.coverArt && (
        <Image
          source={{ uri: song.coverArt }}
          blurRadius={30}
          className="absolute w-full h-full"
        />
      )}
      <BlurView intensity={80} tint="dark" className="absolute w-full h-full" />

      <ScrollView
        className="flex-1 mt-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <View className="items-center mt-12">
          {song.coverArt ? (
            <Image
              source={{ uri: song.coverArt }}
              className="w-40 h-40 rounded-2xl shadow-2xl"
            />
          ) : (
            <View className="w-40 h-40 bg-neutral-800 rounded-2xl items-center justify-center">
              <Text className="text-gray-500">🎵</Text>
            </View>
          )}
          <Text className="text-white text-2xl font-bold mt-4">
            {song.title || t('unknownTitle')}
          </Text>
          <Text className="text-gray-400 text-base mt-1">
            {song.artist || t('unknownArtist')}
          </Text>
        </View>

        {/* Lyrics Input */}
        <View className="mx-5 mt-8">
          <BlurView
            intensity={60}
            tint="dark"
            className="rounded-2xl overflow-hidden"
          >
            <TextInput
              multiline
              value={lyrics}
              onChangeText={setLyrics}
              placeholder={t('typeOrPasteLyrics')}
              placeholderTextColor="#888"
              textAlignVertical="top"
              className="text-white text-base p-4 h-[300px]"
            />
          </BlurView>
        </View>

        {/* Buttons */}
        <View className="px-8 space-y-4 gap-y-4 mt-12">
          <AnimatedButton
            color="green"
            label={`💾 ${t('saveLyrics')}`}
            onPress={handleSave}
          />
          <AnimatedButton
            color="cyan"
            label={`📋 ${t('pasteFromClipboard')}`}
            onPress={handlePaste}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditLyricsScreen;

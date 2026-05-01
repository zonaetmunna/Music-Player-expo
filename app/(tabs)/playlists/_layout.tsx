import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useT } from '@/constants/i18n';
import { StackScreenWithSearchBar } from '@/constants/layouts';
import { useColors } from '@/constants/tokens';

const PlaylistsScreenLayout = () => {
  const t = useT();
  const colors = useColors();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...(StackScreenWithSearchBar ?? {}),
            headerTitle: t('playlists'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="[name]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="create"
          options={{
            ...(StackScreenWithSearchBar ?? {}),
            headerTitle: t('createPlaylist'),
            // headerStyle:{s},
            headerTitleStyle: {
              color: colors.text,
              fontSize: 22,
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack>
    </View>
  );
};

export default PlaylistsScreenLayout;

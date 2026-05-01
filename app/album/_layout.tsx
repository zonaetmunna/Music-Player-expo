import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useColors } from '@/constants/tokens';

const PlaylistsScreenLayout = () => {
  const colors = useColors();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack>
        <Stack.Screen
          name="[name]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
};

export default PlaylistsScreenLayout;

import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useColors } from '@/constants/tokens';

const SongInfoLayout = () => {
  const colors = useColors();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack>
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default SongInfoLayout;

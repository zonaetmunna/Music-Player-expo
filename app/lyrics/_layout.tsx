import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useColors } from '@/constants/tokens';

const SongInfoLayout = () => {
  const colors = useColors();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack>
        <Stack.Screen
          name="edit/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="editsynced/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sync/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
};

export default SongInfoLayout;

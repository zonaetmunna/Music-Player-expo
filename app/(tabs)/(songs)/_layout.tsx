import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useT } from '@/constants/i18n';
import { useColors } from '@/constants/tokens';

const SongsScreenLayout = () => {
  const t = useT();
  const colors = useColors();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            // ...StackScreenWithSearchBar,
            headerTitle: t('songs'),
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
};

export default SongsScreenLayout;

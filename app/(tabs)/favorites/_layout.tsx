import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useT } from '@/constants/i18n';
import { StackScreenWithSearchBar } from '@/constants/layouts';
import { useColors } from '@/constants/tokens';

const FavoritesScreenLayout = () => {
  const t = useT();
  const colors = useColors();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...StackScreenWithSearchBar, headerTitle: t('favorites') }}
        />
      </Stack>
    </View>
  );
};

export default FavoritesScreenLayout;

import { router, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import LoadingScreen from '@/components/LoadingScreen';
import { useColors } from '@/constants/tokens';

export default function NotificationRedirect() {
  const pathname = usePathname();
  const colors = useColors();

  useEffect(() => {
    if (pathname !== '/Playing') {
      router.dismissTo('/Playing');
    }
  }, [pathname]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LoadingScreen />
    </View>
  );
}

import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FloatingPlayer from '@/components/FloatingPlayer';
import { useT } from '@/constants/i18n';
import { fontSize, useColors } from '@/constants/tokens';

const TabsNavigation = () => {
  const insets = useSafeAreaInsets();
  const t = useT();
  const colors = useColors();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: '500',
          },
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0,
            paddingTop: 0,
            paddingBottom: insets.bottom, // ✅ keep visible above system nav
            height: 60 + insets.bottom, // ✅ make room for extra padding
            zIndex: 10,
            backgroundColor: colors.background,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={40}
              className="z-10 absolute top-0 bottom-0 left-0 right-0 overflow-hidden rounded-tl-3xl rounded-tr-3xl"
            />
          ),
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            title: t('favorites'),
            tabBarIcon: ({ color }) => (
              <FontAwesome name="heart" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: t('playlists'),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="playlist-play"
                size={28}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(songs)"
          options={{
            title: t('songs'),
            tabBarIcon: ({ color }) => (
              <Ionicons name="musical-notes-sharp" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: t('artists'),
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="users-line" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t('profile'),
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
      <FloatingPlayer />
    </>
  );
};

export default TabsNavigation;

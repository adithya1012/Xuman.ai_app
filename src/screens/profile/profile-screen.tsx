import { router } from 'expo-router';
import { Bell, CalendarClock, Info, Settings } from 'lucide-react-native';
import { useEffect } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, Button, Text } from '@/components/common';
import { MenuItem } from '@/components/profile/menu-item';
import { countUnread, useNotificationsStore } from '@/store/notifications-store';
import { useProfileStore } from '@/store/profile-store';
import { colors } from '@/theme';
import { formatDate } from '@/utils/format';

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const user = useProfileStore((state) => state.user);
  const status = useProfileStore((state) => state.status);
  const loadProfile = useProfileStore((state) => state.loadProfile);
  const notifications = useNotificationsStore((state) => state.notifications);
  const unreadCount = countUnread(notifications);

  useEffect(() => {
    if (useProfileStore.getState().status === 'idle') {
      loadProfile();
    }
  }, [loadProfile]);

  if (status === 'error') {
    return (
      <View className="flex-1 items-center justify-center gap-md bg-background px-2xl">
        <Text variant="heading">Something went wrong</Text>
        <Text variant="caption" className="text-center">
          We could not load your profile. Please try again.
        </Text>
        <Button label="Retry" variant="secondary" onPress={loadProfile} />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={colors.accent.DEFAULT} />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top + 12 }}
      contentContainerClassName="gap-xl px-lg pb-3xl"
      showsVerticalScrollIndicator={false}
    >
      <Text variant="title">Profile</Text>

      <View className="items-center gap-md">
        <Avatar name={user.name} uri={user.avatarUrl} size="xl" />
        <View className="items-center gap-2xs">
          <Text variant="title">{user.name}</Text>
          <Text variant="caption">{user.email}</Text>
          <Text variant="small">Member since {formatDate(user.joinedAt)}</Text>
        </View>
      </View>

      <View className="gap-md">
        <MenuItem
          icon={<CalendarClock size={18} color={colors.foreground.secondary} />}
          label="My Meetings"
          caption="Upcoming and completed calls"
          onPress={() => router.push('/(tabs)/meetings')}
        />
        <MenuItem
          icon={<Bell size={18} color={colors.foreground.secondary} />}
          label="Notifications"
          caption={unreadCount > 0 ? `${unreadCount} unread` : 'You are all caught up'}
          onPress={() => router.push('/notifications')}
        />
        <MenuItem
          icon={<Settings size={18} color={colors.foreground.secondary} />}
          label="Settings"
          caption="Preferences and playback"
          onPress={() => router.push('/settings')}
        />
        <MenuItem
          icon={<Info size={18} color={colors.foreground.secondary} />}
          label="About"
          caption="Version and app info"
          onPress={() => router.push('/about')}
        />
      </View>
    </ScrollView>
  );
}

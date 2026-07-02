import { router } from 'expo-router';
import { Bell } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/common';
import { countUnread, useNotificationsStore } from '@/store/notifications-store';
import { colors } from '@/theme';

export function NotificationBell() {
  const notifications = useNotificationsStore((state) => state.notifications);
  const loadNotifications = useNotificationsStore((state) => state.loadNotifications);
  const unreadCount = countUnread(notifications);

  // Load once so the badge is accurate before the list screen is ever opened.
  useEffect(() => {
    if (useNotificationsStore.getState().status === 'idle') {
      loadNotifications();
    }
  }, [loadNotifications]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'
      }
      onPress={() => router.push('/notifications')}
      className="h-10 w-10 items-center justify-center rounded-full bg-background-elevated"
    >
      <Bell size={20} color={colors.foreground.DEFAULT} />
      {unreadCount > 0 && (
        <View className="absolute -right-0.5 -top-0.5 h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1">
          <Text variant="small" className="text-foreground">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

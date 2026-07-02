import { router } from 'expo-router';
import { BellOff, ChevronLeft } from 'lucide-react-native';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Text } from '@/components/common';
import { NotificationCard } from '@/components/notifications/notification-card';
import { ComingSoon } from '@/components/shared/coming-soon';
import { countUnread, useNotificationsStore } from '@/store/notifications-store';
import { colors } from '@/theme';

export function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const notifications = useNotificationsStore((state) => state.notifications);
  const status = useNotificationsStore((state) => state.status);
  const loadNotifications = useNotificationsStore((state) => state.loadNotifications);
  const markAllRead = useNotificationsStore((state) => state.markAllRead);

  const unreadCount = countUnread(notifications);

  useEffect(() => {
    if (useNotificationsStore.getState().status === 'idle') {
      loadNotifications();
    }
  }, [loadNotifications]);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center gap-md px-lg py-sm">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-background-elevated"
        >
          <ChevronLeft size={22} color={colors.foreground.DEFAULT} />
        </Pressable>
        <Text variant="heading" className="flex-1">
          Notifications
        </Text>
        {unreadCount > 0 && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Mark all as read"
            onPress={markAllRead}
          >
            <Text variant="caption" className="text-accent">
              Mark all read
            </Text>
          </Pressable>
        )}
      </View>

      {status === 'error' ? (
        <View className="flex-1 items-center justify-center gap-md px-2xl">
          <Text variant="heading">Something went wrong</Text>
          <Text variant="caption" className="text-center">
            We could not load your notifications. Please try again.
          </Text>
          <Button label="Retry" variant="secondary" onPress={loadNotifications} />
        </View>
      ) : status !== 'ready' ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.accent.DEFAULT} />
        </View>
      ) : notifications.length === 0 ? (
        <ComingSoon
          title="No notifications"
          description="Booking updates and creator activity will show up here."
          icon={<BellOff size={28} color={colors.foreground.secondary} />}
        />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(notification) => notification.id}
          renderItem={({ item }) => <NotificationCard notification={item} />}
          contentContainerClassName="gap-md p-lg"
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

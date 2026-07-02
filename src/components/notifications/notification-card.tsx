import { router } from 'expo-router';
import { BellRing, CalendarCheck, Info, Video } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/common';
import { useNotificationsStore } from '@/store/notifications-store';
import { colors } from '@/theme';
import { type AppNotification, type NotificationType } from '@/types';
import { cn } from '@/utils/cn';
import { formatRelativeTime } from '@/utils/format';

const typeIcons: Record<NotificationType, typeof BellRing> = {
  booking: CalendarCheck,
  reminder: BellRing,
  creator: Video,
  system: Info,
};

export interface NotificationCardProps {
  notification: AppNotification;
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const markRead = useNotificationsStore((state) => state.markRead);
  const Icon = typeIcons[notification.type];

  const onPress = () => {
    markRead(notification.id);
    if (notification.creatorId) {
      router.push({ pathname: '/creator/[id]', params: { id: notification.creatorId } });
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={notification.title}
      onPress={onPress}
      className={cn(
        'flex-row gap-md rounded-lg border p-lg active:bg-background-elevated',
        notification.read
          ? 'border-border bg-background-subtle'
          : 'border-accent/40 bg-accent-soft/40',
      )}
    >
      <View className="h-10 w-10 items-center justify-center rounded-full bg-background-elevated">
        <Icon size={18} color={notification.read ? colors.foreground.secondary : colors.accent.DEFAULT} />
      </View>
      <View className="flex-1 gap-2xs">
        <View className="flex-row items-center gap-sm">
          <Text variant="body" className="flex-1 font-semibold">
            {notification.title}
          </Text>
          {!notification.read && <View className="h-2 w-2 rounded-full bg-accent" />}
        </View>
        <Text variant="caption">{notification.body}</Text>
        <Text variant="small">{formatRelativeTime(notification.createdAt)}</Text>
      </View>
    </Pressable>
  );
}

import { router } from 'expo-router';
import { CalendarClock, ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Avatar, Badge, Text } from '@/components/common';
import { colors } from '@/theme';
import { type Meeting } from '@/types';
import { formatShortDate } from '@/utils/date';

export interface MeetingCardProps {
  meeting: Meeting;
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const { creator } = meeting;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Meeting with ${creator.name}, ${formatShortDate(meeting.date)} at ${meeting.timeLabel}`}
      onPress={() => router.push({ pathname: '/meeting/[id]', params: { id: meeting.id } })}
      className="gap-md rounded-lg border border-border bg-background-subtle p-lg active:bg-background-elevated"
    >
      <View className="flex-row items-center gap-md">
        <Avatar name={creator.name} uri={creator.avatarUrl} size="md" />
        <View className="flex-1">
          <Text variant="body" className="font-semibold">
            {creator.name}
          </Text>
          <Text variant="caption">{creator.profession}</Text>
        </View>
        <ChevronRight size={18} color={colors.foreground.muted} />
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-sm">
          <CalendarClock size={16} color={colors.foreground.secondary} />
          <Text variant="caption">
            {formatShortDate(meeting.date)} · {meeting.timeLabel} · {meeting.durationMinutes} min
          </Text>
        </View>
        <Badge
          label={meeting.status === 'upcoming' ? 'Upcoming' : 'Completed'}
          variant={meeting.status === 'upcoming' ? 'accent' : 'default'}
        />
      </View>
    </Pressable>
  );
}

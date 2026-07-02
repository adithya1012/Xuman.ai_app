import { router, useLocalSearchParams } from 'expo-router';
import { CalendarClock, ChevronLeft, Clock, MessageSquareText } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, Badge, Button, Card, Text } from '@/components/common';
import { selectMeetingById, useMeetingsStore } from '@/store/meetings-store';
import { colors } from '@/theme';
import { formatShortDate } from '@/utils/date';

export function MeetingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const fetched = useMeetingsStore((state) => state.fetched);
  const local = useMeetingsStore((state) => state.local);

  const meeting = id ? selectMeetingById({ fetched, local }, id) : undefined;

  if (!meeting) {
    return (
      <View className="flex-1 items-center justify-center gap-md bg-background px-2xl">
        <Text variant="heading">Meeting not found</Text>
        <Text variant="caption" className="text-center">
          This meeting may have been removed.
        </Text>
        <Button label="Go Back" variant="secondary" onPress={() => router.back()} />
      </View>
    );
  }

  const { creator } = meeting;

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
        <Text variant="heading">Meeting Details</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-lg p-lg">
        <Card className="items-center gap-md">
          <Avatar name={creator.name} uri={creator.avatarUrl} size="lg" />
          <View className="items-center gap-2xs">
            <Text variant="heading">{creator.name}</Text>
            <Text variant="caption">{creator.profession}</Text>
          </View>
          <Badge
            label={meeting.status === 'upcoming' ? 'Upcoming' : 'Completed'}
            variant={meeting.status === 'upcoming' ? 'accent' : 'default'}
          />
        </Card>

        <Card className="gap-lg">
          <View className="flex-row items-center gap-md">
            <CalendarClock size={18} color={colors.foreground.secondary} />
            <View>
              <Text variant="small">Date & time</Text>
              <Text variant="body" className="font-semibold">
                {formatShortDate(meeting.date)} at {meeting.timeLabel}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-md">
            <Clock size={18} color={colors.foreground.secondary} />
            <View>
              <Text variant="small">Duration</Text>
              <Text variant="body" className="font-semibold">
                {meeting.durationMinutes} minutes
              </Text>
            </View>
          </View>
          {meeting.note ? (
            <View className="flex-row items-start gap-md">
              <MessageSquareText size={18} color={colors.foreground.secondary} />
              <View className="flex-1">
                <Text variant="small">Topic</Text>
                <Text variant="caption">{meeting.note}</Text>
              </View>
            </View>
          ) : null}
        </Card>

        <Button
          label="View Creator Profile"
          variant="secondary"
          onPress={() =>
            router.push({ pathname: '/creator/[id]', params: { id: creator.id } })
          }
        />
      </ScrollView>
    </View>
  );
}

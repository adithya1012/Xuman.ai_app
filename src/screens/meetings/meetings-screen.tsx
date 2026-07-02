import { CalendarClock } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, SegmentedControl, Text } from '@/components/common';
import { MeetingCard } from '@/components/meetings/meeting-card';
import { ComingSoon } from '@/components/shared/coming-soon';
import { NotificationBell } from '@/components/shared/notification-bell';
import { selectMeetingsByStatus, useMeetingsStore } from '@/store/meetings-store';
import { colors } from '@/theme';
import { type MeetingStatus } from '@/types';

const SEGMENTS: { label: string; status: MeetingStatus }[] = [
  { label: 'Upcoming', status: 'upcoming' },
  { label: 'Completed', status: 'completed' },
];

export function MeetingsScreen() {
  const insets = useSafeAreaInsets();
  const status = useMeetingsStore((state) => state.status);
  const loadMeetings = useMeetingsStore((state) => state.loadMeetings);
  const [segmentIndex, setSegmentIndex] = useState(0);

  const fetched = useMeetingsStore((state) => state.fetched);
  const local = useMeetingsStore((state) => state.local);

  const meetingStatus = SEGMENTS[segmentIndex].status;
  const meetings = selectMeetingsByStatus({ fetched, local }, meetingStatus);

  useEffect(() => {
    if (useMeetingsStore.getState().status === 'idle') {
      loadMeetings();
    }
  }, [loadMeetings]);

  if (status === 'error') {
    return (
      <View className="flex-1 items-center justify-center gap-md bg-background px-2xl">
        <Text variant="heading">Something went wrong</Text>
        <Text variant="caption" className="text-center">
          We could not load your meetings. Please try again.
        </Text>
        <Button label="Retry" variant="secondary" onPress={loadMeetings} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top + 12 }}>
      <View className="gap-lg px-lg pb-md">
        <View className="flex-row items-center justify-between">
          <Text variant="title">Meetings</Text>
          <NotificationBell />
        </View>
        <SegmentedControl
          segments={SEGMENTS.map((segment) => segment.label)}
          selectedIndex={segmentIndex}
          onChange={setSegmentIndex}
        />
      </View>

      {status !== 'ready' ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.accent.DEFAULT} />
        </View>
      ) : meetings.length === 0 ? (
        <ComingSoon
          title={meetingStatus === 'upcoming' ? 'No upcoming meetings' : 'No completed meetings'}
          description={
            meetingStatus === 'upcoming'
              ? 'Book a call from any creator profile and it will show up here.'
              : 'Meetings you have finished will appear here.'
          }
          icon={<CalendarClock size={28} color={colors.foreground.secondary} />}
        />
      ) : (
        <FlatList
          data={meetings}
          keyExtractor={(meeting) => meeting.id}
          renderItem={({ item }) => <MeetingCard meeting={item} />}
          contentContainerClassName="gap-md px-lg pb-xl"
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

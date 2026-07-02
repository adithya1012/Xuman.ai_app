import { Check } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';

import { Button, Text } from '@/components/common';
import { colors } from '@/theme';
import { type Booking, type Creator } from '@/types';
import { formatShortDate } from '@/utils/date';

export interface BookingSuccessProps {
  booking: Booking;
  creator: Creator;
  onDone: () => void;
}

export function BookingSuccess({ booking, creator, onDone }: BookingSuccessProps) {
  return (
    <View className="flex-1 items-center justify-center gap-xl bg-background px-2xl">
      <Animated.View
        entering={ZoomIn.springify().damping(14)}
        className="h-24 w-24 items-center justify-center rounded-full bg-success/15"
      >
        <Check size={44} color={colors.success} strokeWidth={3} />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(120).duration(300)} className="items-center gap-sm">
        <Text variant="title" className="text-center">
          Your call has been scheduled successfully.
        </Text>
        <Text variant="caption" className="text-center">
          {creator.name} · {formatShortDate(booking.date)} at {booking.timeLabel}
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(240).duration(300)} className="self-stretch">
        <Button label="Done" size="lg" onPress={onDone} />
      </Animated.View>
    </View>
  );
}

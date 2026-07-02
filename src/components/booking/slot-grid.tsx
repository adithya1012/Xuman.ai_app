import { ActivityIndicator, Pressable, View } from 'react-native';

import { Text } from '@/components/common';
import { useBookingStore } from '@/store/booking-store';
import { colors } from '@/theme';
import { cn } from '@/utils/cn';

export function SlotGrid() {
  const slots = useBookingStore((state) => state.slots);
  const slotsStatus = useBookingStore((state) => state.slotsStatus);
  const selectedSlotId = useBookingStore((state) => state.selectedSlotId);
  const selectSlot = useBookingStore((state) => state.selectSlot);

  if (slotsStatus === 'loading' || slotsStatus === 'idle') {
    return (
      <View className="items-center py-xl">
        <ActivityIndicator color={colors.accent.DEFAULT} />
      </View>
    );
  }

  if (slotsStatus === 'error') {
    return (
      <Text variant="caption" className="px-lg">
        Could not load times for this date. Try another day.
      </Text>
    );
  }

  const availableCount = slots.filter((slot) => slot.available).length;
  if (availableCount === 0) {
    return (
      <Text variant="caption" className="px-lg">
        No open times on this date. Try another day.
      </Text>
    );
  }

  return (
    <View className="flex-row flex-wrap gap-sm px-lg">
      {slots.map((slot) => {
        const selected = slot.id === selectedSlotId;
        return (
          <Pressable
            key={slot.id}
            accessibilityRole="button"
            accessibilityState={{ selected, disabled: !slot.available }}
            accessibilityLabel={`${slot.label}${slot.available ? '' : ', unavailable'}`}
            disabled={!slot.available}
            onPress={() => selectSlot(slot.id)}
            className={cn(
              'w-[30%] items-center rounded-sm border py-md',
              selected && 'border-accent bg-accent-soft',
              !selected && slot.available && 'border-border bg-background-subtle',
              !slot.available && 'border-border/50 bg-background opacity-40',
            )}
          >
            <Text
              variant="body"
              className={cn('font-semibold', selected ? 'text-accent' : 'text-foreground')}
            >
              {slot.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

import { FlatList, Pressable } from 'react-native';

import { Text } from '@/components/common';
import { useBookingStore } from '@/store/booking-store';
import { cn } from '@/utils/cn';
import { formatWeekday } from '@/utils/date';

export function DateStrip() {
  const dates = useBookingStore((state) => state.dates);
  const selectedDate = useBookingStore((state) => state.selectedDate);
  const selectDate = useBookingStore((state) => state.selectDate);

  return (
    <FlatList
      data={dates}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(date) => date}
      contentContainerClassName="gap-sm px-lg"
      renderItem={({ item: date }) => {
        const day = new Date(`${date}T12:00:00`);
        const selected = date === selectedDate;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={`Select ${date}`}
            onPress={() => selectDate(date)}
            className={cn(
              'w-16 items-center gap-2xs rounded-md border py-md',
              selected ? 'border-accent bg-accent-soft' : 'border-border bg-background-subtle',
            )}
          >
            <Text variant="small" className={selected ? 'text-accent' : undefined}>
              {formatWeekday(day)}
            </Text>
            <Text
              variant="heading"
              className={selected ? 'text-accent' : 'text-foreground'}
            >
              {day.getDate()}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}

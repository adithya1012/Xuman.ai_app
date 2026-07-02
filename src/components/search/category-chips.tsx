import { ScrollView, Pressable } from 'react-native';

import { Text } from '@/components/common';
import { CATEGORIES, type Category } from '@/constants/categories';
import { cn } from '@/utils/cn';

export interface CategoryChipsProps {
  selected: Category | null;
  onSelect: (category: Category | null) => void;
}

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  const chips: { label: string; value: Category | null }[] = [
    { label: 'All', value: null },
    ...CATEGORIES.map((category) => ({ label: category, value: category as Category | null })),
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-sm px-lg"
    >
      {chips.map((chip) => {
        const isSelected = selected === chip.value;
        return (
          <Pressable
            key={chip.label}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(chip.value)}
            className={cn(
              'rounded-full border px-lg py-sm',
              isSelected ? 'border-accent bg-accent-soft' : 'border-border bg-background-subtle',
            )}
          >
            <Text
              variant="caption"
              className={isSelected ? 'font-semibold text-accent' : undefined}
            >
              {chip.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

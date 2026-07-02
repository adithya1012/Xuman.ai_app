import { ChevronRight } from 'lucide-react-native';
import { type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/common';
import { colors } from '@/theme';

export interface MenuItemProps {
  icon: ReactNode;
  label: string;
  caption?: string;
  onPress: () => void;
}

export function MenuItem({ icon, label, caption, onPress }: MenuItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="flex-row items-center gap-md rounded-lg border border-border bg-background-subtle p-lg active:bg-background-elevated"
    >
      <View className="h-10 w-10 items-center justify-center rounded-full bg-background-elevated">
        {icon}
      </View>
      <View className="flex-1">
        <Text variant="body" className="font-semibold">
          {label}
        </Text>
        {caption ? <Text variant="small">{caption}</Text> : null}
      </View>
      <ChevronRight size={18} color={colors.foreground.muted} />
    </Pressable>
  );
}

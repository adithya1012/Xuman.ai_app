import { type ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/common';

export interface ComingSoonProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function ComingSoon({ title, description, icon }: ComingSoonProps) {
  return (
    <View className="flex-1 items-center justify-center gap-md bg-background px-2xl">
      {icon ? (
        <View className="h-16 w-16 items-center justify-center rounded-full bg-background-elevated">
          {icon}
        </View>
      ) : null}
      <Text variant="heading">{title}</Text>
      <Text variant="caption" className="text-center">
        {description}
      </Text>
    </View>
  );
}

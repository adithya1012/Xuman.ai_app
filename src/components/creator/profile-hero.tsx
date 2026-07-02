import { View } from 'react-native';

import { Avatar, Badge, Text } from '@/components/common';
import { type Creator } from '@/types';

export interface ProfileHeroProps {
  creator: Creator;
}

export function ProfileHero({ creator }: ProfileHeroProps) {
  return (
    <View className="items-center gap-sm px-xl">
      <Avatar name={creator.name} uri={creator.avatarUrl} size="xl" />
      <View className="items-center gap-2xs">
        <Text variant="title">{creator.name}</Text>
        <Text variant="caption">
          {creator.profession} · @{creator.handle}
        </Text>
      </View>
      <Badge label={creator.category} variant="accent" />
    </View>
  );
}

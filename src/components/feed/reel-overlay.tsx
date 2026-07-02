import { View } from 'react-native';

import { Avatar, Badge, Button, Text } from '@/components/common';
import { type Reel } from '@/types';

export interface ReelOverlayProps {
  reel: Reel;
  onBookCall?: () => void;
}

export function ReelOverlay({ reel, onBookCall }: ReelOverlayProps) {
  const { creator } = reel;

  return (
    <View className="gap-md">
      <View className="flex-row items-center gap-md">
        <Avatar name={creator.name} uri={creator.avatarUrl} size="md" />
        <View className="flex-1">
          <Text variant="heading">{creator.name}</Text>
          <Text variant="caption">{creator.profession}</Text>
        </View>
      </View>

      <Badge label={creator.category} variant="accent" />

      <Text variant="body" numberOfLines={3}>
        {reel.caption}
      </Text>

      <Button
        label={`Book a Call · $${creator.sessionPriceUsd}`}
        size="md"
        onPress={onBookCall}
        className="self-start px-xl"
      />
    </View>
  );
}

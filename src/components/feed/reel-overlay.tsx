import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Avatar, Badge, Button, Text } from '@/components/common';
import { type Reel } from '@/types';

export interface ReelOverlayProps {
  reel: Reel;
}

export function ReelOverlay({ reel }: ReelOverlayProps) {
  const { creator } = reel;

  const openProfile = () => {
    router.push({ pathname: '/creator/[id]', params: { id: creator.id } });
  };

  return (
    <View className="gap-md" pointerEvents="box-none">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View ${creator.name}'s profile`}
        onPress={openProfile}
        className="flex-row items-center gap-md"
      >
        <Avatar name={creator.name} uri={creator.avatarUrl} size="md" />
        <View className="flex-1">
          <Text variant="heading">{creator.name}</Text>
          <Text variant="caption">{creator.profession}</Text>
        </View>
      </Pressable>

      <Badge label={creator.category} variant="accent" />

      <Text variant="body" numberOfLines={3}>
        {reel.caption}
      </Text>

      <Button
        label={`Book a Call · $${creator.sessionPriceUsd}`}
        size="md"
        onPress={openProfile}
        className="self-start px-xl"
      />
    </View>
  );
}

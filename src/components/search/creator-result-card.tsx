import { router } from 'expo-router';
import { Star } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { Avatar, Badge, Text } from '@/components/common';
import { colors } from '@/theme';
import { type Creator } from '@/types';
import { formatCount } from '@/utils/format';

export interface CreatorResultCardProps {
  creator: Creator;
}

export function CreatorResultCard({ creator }: CreatorResultCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${creator.name}'s profile`}
      onPress={() => router.push({ pathname: '/creator/[id]', params: { id: creator.id } })}
      className="flex-row items-center gap-md rounded-lg border border-border bg-background-subtle p-lg active:bg-background-elevated"
    >
      <Avatar name={creator.name} uri={creator.avatarUrl} size="lg" />
      <View className="flex-1 gap-2xs">
        <Text variant="body" className="font-semibold">
          {creator.name}
        </Text>
        <Text variant="caption">{creator.profession}</Text>
        <View className="flex-row items-center gap-sm">
          <View className="flex-row items-center gap-2xs">
            <Star size={12} color={colors.warning} fill={colors.warning} />
            <Text variant="small" className="text-foreground-secondary">
              {creator.rating.toFixed(1)} ({formatCount(creator.reviewCount)})
            </Text>
          </View>
          <Badge label={creator.category} />
        </View>
      </View>
      <Text variant="heading">${creator.sessionPriceUsd}</Text>
    </Pressable>
  );
}

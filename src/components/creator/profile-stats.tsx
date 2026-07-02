import { View } from 'react-native';

import { Card, Text } from '@/components/common';
import { StarRating } from '@/components/shared/star-rating';
import { type Creator } from '@/types';
import { formatCount } from '@/utils/format';

export interface ProfileStatsProps {
  creator: Creator;
}

export function ProfileStats({ creator }: ProfileStatsProps) {
  return (
    <Card className="mx-lg flex-row items-center justify-between px-xl py-lg">
      <View className="items-center gap-2xs">
        <Text variant="heading">{creator.rating.toFixed(1)}</Text>
        <StarRating rating={creator.rating} />
      </View>
      <View className="h-10 w-px bg-border" />
      <View className="items-center gap-2xs">
        <Text variant="heading">{formatCount(creator.reviewCount)}</Text>
        <Text variant="small">Reviews</Text>
      </View>
      <View className="h-10 w-px bg-border" />
      <View className="items-center gap-2xs">
        <Text variant="heading">${creator.sessionPriceUsd}</Text>
        <Text variant="small">Per session</Text>
      </View>
    </Card>
  );
}

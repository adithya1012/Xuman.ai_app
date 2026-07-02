import { View } from 'react-native';

import { Avatar, Card, Text } from '@/components/common';
import { StarRating } from '@/components/shared/star-rating';
import { type Review } from '@/types';
import { formatDate } from '@/utils/format';

export interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="gap-md">
      <View className="flex-row items-center gap-md">
        <Avatar name={review.authorName} uri={review.authorAvatarUrl} size="sm" />
        <View className="flex-1">
          <Text variant="body" className="font-semibold">
            {review.authorName}
          </Text>
          <Text variant="small">{formatDate(review.date)}</Text>
        </View>
        <StarRating rating={review.rating} />
      </View>
      <Text variant="caption">{review.comment}</Text>
    </Card>
  );
}

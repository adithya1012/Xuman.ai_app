import { Star } from 'lucide-react-native';
import { View } from 'react-native';

import { colors } from '@/theme';

const MAX_STARS = 5;

export interface StarRatingProps {
  rating: number;
  size?: number;
}

export function StarRating({ rating, size = 14 }: StarRatingProps) {
  const filledCount = Math.round(rating);

  return (
    <View
      className="flex-row gap-2xs"
      accessibilityLabel={`Rated ${rating} out of ${MAX_STARS} stars`}
    >
      {Array.from({ length: MAX_STARS }, (_, index) => (
        <Star
          key={index}
          size={size}
          color={colors.warning}
          fill={index < filledCount ? colors.warning : 'transparent'}
        />
      ))}
    </View>
  );
}

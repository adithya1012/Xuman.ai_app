import { Play } from 'lucide-react-native';
import { Image, View, useWindowDimensions } from 'react-native';

import { Text } from '@/components/common';
import { colors } from '@/theme';
import { type Reel } from '@/types';
import { formatCount } from '@/utils/format';

const COLUMNS = 3;
const GRID_HORIZONTAL_PADDING = 16;
const CELL_GAP = 4;

export interface VideoGridProps {
  reels: Reel[];
}

export function VideoGrid({ reels }: VideoGridProps) {
  const { width } = useWindowDimensions();
  const cellWidth = (width - GRID_HORIZONTAL_PADDING * 2 - CELL_GAP * (COLUMNS - 1)) / COLUMNS;

  if (reels.length === 0) {
    return (
      <Text variant="caption" className="px-lg">
        No videos published yet.
      </Text>
    );
  }

  return (
    <View className="flex-row flex-wrap px-lg" style={{ gap: CELL_GAP }}>
      {reels.map((reel) => (
        <View
          key={reel.id}
          className="overflow-hidden rounded-sm bg-background-elevated"
          style={{ width: cellWidth, height: cellWidth * 1.5 }}
        >
          <Image
            source={{ uri: reel.thumbnailUrl }}
            className="absolute h-full w-full"
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
          <View className="flex-1 justify-end p-sm">
            <View className="flex-row items-center gap-2xs">
              <Play size={12} color={colors.foreground.DEFAULT} fill={colors.foreground.DEFAULT} />
              <Text variant="small" className="text-foreground">
                {formatCount(reel.likeCount)}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

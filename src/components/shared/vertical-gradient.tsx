import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { cn } from '@/utils/cn';

export interface VerticalGradientProps {
  /** 'down' fades from transparent (top) to dark (bottom); 'up' is the reverse. */
  direction?: 'down' | 'up';
  maxOpacity?: number;
  className?: string;
}

export function VerticalGradient({
  direction = 'down',
  maxOpacity = 0.85,
  className,
}: VerticalGradientProps) {
  const id = `vertical-gradient-${useId().replace(/:/g, '')}`;
  const [startOpacity, endOpacity] = direction === 'down' ? [0, maxOpacity] : [maxOpacity, 0];

  return (
    <View className={cn('overflow-hidden', className)} pointerEvents="none">
      <Svg width="100%" height="100%" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#000000" stopOpacity={startOpacity} />
            <Stop offset="1" stopColor="#000000" stopOpacity={endOpacity} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

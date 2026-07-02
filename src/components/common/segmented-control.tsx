import { useEffect, useState } from 'react';
import { Pressable, View, type LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { Text } from '@/components/common/text';

const SPRING_CONFIG = { damping: 20, stiffness: 260 };
const CONTAINER_PADDING = 4;

export interface SegmentedControlProps {
  segments: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export function SegmentedControl({ segments, selectedIndex, onChange }: SegmentedControlProps) {
  const [innerWidth, setInnerWidth] = useState(0);
  const segmentWidth = segments.length > 0 ? innerWidth / segments.length : 0;

  const offset = useSharedValue(0);

  useEffect(() => {
    offset.set(withSpring(selectedIndex * segmentWidth, SPRING_CONFIG));
  }, [offset, selectedIndex, segmentWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.get() }],
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    setInnerWidth(event.nativeEvent.layout.width - CONTAINER_PADDING * 2);
  };

  return (
    <View
      className="flex-row rounded-md bg-background-subtle"
      style={{ padding: CONTAINER_PADDING }}
      onLayout={onLayout}
      accessibilityRole="tablist"
    >
      {segmentWidth > 0 && (
        <Animated.View
          style={[indicatorStyle, { width: segmentWidth }]}
          className="absolute bottom-1 top-1 left-1 rounded-sm bg-background-elevated"
        />
      )}
      {segments.map((segment, index) => {
        const selected = index === selectedIndex;
        return (
          <Pressable
            key={segment}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onChange(index)}
            className="flex-1 items-center py-sm"
          >
            <Text
              variant="caption"
              className={selected ? 'font-semibold text-foreground' : undefined}
            >
              {segment}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

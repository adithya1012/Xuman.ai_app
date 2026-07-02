import { type ReactNode } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { Text } from '@/components/common';

const SPRING_CONFIG = { damping: 14, stiffness: 360 };

export interface ActionRailButtonProps {
  icon: ReactNode;
  accessibilityLabel: string;
  label?: string;
  onPress?: () => void;
}

export function ActionRailButton({ icon, accessibilityLabel, label, onPress }: ActionRailButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onPressIn={() => scale.set(withSpring(0.8, SPRING_CONFIG))}
      onPressOut={() => scale.set(withSpring(1, SPRING_CONFIG))}
      className="items-center gap-2xs"
    >
      <Animated.View style={animatedStyle}>{icon}</Animated.View>
      {label ? (
        <Text variant="small" className="text-foreground">
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

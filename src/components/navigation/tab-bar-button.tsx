import { type BottomTabNavigationOptions } from 'expo-router/tabs';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '@/components/common';
import { colors } from '@/theme';

const SPRING_CONFIG = { damping: 18, stiffness: 320 };

export interface TabBarButtonProps {
  label: string;
  focused: boolean;
  icon: BottomTabNavigationOptions['tabBarIcon'];
  onPress: () => void;
}

export function TabBarButton({ label, focused, icon, onPress }: TabBarButtonProps) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.set(withTiming(focused ? 1 : 0, { duration: 180 }));
  }, [focused, progress]);

  const scale = useSharedValue(1);

  const iconContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
    backgroundColor: interpolateColor(
      progress.get(),
      [0, 1],
      ['transparent', colors.accent.soft],
    ),
  }));

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={label}
      onPress={onPress}
      onPressIn={() => scale.set(withSpring(0.9, SPRING_CONFIG))}
      onPressOut={() => scale.set(withSpring(1, SPRING_CONFIG))}
      className="flex-1 items-center gap-2xs"
    >
      <Animated.View
        style={iconContainerStyle}
        className="h-9 w-16 items-center justify-center rounded-full"
      >
        {icon?.({
          focused,
          color: focused ? colors.accent.DEFAULT : colors.foreground.muted,
          size: 22,
        })}
      </Animated.View>
      <Text
        variant="small"
        className={focused ? 'text-accent' : 'text-foreground-muted'}
      >
        {label}
      </Text>
    </Pressable>
  );
}

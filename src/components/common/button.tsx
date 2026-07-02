import { type ReactNode } from 'react';
import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Text } from '@/components/common/text';
import { colors } from '@/theme';
import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const containerVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent',
  secondary: 'bg-background-elevated border border-border',
  ghost: 'bg-transparent',
};

const containerSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-md rounded-sm',
  md: 'h-12 px-lg rounded-md',
  lg: 'h-14 px-xl rounded-lg',
};

const labelVariantClasses: Record<ButtonVariant, string> = {
  primary: 'text-foreground font-semibold',
  secondary: 'text-foreground font-semibold',
  ghost: 'text-accent font-semibold',
};

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className,
  disabled,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  const isDisabled = disabled || loading;

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        disabled={isDisabled}
        onPressIn={(event) => {
          scale.set(withSpring(0.96, { damping: 20, stiffness: 400 }));
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          scale.set(withSpring(1, { damping: 20, stiffness: 400 }));
          onPressOut?.(event);
        }}
        className={cn(
          'flex-row items-center justify-center gap-sm',
          containerVariantClasses[variant],
          containerSizeClasses[size],
          isDisabled && 'opacity-50',
          className,
        )}
        {...props}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.foreground.DEFAULT} />
        ) : (
          <>
            {icon}
            <Text variant="body" className={labelVariantClasses[variant]}>
              {label}
            </Text>
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}

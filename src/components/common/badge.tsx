import { View } from 'react-native';

import { Text } from '@/components/common/text';
import { cn } from '@/utils/cn';

export type BadgeVariant = 'default' | 'accent' | 'success';

const containerVariantClasses: Record<BadgeVariant, string> = {
  default: 'bg-background-elevated',
  accent: 'bg-accent-soft',
  success: 'bg-success/15',
};

const labelVariantClasses: Record<BadgeVariant, string> = {
  default: 'text-foreground-secondary',
  accent: 'text-accent',
  success: 'text-success',
};

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <View
      className={cn(
        'self-start rounded-full px-md py-2xs',
        containerVariantClasses[variant],
        className,
      )}
    >
      <Text variant="small" className={labelVariantClasses[variant]}>
        {label}
      </Text>
    </View>
  );
}

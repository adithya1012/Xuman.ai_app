import { View, type ViewProps } from 'react-native';

import { cn } from '@/utils/cn';

export interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <View
      className={cn('rounded-lg border border-border bg-background-subtle p-lg', className)}
      {...props}
    />
  );
}

import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { cn } from '@/utils/cn';

export type TextVariant = 'display' | 'title' | 'heading' | 'body' | 'caption' | 'small';

const variantClasses: Record<TextVariant, string> = {
  display: 'text-display text-foreground',
  title: 'text-title text-foreground',
  heading: 'text-heading text-foreground',
  body: 'text-body text-foreground',
  caption: 'text-caption text-foreground-secondary',
  small: 'text-small text-foreground-muted',
};

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  className?: string;
}

export function Text({ variant = 'body', className, ...props }: TextProps) {
  return <RNText className={cn(variantClasses[variant], className)} {...props} />;
}

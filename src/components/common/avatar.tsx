import { Image, View } from 'react-native';

import { Text } from '@/components/common/text';
import { cn } from '@/utils/cn';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-11 w-11',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
};

const initialsVariant: Record<AvatarSize, 'small' | 'caption' | 'heading' | 'title'> = {
  sm: 'small',
  md: 'caption',
  lg: 'heading',
  xl: 'title',
};

export interface AvatarProps {
  name: string;
  uri?: string;
  size?: AvatarSize;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function Avatar({ name, uri, size = 'md', className }: AvatarProps) {
  return (
    <View
      className={cn(
        'items-center justify-center overflow-hidden rounded-full bg-background-elevated',
        sizeClasses[size],
        className,
      )}
    >
      {uri ? (
        <Image source={{ uri }} className="h-full w-full" accessibilityLabel={name} />
      ) : (
        <Text variant={initialsVariant[size]} className="text-foreground-secondary">
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
}

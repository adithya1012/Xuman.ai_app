import { Switch, View } from 'react-native';

import { Text } from '@/components/common';
import { colors } from '@/theme';

export interface SettingsRowProps {
  label: string;
  caption?: string;
  value: boolean;
  onToggle: () => void;
}

export function SettingsRow({ label, caption, value, onToggle }: SettingsRowProps) {
  return (
    <View className="flex-row items-center gap-md rounded-lg border border-border bg-background-subtle p-lg">
      <View className="flex-1">
        <Text variant="body" className="font-semibold">
          {label}
        </Text>
        {caption ? <Text variant="small">{caption}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        accessibilityLabel={label}
        trackColor={{ false: colors.border.strong, true: colors.accent.DEFAULT }}
        thumbColor={colors.foreground.DEFAULT}
      />
    </View>
  );
}

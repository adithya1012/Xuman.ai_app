import { Search, X } from 'lucide-react-native';
import { Pressable, TextInput, View } from 'react-native';

import { colors } from '@/theme';

export interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search creators' }: SearchBarProps) {
  return (
    <View className="flex-row items-center gap-sm rounded-md border border-border bg-background-subtle px-md">
      <Search size={18} color={colors.foreground.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.foreground.muted}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Search creators"
        className="h-12 flex-1 text-body text-foreground"
      />
      {value.length > 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={() => onChangeText('')}
          className="h-6 w-6 items-center justify-center rounded-full bg-background-elevated"
        >
          <X size={14} color={colors.foreground.secondary} />
        </Pressable>
      )}
    </View>
  );
}

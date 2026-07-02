import { Controller, type Control } from 'react-hook-form';
import { TextInput } from 'react-native';

import { colors } from '@/theme';

export interface BookingFormValues {
  note: string;
}

export interface NoteFieldProps {
  control: Control<BookingFormValues>;
}

const MAX_NOTE_LENGTH = 240;

export function NoteField({ control }: NoteFieldProps) {
  return (
    <Controller
      control={control}
      name="note"
      rules={{ maxLength: MAX_NOTE_LENGTH }}
      render={({ field: { value, onChange, onBlur } }) => (
        <TextInput
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder="What would you like to talk about? (optional)"
          placeholderTextColor={colors.foreground.muted}
          multiline
          maxLength={MAX_NOTE_LENGTH}
          accessibilityLabel="Session topic"
          className="min-h-24 rounded-md border border-border bg-background-subtle p-md text-body text-foreground"
          textAlignVertical="top"
        />
      )}
    />
  );
}

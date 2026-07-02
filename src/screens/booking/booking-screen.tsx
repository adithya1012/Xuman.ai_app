import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BookingSuccess } from '@/components/booking/booking-success';
import { DateStrip } from '@/components/booking/date-strip';
import { NoteField, type BookingFormValues } from '@/components/booking/note-field';
import { SlotGrid } from '@/components/booking/slot-grid';
import { Avatar, Button, Text } from '@/components/common';
import { useBookingStore } from '@/store/booking-store';
import { useCreatorStore } from '@/store/creator-store';
import { colors } from '@/theme';

export function BookingScreen() {
  const { creatorId } = useLocalSearchParams<{ creatorId: string }>();
  const insets = useSafeAreaInsets();

  const profile = useCreatorStore((state) => state.profile);
  const creatorStatus = useCreatorStore((state) => state.status);
  const selectedSlotId = useBookingStore((state) => state.selectedSlotId);
  const confirmStatus = useBookingStore((state) => state.confirmStatus);
  const lastBooking = useBookingStore((state) => state.lastBooking);
  const confirm = useBookingStore((state) => state.confirm);

  const { control, handleSubmit } = useForm<BookingFormValues>({
    defaultValues: { note: '' },
  });

  useEffect(() => {
    if (!creatorId) {
      return;
    }
    useBookingStore.getState().start(creatorId);
    if (useCreatorStore.getState().profile?.creator.id !== creatorId) {
      useCreatorStore.getState().loadCreator(creatorId);
    }
  }, [creatorId]);

  const creator = profile?.creator.id === creatorId ? profile.creator : null;

  if (!creatorId || creatorStatus === 'error') {
    return (
      <View className="flex-1 items-center justify-center gap-md bg-background px-2xl">
        <Text variant="heading">Booking unavailable</Text>
        <Text variant="caption" className="text-center">
          We could not start this booking. Please try again.
        </Text>
        <Button label="Go Back" variant="secondary" onPress={() => router.back()} />
      </View>
    );
  }

  if (!creator) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={colors.accent.DEFAULT} />
      </View>
    );
  }

  if (confirmStatus === 'success' && lastBooking) {
    return (
      <BookingSuccess
        booking={lastBooking}
        creator={creator}
        onDone={() => router.dismissAll()}
      />
    );
  }

  const onConfirm = handleSubmit((values) => confirm(values.note));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row items-center gap-md px-lg py-sm">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-background-elevated"
        >
          <ChevronLeft size={22} color={colors.foreground.DEFAULT} />
        </Pressable>
        <Text variant="heading">Book a Call</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="gap-xl py-lg pb-3xl"
      >
        <View className="flex-row items-center gap-md rounded-lg border border-border bg-background-subtle p-lg mx-lg">
          <Avatar name={creator.name} uri={creator.avatarUrl} size="md" />
          <View className="flex-1">
            <Text variant="body" className="font-semibold">
              {creator.name}
            </Text>
            <Text variant="caption">{creator.profession}</Text>
          </View>
          <Text variant="heading">${creator.sessionPriceUsd}</Text>
        </View>

        <View className="gap-md">
          <Text variant="heading" className="px-lg">
            Pick a date
          </Text>
          <DateStrip />
        </View>

        <View className="gap-md">
          <Text variant="heading" className="px-lg">
            Available times
          </Text>
          <SlotGrid />
        </View>

        <View className="gap-md px-lg">
          <Text variant="heading">Add a note</Text>
          <NoteField control={control} />
        </View>

        {confirmStatus === 'error' && (
          <Text variant="caption" className="px-lg text-danger">
            Something went wrong while booking. Please try again.
          </Text>
        )}
      </ScrollView>

      <View
        className="border-t border-border bg-background px-lg pt-md"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <Button
          label="Confirm Booking"
          size="lg"
          disabled={!selectedSlotId}
          loading={confirmStatus === 'submitting'}
          onPress={onConfirm}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

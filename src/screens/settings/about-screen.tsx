import Constants from 'expo-constants';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card, Text } from '@/components/common';
import { colors } from '@/theme';

export function AboutScreen() {
  const insets = useSafeAreaInsets();
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center gap-md px-lg py-sm">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-background-elevated"
        >
          <ChevronLeft size={22} color={colors.foreground.DEFAULT} />
        </Pressable>
        <Text variant="heading">About</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-xl p-lg">
        <View className="items-center gap-md py-xl">
          <View className="h-20 w-20 items-center justify-center rounded-xl bg-accent-soft">
            <Text variant="display" className="text-accent">
              X
            </Text>
          </View>
          <View className="items-center gap-2xs">
            <Text variant="title">Xuman</Text>
            <Text variant="small">Version {version}</Text>
          </View>
        </View>

        <Card className="gap-md">
          <Text variant="heading">What is Xuman?</Text>
          <Text variant="caption">
            Xuman is a knowledge-sharing marketplace. Creators share what they know through
            short-form videos, and you can go deeper by booking a one-on-one consultation
            call with them — from portfolio reviews to pitch practice to cooking lessons.
          </Text>
        </Card>

        <Card className="gap-md">
          <Text variant="heading">How it works</Text>
          <Text variant="caption">
            Watch reels from experts, open a creator&apos;s profile to see their work and
            reviews, pick a time that suits you, and confirm your call. Your upcoming and
            completed sessions live in the Meetings tab.
          </Text>
        </Card>

        <Text variant="small" className="text-center">
          Built with React Native and Expo
        </Text>
      </ScrollView>
    </View>
  );
}

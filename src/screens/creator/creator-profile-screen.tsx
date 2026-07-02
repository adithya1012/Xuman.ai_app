import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useEffect } from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Text } from '@/components/common';
import { ProfileHero } from '@/components/creator/profile-hero';
import { ProfileStats } from '@/components/creator/profile-stats';
import { ReviewCard } from '@/components/creator/review-card';
import { VideoGrid } from '@/components/creator/video-grid';
import { useCreatorStore } from '@/store/creator-store';
import { colors } from '@/theme';

export function CreatorProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const profile = useCreatorStore((state) => state.profile);
  const status = useCreatorStore((state) => state.status);
  const loadCreator = useCreatorStore((state) => state.loadCreator);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (id) {
      loadCreator(id);
    }
  }, [id, loadCreator]);

  if (status === 'error' || !id) {
    return (
      <View className="flex-1 items-center justify-center gap-md bg-background px-2xl">
        <Text variant="heading">Creator unavailable</Text>
        <Text variant="caption" className="text-center">
          We could not load this profile. Please try again.
        </Text>
        <Button label="Go Back" variant="secondary" onPress={() => router.back()} />
      </View>
    );
  }

  if (status !== 'ready' || !profile) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={colors.accent.DEFAULT} />
      </View>
    );
  }

  const { creator, reels, reviews } = profile;

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center px-lg py-sm">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-background-elevated"
        >
          <ChevronLeft size={22} color={colors.foreground.DEFAULT} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-xl pb-3xl"
      >
        <ProfileHero creator={creator} />
        <ProfileStats creator={creator} />

        <View className="gap-md px-lg">
          <Text variant="heading">About</Text>
          <Text variant="caption">{creator.bio}</Text>
        </View>

        <View className="gap-md">
          <Text variant="heading" className="px-lg">
            Videos
          </Text>
          <VideoGrid reels={reels} />
        </View>

        <View className="gap-md px-lg">
          <Text variant="heading">Reviews</Text>
          {reviews.length === 0 ? (
            <Text variant="caption">No reviews yet.</Text>
          ) : (
            reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          )}
        </View>
      </ScrollView>

      <View
        className="border-t border-border bg-background px-lg pt-md"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <Button label={`Book a Call · $${creator.sessionPriceUsd}`} size="lg" />
      </View>
    </View>
  );
}

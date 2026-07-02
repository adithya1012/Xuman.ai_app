import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Button, Text } from '@/components/common';
import { FeedList } from '@/components/feed/feed-list';
import { useFeedStore } from '@/store/feed-store';
import { colors } from '@/theme';

export function HomeScreen() {
  const status = useFeedStore((state) => state.status);
  const loadFeed = useFeedStore((state) => state.loadFeed);

  useEffect(() => {
    if (useFeedStore.getState().status === 'idle') {
      loadFeed();
    }
  }, [loadFeed]);

  if (status === 'error') {
    return (
      <View className="flex-1 items-center justify-center gap-md bg-background px-2xl">
        <Text variant="heading">Something went wrong</Text>
        <Text variant="caption" className="text-center">
          We could not load your feed. Check your connection and try again.
        </Text>
        <Button label="Retry" variant="secondary" onPress={loadFeed} />
      </View>
    );
  }

  if (status !== 'ready') {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={colors.accent.DEFAULT} />
      </View>
    );
  }

  return <FeedList />;
}

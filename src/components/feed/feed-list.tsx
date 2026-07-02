import { useCallback, useState } from 'react';
import {
  FlatList,
  View,
  type LayoutChangeEvent,
  type ViewabilityConfig,
  type ViewToken,
} from 'react-native';

import { ReelCard } from '@/components/feed/reel-card';
import { useFeedStore } from '@/store/feed-store';
import { type Reel } from '@/types';

const viewabilityConfig: ViewabilityConfig = {
  itemVisiblePercentThreshold: 60,
};

// Module scope keeps the callback identity stable across renders, which
// FlatList requires for onViewableItemsChanged.
function onViewableItemsChanged({ viewableItems }: { viewableItems: ViewToken<Reel>[] }) {
  const visible = viewableItems.find((item) => item.isViewable);
  if (visible && typeof visible.index === 'number') {
    useFeedStore.getState().setActiveIndex(visible.index);
  }
}

export function FeedList() {
  const reels = useFeedStore((state) => state.reels);
  const activeIndex = useFeedStore((state) => state.activeIndex);

  const [itemHeight, setItemHeight] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setItemHeight(event.nativeEvent.layout.height);
  }, []);

  return (
    <View className="flex-1 bg-background" onLayout={onLayout}>
      {itemHeight > 0 && (
        <FlatList
          data={reels}
          keyExtractor={(reel) => reel.id}
          renderItem={({ item, index }) => (
            <View style={{ height: itemHeight }}>
              <ReelCard reel={item} isActive={index === activeIndex} />
            </View>
          )}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          initialNumToRender={2}
          maxToRenderPerBatch={3}
          windowSize={5}
        />
      )}
    </View>
  );
}

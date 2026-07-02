import { SearchX } from 'lucide-react-native';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Text } from '@/components/common';
import { CategoryChips } from '@/components/search/category-chips';
import { CreatorResultCard } from '@/components/search/creator-result-card';
import { SearchBar } from '@/components/search/search-bar';
import { ComingSoon } from '@/components/shared/coming-soon';
import { useSearchStore } from '@/store/search-store';
import { colors } from '@/theme';

const SEARCH_DEBOUNCE_MS = 250;

export function SearchScreen() {
  const insets = useSafeAreaInsets();
  const query = useSearchStore((state) => state.query);
  const category = useSearchStore((state) => state.category);
  const results = useSearchStore((state) => state.results);
  const status = useSearchStore((state) => state.status);
  const setQuery = useSearchStore((state) => state.setQuery);
  const setCategory = useSearchStore((state) => state.setCategory);
  const search = useSearchStore((state) => state.search);

  // Debounced search keeps typing smooth; also runs the initial browse query.
  useEffect(() => {
    const timer = setTimeout(() => {
      search();
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top + 12 }}>
      <View className="gap-lg pb-md">
        <View className="gap-lg px-lg">
          <Text variant="title">Explore</Text>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
        <CategoryChips selected={category} onSelect={setCategory} />
      </View>

      {status === 'error' ? (
        <View className="flex-1 items-center justify-center gap-md px-2xl">
          <Text variant="heading">Something went wrong</Text>
          <Text variant="caption" className="text-center">
            We could not search right now. Please try again.
          </Text>
          <Button label="Retry" variant="secondary" onPress={search} />
        </View>
      ) : status !== 'ready' ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.accent.DEFAULT} />
        </View>
      ) : results.length === 0 ? (
        <ComingSoon
          title="No creators found"
          description="Try a different search or category."
          icon={<SearchX size={28} color={colors.foreground.secondary} />}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(creator) => creator.id}
          renderItem={({ item }) => <CreatorResultCard creator={item} />}
          contentContainerClassName="gap-md px-lg pb-xl"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

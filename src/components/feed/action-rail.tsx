import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react-native';
import { View } from 'react-native';

import { ActionRailButton } from '@/components/feed/action-rail-button';
import { useFeedStore } from '@/store/feed-store';
import { colors } from '@/theme';
import { type Reel } from '@/types';
import { formatCount } from '@/utils/format';

export interface ActionRailProps {
  reel: Reel;
}

export function ActionRail({ reel }: ActionRailProps) {
  const liked = useFeedStore((state) => Boolean(state.likedReelIds[reel.id]));
  const toggleLike = useFeedStore((state) => state.toggleLike);

  return (
    <View className="items-center gap-xl">
      <ActionRailButton
        label={formatCount(reel.likeCount + (liked ? 1 : 0))}
        accessibilityLabel={liked ? 'Unlike' : 'Like'}
        onPress={() => toggleLike(reel.id)}
        icon={
          <Heart
            size={30}
            color={liked ? colors.danger : colors.foreground.DEFAULT}
            fill={liked ? colors.danger : 'transparent'}
          />
        }
      />
      <ActionRailButton
        label={formatCount(reel.commentCount)}
        accessibilityLabel="Comments"
        icon={<MessageCircle size={30} color={colors.foreground.DEFAULT} />}
      />
      <ActionRailButton
        label={formatCount(reel.shareCount)}
        accessibilityLabel="Share"
        icon={<Share2 size={30} color={colors.foreground.DEFAULT} />}
      />
      <ActionRailButton
        accessibilityLabel="Save"
        icon={<Bookmark size={30} color={colors.foreground.DEFAULT} />}
      />
    </View>
  );
}

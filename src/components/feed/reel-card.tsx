import { Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionRail } from '@/components/feed/action-rail';
import { ReelOverlay } from '@/components/feed/reel-overlay';
import { VerticalGradient } from '@/components/shared/vertical-gradient';
import { type Reel } from '@/types';

export interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
}

export function ReelCard({ reel }: ReelCardProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <Image
        source={{ uri: reel.thumbnailUrl }}
        className="absolute h-full w-full"
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />

      <VerticalGradient direction="up" maxOpacity={0.45} className="absolute left-0 right-0 top-0 h-24" />
      <VerticalGradient direction="down" maxOpacity={0.9} className="absolute bottom-0 left-0 right-0 h-96" />

      <View className="flex-1 justify-end" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-end gap-lg px-lg pb-xl">
          <View className="flex-1">
            <ReelOverlay reel={reel} />
          </View>
          <ActionRail reel={reel} />
        </View>
      </View>
    </View>
  );
}

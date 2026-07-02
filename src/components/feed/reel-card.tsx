import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionRail } from '@/components/feed/action-rail';
import { MuteButton } from '@/components/feed/mute-button';
import { ReelOverlay } from '@/components/feed/reel-overlay';
import { ReelVideo } from '@/components/feed/reel-video';
import { VerticalGradient } from '@/components/shared/vertical-gradient';
import { type Reel } from '@/types';

export interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
}

export function ReelCard({ reel, isActive }: ReelCardProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <ReelVideo reel={reel} isActive={isActive} />

      <VerticalGradient direction="up" maxOpacity={0.45} className="absolute left-0 right-0 top-0 h-24" />
      <VerticalGradient direction="down" maxOpacity={0.9} className="absolute bottom-0 left-0 right-0 h-96" />

      <View
        className="flex-1"
        style={{ paddingTop: insets.top + 12 }}
        pointerEvents="box-none"
      >
        <View className="flex-row justify-end px-lg" pointerEvents="box-none">
          <MuteButton />
        </View>
        <View className="flex-1" pointerEvents="none" />
        <View className="flex-row items-end gap-lg px-lg pb-xl" pointerEvents="box-none">
          <View className="flex-1" pointerEvents="box-none">
            <ReelOverlay reel={reel} />
          </View>
          <ActionRail reel={reel} />
        </View>
      </View>
    </View>
  );
}

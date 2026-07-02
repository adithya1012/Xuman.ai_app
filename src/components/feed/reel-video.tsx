import { useEvent } from 'expo';
import { useVideoPlayer, VideoView, type VideoPlayer } from 'expo-video';
import { Play } from 'lucide-react-native';
import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useFeedStore } from '@/store/feed-store';
import { useProfileStore } from '@/store/profile-store';
import { colors } from '@/theme';
import { type Reel } from '@/types';

export interface ReelVideoProps {
  reel: Reel;
  isActive: boolean;
}

// The player is a native object living outside React; mutating it is how
// expo-video is driven. Kept out of component scope for the compiler.
function syncPlayer(player: VideoPlayer, options: { muted: boolean; shouldPlay: boolean }) {
  player.muted = options.muted;
  if (options.shouldPlay && !player.playing) {
    player.play();
  } else if (!options.shouldPlay && player.playing) {
    player.pause();
  }
}

export function ReelVideo({ reel, isActive }: ReelVideoProps) {
  const muted = useFeedStore((state) => state.muted);
  const overridden = useFeedStore((state) => state.playbackOverrideReelId === reel.id);
  const togglePlayback = useFeedStore((state) => state.togglePlayback);
  const autoplay = useProfileStore((state) => state.settings.autoplayReels);

  // The user's tap flips whatever the autoplay preference would do.
  const shouldPlay = isActive && (overridden ? !autoplay : autoplay);
  const showPausedGlyph = isActive && !shouldPlay;

  const player = useVideoPlayer(reel.videoUrl, (instance) => {
    instance.loop = true;
  });

  const { status } = useEvent(player, 'statusChange', { status: player.status });

  useEffect(() => {
    syncPlayer(player, { muted, shouldPlay });
  }, [player, muted, shouldPlay]);

  const videoVisible = isActive && status === 'readyToPlay';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={shouldPlay ? 'Pause video' : 'Play video'}
      className="absolute h-full w-full"
      onPress={() => togglePlayback(reel.id)}
    >
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />

      {!videoVisible && (
        <Image
          source={{ uri: reel.thumbnailUrl }}
          className="absolute h-full w-full"
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      )}

      {showPausedGlyph && (
        <Animated.View
          entering={FadeIn.duration(160)}
          exiting={FadeOut.duration(160)}
          pointerEvents="none"
          className="absolute inset-0 items-center justify-center"
        >
          <View className="h-20 w-20 items-center justify-center rounded-full bg-overlay">
            <Play size={36} color={colors.foreground.DEFAULT} fill={colors.foreground.DEFAULT} />
          </View>
        </Animated.View>
      )}
    </Pressable>
  );
}

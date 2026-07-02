import { Volume2, VolumeX } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { useFeedStore } from '@/store/feed-store';
import { colors } from '@/theme';

export function MuteButton() {
  const muted = useFeedStore((state) => state.muted);
  const toggleMuted = useFeedStore((state) => state.toggleMuted);

  const Icon = muted ? VolumeX : Volume2;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={muted ? 'Unmute' : 'Mute'}
      onPress={toggleMuted}
      className="h-10 w-10 items-center justify-center rounded-full bg-overlay"
    >
      <Icon size={20} color={colors.foreground.DEFAULT} />
    </Pressable>
  );
}

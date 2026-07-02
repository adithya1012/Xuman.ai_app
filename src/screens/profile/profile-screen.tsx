import { UserRound } from 'lucide-react-native';

import { ComingSoon } from '@/components/shared/coming-soon';
import { colors } from '@/theme';

export function ProfileScreen() {
  return (
    <ComingSoon
      title="Profile"
      description="Your account, preferences, and settings are on the way."
      icon={<UserRound size={28} color={colors.foreground.secondary} />}
    />
  );
}

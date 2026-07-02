import { CalendarClock } from 'lucide-react-native';

import { ComingSoon } from '@/components/shared/coming-soon';
import { colors } from '@/theme';

export function MeetingsScreen() {
  return (
    <ComingSoon
      title="Meetings"
      description="Your upcoming and past consultation calls will live here."
      icon={<CalendarClock size={28} color={colors.foreground.secondary} />}
    />
  );
}

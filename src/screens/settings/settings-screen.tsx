import { router } from 'expo-router';
import { ChevronLeft, Moon } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/common';
import { SettingsRow } from '@/components/profile/settings-row';
import { useProfileStore } from '@/store/profile-store';
import { colors } from '@/theme';

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const settings = useProfileStore((state) => state.settings);
  const toggleSetting = useProfileStore((state) => state.toggleSetting);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center gap-md px-lg py-sm">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-background-elevated"
        >
          <ChevronLeft size={22} color={colors.foreground.DEFAULT} />
        </Pressable>
        <Text variant="heading">Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-xl p-lg">
        <View className="gap-md">
          <Text variant="heading">Playback</Text>
          <SettingsRow
            label="Autoplay reels"
            caption="Play videos automatically as you scroll"
            value={settings.autoplayReels}
            onToggle={() => toggleSetting('autoplayReels')}
          />
        </View>

        <View className="gap-md">
          <Text variant="heading">Notifications</Text>
          <SettingsRow
            label="Push notifications"
            caption="Booking updates and call reminders"
            value={settings.pushNotifications}
            onToggle={() => toggleSetting('pushNotifications')}
          />
          <SettingsRow
            label="Email updates"
            caption="Weekly highlights from creators you follow"
            value={settings.emailUpdates}
            onToggle={() => toggleSetting('emailUpdates')}
          />
        </View>

        <View className="gap-md">
          <Text variant="heading">Appearance</Text>
          <View className="flex-row items-center gap-md rounded-lg border border-border bg-background-subtle p-lg">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-background-elevated">
              <Moon size={18} color={colors.foreground.secondary} />
            </View>
            <View className="flex-1">
              <Text variant="body" className="font-semibold">
                Dark
              </Text>
              <Text variant="small">Xuman is designed dark-first</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

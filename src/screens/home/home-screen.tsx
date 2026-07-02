import { View } from 'react-native';

import { Avatar, Badge, Button, Card, Text } from '@/components/common';

export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-xl bg-background px-xl">
      <View className="items-center gap-sm">
        <Text variant="display">Xuman</Text>
        <Text variant="caption">Learn directly from the people who do it best</Text>
      </View>

      <Card className="w-full items-center gap-md">
        <Avatar name="Xuman Creator" size="lg" />
        <Badge label="Design System" variant="accent" />
        <Text variant="caption" className="text-center">
          Feed, profiles, and booking are on the way.
        </Text>
        <Button label="Get Started" className="self-stretch" />
      </Card>
    </View>
  );
}

"use client";

import { useTelegram } from "@/shared/hooks/useTelegram";
import { View } from "@/shared/layout/View";
import { Typography } from "@/shared/ui/Typography/Typography";

export default function Page() {
  const telegram = useTelegram();
  return (
    <View className="flex h-full w-full items-center justify-center">
      <Typography tag="h3">Play on mobile</Typography>
      <Typography tag="h3">Platform: {telegram?.platform}</Typography>
    </View>
  );
}

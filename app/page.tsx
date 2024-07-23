import { View } from "@/shared/layout/View";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/loading")
  return (
    <View fadeInOnLoad className="flex w-full items-center justify-center px-16">
      <h1>Ready to develop Telegram webapp</h1>
    </View>
  );
}

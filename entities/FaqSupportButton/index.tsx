"use client";

import { useTelegram } from "@/shared/hooks/useTelegram";
import { Button } from "@/shared/ui/Button/Button";
import toast from "react-hot-toast";

export const FaqSupportButton = () => {
  const telegram = useTelegram();

  const onRedirect = () => {
    if (!process.env.NEXT_PUBLIC_SUPPORT_LINK) {
      return toast.error("Can not redirect to support");
    }
    telegram?.openLink(process.env.NEXT_PUBLIC_SUPPORT_LINK);
  };

  return (
    <Button
      variant={"primary"}
      className={"fixed bottom-[112px] left-4 z-[10] w-[calc(100%-32px)] text-[18px] font-bold"}
      onClick={onRedirect}
    >
      Send A message
    </Button>
  );
};

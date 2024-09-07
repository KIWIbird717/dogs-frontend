"use client";

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { FaqHeader } from "@/widgets/FaqHeader";
import { FaqDescription } from "@/widgets/FaqDescription";
import { AccordionList } from "@/widgets/AccordionList";
import { Button } from "@/shared/ui/Button/Button";
import { Navbar } from "@/widgets/Navbar";
import { Input } from "@/shared/ui/Input";
// Gradient
import Gradient1 from "@/public/images/svg/faq/gradient1.svg";
import Gradient2 from "@/public/images/svg/faq/gradient2.svg";
import Gradient3 from "@/public/images/svg/faq/gradient3.svg";
import Gradient4 from "@/public/images/svg/faq/gradient4.svg";
import { useTelegram } from "@/shared/hooks/useTelegram";
import toast, { Toaster } from "react-hot-toast";

interface IFaqPageProps {}

const FaqPage: NextPage<IFaqPageProps> = () => {
  const telegram = useTelegram();

  const onRedirect = () => {
    if (!process.env.NEXT_PUBLIC_SUPPORT_LINK) {
      return toast.error("Can not redirect to support");
    }
    telegram?.openLink(process.env.NEXT_PUBLIC_SUPPORT_LINK);
  };

  return (
    <View
      fadeInOnLoad
      className="relative flex h-screen w-full flex-col gap-6 overflow-x-hidden bg-gradient-background px-4 pt-6"
    >
      <Toaster />
      <div className={"z-[10] flex flex-col gap-4"}>
        <FaqHeader />
        <FaqDescription />
        <Input placeholder={"Search Help"} isIcon />
      </div>

      <AccordionList />

      <Button
        variant={"primary"}
        className={"fixed bottom-[112px] left-4 z-[10] w-[calc(100%-32px)] text-[18px] font-bold"}
        onClick={onRedirect}
      >
        Send A message
      </Button>

      <Navbar />

      <Gradient1 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient2 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient3 className={"absolute left-0 top-0 z-[1]"} />
      <Gradient4 className={"absolute bottom-0 left-0 z-[1]"} />
    </View>
  );
};
export default FaqPage;

import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { FaqHeader } from "@/widgets/FaqHeader";
import { FaqDescription } from "@/widgets/FaqDescription";
import { AccordionList } from "@/widgets/AccordionList";
import { Navbar } from "@/widgets/Navbar";
import { Input } from "@/shared/ui/Input";
import { FaqSupportButton } from "@/entities/FaqSupportButton";
import { Gradient } from "@/shared/ui/Gradient";

interface IFaqPageProps {}

const FaqPage: NextPage<IFaqPageProps> = () => {
  return (
    <>
      <View
        fadeInOnLoad
        className="relative flex h-svh w-full flex-col gap-6 overflow-x-hidden px-4 pb-[60px] pt-6"
      >
        <div className={"z-[10] flex flex-col gap-4"}>
          <FaqHeader />
          <FaqDescription />
          <Input placeholder={"Search Help"} isIcon />
        </div>

        <AccordionList />

        <FaqSupportButton />

        <Navbar />
      </View>

      <Gradient.First className="absolute right-[-140%] top-[-30%]" />
      <Gradient.Second className="absolute bottom-[20%] left-[-40%] scale-150" />
    </>
  );
};
export default FaqPage;

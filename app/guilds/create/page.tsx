import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { Typography } from "@/shared/ui/Typography/Typography";
import { CreateGuildFields } from "@/widgets/CreateGuildFields";
import { Gradient } from "@/shared/ui/Gradient";

interface ICreateGuidPageProps {}

const CreateGuidPage: NextPage<ICreateGuidPageProps> = () => {
  return (
    <>
      <View
        fadeInOnLoad
        className="relative flex h-screen w-full flex-col gap-4 overflow-x-hidden px-4 pt-6"
      >
        <div className="flex h-full min-h-[calc(100vh+1px)] w-full flex-col gap-4">
          <div className={"z-[10] flex w-full flex-col gap-2 px-8"}>
            <Typography tag={"h1"} className={"text-center text-white-900"}>
              Guild creation
            </Typography>
            <Typography
              tag={"span"}
              className={"text-center text-[15px] font-normal leading-[18px] text-white-800"}
            >
              In this section you can create your pack
            </Typography>
          </div>

          <CreateGuildFields />
        </div>

        <Navbar />
      </View>

      <Gradient.First className="absolute top-[-30%] scale-150" />
      <Gradient.Second className="absolute bottom-[-10%] scale-150" />
    </>
  );
};
export default CreateGuidPage;

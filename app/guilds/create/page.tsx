import { NextPage } from "next";
import { View } from "@/shared/layout/View";
import { Navbar } from "@/widgets/Navbar";
import { Typography } from "@/shared/ui/Typography/Typography";
import { CreateGuildFields } from "@/widgets/CreateGuildFields";

import Gradient1 from "@/public/images/svg/guild/create/gradient/gradient1.svg"
import Gradient2 from "@/public/images/svg/guild/create/gradient/gradient2.svg"

interface ICreateGuidPageProps {
}

const CreateGuidPage: NextPage<ICreateGuidPageProps> = () => {
  return (
    <View fadeInOnLoad
          className="flex flex-col gap-4 w-full h-screen relative px-4 pt-6 overflow-hidden"
    >
      <div className={"w-full px-8 flex flex-col gap-2 z-[10]"}>
        <Typography tag={"h1"}
                    className={"text-center text-white-900"}

        >
          Creatures of the guild
        </Typography>
        <Typography tag={"span"}
                    className={"text-center text-[15px] leading-[18px] font-normal text-white-800"}

        >
          In this section you can create your pack
        </Typography>
      </div>

      <CreateGuildFields />
      <Navbar />

      <Gradient1 className={"absolute top-0 left-0 z-[1]"} />
      <Gradient2 className={"absolute bottom-0 left-0 z-[1]"} />
    </View>
  );
};
export default CreateGuidPage;
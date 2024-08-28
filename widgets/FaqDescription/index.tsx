import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IFaqDescriptionProps {}

export const FaqDescription: FC<IFaqDescriptionProps> = () => {
  return (
    <div className={"flex w-full flex-col gap-2"}>
      <Typography tag={"h2"} className={"font-normal text-white-900"}>
        We’re here to help you with anything and everything
      </Typography>
      <Typography tag={"span"} className={"text-white-800"}>
        At Dogs Bot, we expect you to be better and happier at the start of the day than you were
        yesterday. We've made sure you can share your concerns or check out the frequently asked
        questions listed below.
      </Typography>
    </div>
  );
};

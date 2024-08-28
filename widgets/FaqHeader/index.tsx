import { FC } from "react";
import FaqIcon from "@/public/images/svg/faq/faq.svg";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IFaqHeaderProps {}

export const FaqHeader: FC<IFaqHeaderProps> = () => {
  return (
    <div className={"flex h-[56px] w-full items-center gap-2"}>
      <div>
        <FaqIcon />
      </div>
      <Typography tag={"h2"} className={"text-white-900"}>
        FAQ
      </Typography>
    </div>
  );
};

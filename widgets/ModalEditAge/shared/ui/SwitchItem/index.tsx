import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Switch } from "@/shared/ui/Switch/switch";

interface ISwitchItemProps {
  title: string
}

export const SwitchItem: FC<ISwitchItemProps> = (
  {title}
) => {
  return (
    <div className={"w-full flex justify-between items-center"}>
      <Typography tag={"h3"}
                  className={"font-normal text-white-900"}
      >
        {title}
      </Typography>
      <Switch />
    </div>
  );
};
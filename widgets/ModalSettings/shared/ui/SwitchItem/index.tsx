import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Switch } from "@/shared/ui/Switch/switch";
import * as SwitchPrimitives from "@radix-ui/react-switch";

interface ISwitchItemProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  title: string;
}

export const SwitchItem: FC<ISwitchItemProps> = ({ title, ...props }) => {
  return (
    <div className={"flex w-full items-center justify-between"}>
      <Typography tag={"h3"} className={"font-normal text-white-900"}>
        {title}
      </Typography>
      <Switch {...props} />
    </div>
  );
};

import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";

interface ILabelProps {
  keyForLabel: string
  label: string
  labelDescription?: string
}

export const Label: FC<ILabelProps> = (
  {
    labelDescription,
    keyForLabel,
    label
  }
) => {
  return (
    <label htmlFor={keyForLabel}
           className={"w-full flex items-center gap-2"}
    >
      <Typography tag={"p"}
                  className={"text-[17px] font-bold leading-6 text-white-900"}
      >
        {label}
      </Typography>

      {!!labelDescription && <Typography tag={"span"}
                   className={"text-[15px] leading-[18px] font-bold text-white-800"}
      >
        ({labelDescription})
      </Typography>}
    </label>
  );
};
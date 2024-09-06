import { FC, ReactNode } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { cn } from "@/shared/lib/utils/cn";

interface ILabelProps {
  keyForLabel?: string;
  label?: string | ReactNode;
  labelDescription?: string | ReactNode;
  className?: string;
}

export const Label: FC<ILabelProps> = ({ labelDescription, keyForLabel, label, className }) => {
  return (
    <label htmlFor={keyForLabel} className={cn(className, "flex w-full items-center gap-2")}>
      <Typography tag={"p"} className={"text-[17px] font-bold leading-6 text-white-900"}>
        {label}
      </Typography>

      {!!labelDescription && (
        <Typography tag={"span"} className={"text-[15px] font-bold leading-[18px] text-white-800"}>
          ({labelDescription})
        </Typography>
      )}
    </label>
  );
};

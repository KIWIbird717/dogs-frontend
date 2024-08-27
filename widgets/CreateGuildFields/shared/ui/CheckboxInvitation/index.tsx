import { FC } from "react";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Typography } from "@/shared/ui/Typography/Typography";
import { twMerge } from "tailwind-merge";
import { JoinMethod } from "@/shared/lib/services/guilds/guilds";

interface ICheckboxInvitationProps {
  onToggleJoinMethod: () => void;
  joinMethod: JoinMethod;
}

export const CheckboxInvitation: FC<ICheckboxInvitationProps> = ({
  onToggleJoinMethod,
  joinMethod,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms1" onClick={onToggleJoinMethod} joinMethod={joinMethod} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="peer-disabled:cursor-not-allowed peer-disabled:opacity-30"
        >
          <Typography
            tag={"p"}
            className={twMerge(
              "text-[16px] font-medium leading-6 text-[#4D4A65]",
              joinMethod === "bylink" && "text-white-900",
            )}
          >
            By invitation only
          </Typography>
        </label>
      </div>
    </div>
  );
};

import { FC } from "react";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Typography } from "@/shared/ui/Typography/Typography";
import { twMerge } from "tailwind-merge";
import { JoinMethod } from "@/shared/lib/services/guilds/guilds";

interface ICheckboxInvitationProps {
  onToggleJoinMethod: () => void
  joinMethod: JoinMethod
}

export const CheckboxInvitation: FC<ICheckboxInvitationProps> = (
  {
    onToggleJoinMethod,
    joinMethod
  }
) => {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox id="terms1"
                onClick={onToggleJoinMethod}
                joinMethod={joinMethod}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="peer-disabled:cursor-not-allowed peer-disabled:opacity-30"
        >
          <Typography tag={"p"}
                      className={twMerge(
                        "font-medium leading-6 text-[16px] text-[#4D4A65]",
                        joinMethod === "bylink" && "text-white-900"
                      )}
          >
            By invitation only
          </Typography>
        </label>
      </div>
    </div>
  );
};
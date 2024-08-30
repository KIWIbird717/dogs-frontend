import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "@/shared/ui/Typography/Typography";
import ArrowRightIcon from "@/public/images/svg/arrow-right.svg";
import { Button } from "@/shared/ui/Button/Button";

interface ILanguageToggleProps {
  onOpenLanguageChange: () => void
  language: "English" | "Russian"
}

export const LanguageToggle: FC<ILanguageToggleProps> = (
  {
    onOpenLanguageChange,
    language
  }
) => {
  return (
    <Button onClick={onOpenLanguageChange}
            className={twMerge(
              "flex h-[56px] w-full items-center justify-between rounded-xl border border-black-300 bg-black-800 p-3",
            )}
    >
      <Typography tag={"h3"} className={"font-normal text-[20px] leading-6"}>
        Bot Language
      </Typography>

      <div className={"flex w-fit gap-1"}>
        <Typography tag={"span"} className={"text-[17px] font-normal leading-6 text-white-800"}>
          {language}
        </Typography>
        <ArrowRightIcon />
      </div>
    </Button>
  );
};
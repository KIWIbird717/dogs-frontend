import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import TickIcon from "@/public/images/svg/modal/tick.svg";

interface ILanguageProps {
  language: "English" | "Russian",
  onCloseWindowOrLang:  () => void,
  onToggleLanguage: (lang: string) => void,
}

export const Language: FC<ILanguageProps> = (
  {
    language,
    onCloseWindowOrLang,
    onToggleLanguage
  }
) => {
  return (
    <>
      <Button
        className={"leading-4.5 h-[18px] w-fit !p-0 text-[15px] font-normal"}
        onClick={onCloseWindowOrLang}
      >
        Back to settings
      </Button>

      <div className={"flex w-full flex-col gap-6"}>
        <Typography tag={"h2"} className={"font-normal text-white-900"}>
          Settings
        </Typography>

        <div className={"flex w-full flex-col gap-4"}>
          <Button className={"justify-between h-auto"}
                  onClick={() => onToggleLanguage("English")}
          >
            <Typography tag={"h3"}
                        className={"text-[20px] leading-6 font-normal text-white-900"}
            >
              English ( United States )
            </Typography>
            {language === "English" && <TickIcon />}
          </Button>
          <Button className={"justify-between h-auto"}
                  onClick={() => onToggleLanguage("Russian")}
          >
            <Typography tag={"h3"}
                        className={"text-[20px] leading-6 font-normal text-white-900"}
            >
              Русский ( Россия )
            </Typography>
            {language === "Russian" && <TickIcon />}
          </Button>
        </div>
      </div>

      <div
        className={
          "absolute left-0 top-0 z-[-1] h-full w-full rounded-xl bg-black-750 backdrop-blur-lg"
        }
      />
    </>
  );
};
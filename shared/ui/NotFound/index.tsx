import { FC } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";

interface INotFoundProps {
  title: string;
  searchValue: string;
  onClick: () => void;
}

export const NotFound: FC<INotFoundProps> = ({ title, searchValue, onClick }) => {
  return (
    <div className={"flex w-full flex-col gap-2"}>
      <Typography tag={"h2"} className={"text-white-900"}>
        No {title} Found
      </Typography>
      <Typography tag={"span"} className={"text-[15px] font-normal leading-[18px] text-white-800"}>
        Your search “{searchValue}” did not match any {title}.&nbsp;
        <button
          onClick={onClick}
          className={"h-fit w-fit p-0 text-[15px] font-normal leading-[18px] text-white-900"}
        >
          Please try again.
        </button>
      </Typography>
    </div>
  );
};

import { FC, ReactNode } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IBlockProps {
  icon: ReactNode;
  title: string;
  onClick: () => void;
}

export const Block: FC<IBlockProps> = ({ icon, title, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={
        "flex w-fit gap-2 rounded-xl border-[2px] border-black-400 bg-black-400 px-3 py-2 shadow-buttonNoAccent"
      }
    >
      <div>{icon}</div>
      <Typography tag={"p"} className={"text-[17px] font-bold leading-6 text-white-900"}>
        {title}
      </Typography>
    </Button>
  );
};

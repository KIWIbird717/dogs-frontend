import { FC, ReactNode } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { cn } from "@/shared/lib/utils/cn";

interface IBlockProps {
  icon: ReactNode;
  title: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Block: FC<IBlockProps> = ({ icon, title, onClick, className, ...props }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        className,
        "flex w-fit gap-2 rounded-xl border-[2px] border-black-400 bg-black-400 px-3 py-2 shadow-buttonNoAccent",
      )}
      {...props}
    >
      <div>{icon}</div>
      <Typography
        tag={"p"}
        className={"w-full text-[17px] font-bold tabular-nums leading-6 text-white-900"}
      >
        {title}
      </Typography>
    </Button>
  );
};

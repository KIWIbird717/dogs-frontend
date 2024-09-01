import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IInviteBlockProps {
  className?: string;
  index: number;
  children: ReactNode;
}

export const InviteBlock: FC<IInviteBlockProps> = ({
  className,
  index,
  children
}) => {


  return (
    <div
      className={twMerge(
        "flex flex-col gap-2 rounded-xl border border-black-300 p-3 shadow-buttonNoAccent",
        index < 2 && "w-[calc(50%-4px)]",
        index === 2 && "w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};

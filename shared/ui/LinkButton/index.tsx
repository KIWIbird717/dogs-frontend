import { cn } from "@/shared/lib/utils/cn";
import Link, { LinkProps } from "next/link";
import React, { Children, FC, HTMLProps, ReactNode } from "react";
import { ButtonNS } from "../Button/Button";

type LinkButtonProps = {
  disabled?: boolean;
} & LinkProps &
  HTMLProps<HTMLAnchorElement>;

export const LinkButton: FC<LinkButtonProps> = ({ children, className, disabled, ...props }) => {
  return (
    <Link
      {...props}
      className={cn(
        "shadow-fix h-[48px] w-[48px] rounded-xl border border-black-400 bg-black-400 p-3 shadow-buttonNoAccent transition-all duration-75 active:translate-y-1 active:scale-95",
        disabled &&
          "pointer-events-none touch-none bg-black-400 text-white-800 opacity-45 shadow-none",
      )}
    >
      {children}
    </Link>
  );
};

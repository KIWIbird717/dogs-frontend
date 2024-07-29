"use client";

import { cn } from "../../lib/utils/cn";
import { useAnimate } from "framer-motion";
import type { ComponentProps, FC, ReactNode } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

export namespace ButtonNS {
  // варианты стилей кнопок
  export const variants = {
    primary: {
      className: "bg-blue-900 text-white shadow-buttonAccent",
    },
    deepBlue: {
      className: "bg-gradient-button-accent text-white-900 shadow-buttonAccent",
    },
    noAccent: {
      className: "bg-black-400 text-white-800",
    },
    bowl: {
      className:
        "h-[68px] p-3 bg-black-400 border border-black-300 shadow-buttonNoAccent rounded-xl",
    },
    select: {
      className:
        "h-[56px] py-3 px-4 bg-black-400 border border-black-300 rounded-xl text-[18px] text-white-900 font-bold leading-6",
    },
    default: {
      className: "h-fit w-fit p-0",
    },
  } as const;

  // дефолтный вариант кнопки (если в пропсах не был указан параметр variant)
  export const DEFAULT_VARIANT = {
    className: "text-white-800 text-[18px] font-normal leading-6",
  };
  // варианты размеров кнопок

  // классы, которые используются всеми вариантами кнопок
  export const DEFAULT_CLASSES = "w-full h-[56px] flex items-center justify-center rounded-xl";

  // ДАННЫЕ ЗНАЧЕНИЯ ИСПОЛЬЗУЮТСЯ И ВНЕ КОМПОНЕНТА!!!
  export const animDuration = 0.15; // sec скорость анимации кнопки
  export const halfAnimDuration = animDuration / 2; // sec
  export type Props = {
    children?: ReactNode | string;
    variant?: keyof typeof variants;
    className?: string;
    icon?: ReactNode;
    isSelected?: boolean;
  } & ComponentProps<"button">;
}

export const Button: FC<ButtonNS.Props> = ({ children, icon, onClick, ...props }) => {
  const { isSelected, className, disabled, variant, ...rest } = props;

  const [scope, animate] = useAnimate();

  const variantClassName = variant
    ? ButtonNS.variants[variant].className
    : ButtonNS.DEFAULT_VARIANT.className;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    animate([
      [scope.current, { scale: 0.95, y: 5 }, { duration: ButtonNS.halfAnimDuration }],
      [scope.current, { scale: 1, y: 0 }, { duration: ButtonNS.halfAnimDuration }],
    ]);
    onClick && onClick(event);
  };
  return (
    <button
      {...rest}
      ref={scope}
      onClick={handleClick}
      disabled={disabled}
      className={twMerge(
        variantClassName,
        ButtonNS.DEFAULT_CLASSES,
        className,
        isSelected && "border-blue-800 bg-black-800",
        disabled && "bg-black-400 text-white-800 shadow-none",
      )}
    >
      {icon ? (
        <div className={"flex w-full justify-between"}>
          {children}
          <div className={twMerge("flex items-center", disabled && "hidden")}>{icon}</div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

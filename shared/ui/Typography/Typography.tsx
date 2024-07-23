import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span";

export type TypographyProps<Tag extends TypographyTag> = ComponentProps<Tag> & {
  tag?: TypographyTag;
  children: ReactNode;
};

export const Typography = <Tag extends TypographyTag = "div">({
  tag = "div",
  children,
  className,
  ...props
}: TypographyProps<Tag>) => {
  const Component = tag;

  const DEFAULT_CLASSES = twMerge("");

  return (
    <Component className={twMerge(className, DEFAULT_CLASSES)} {...props}>
      {children}
    </Component>
  );
};

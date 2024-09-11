import { FC } from "react";
import GradientFirsImg from "@/public/images/gradients/gradient-1.png";
import GradientSecondImg from "@/public/images/gradients/gradient-2.png";
import { cn } from "@/shared/lib/utils/cn";

export namespace Gradient {
  type GradientProps = {
    className?: string;
  };

  export const First: FC<GradientProps> = (props) => {
    return (
      <div className={cn(props.className)}>
        <img src={GradientFirsImg.src} alt="gradient-1" />
      </div>
    );
  };

  export const Second: FC<GradientProps> = (props) => {
    return (
      <div className={cn(props.className)}>
        <img src={GradientSecondImg.src} alt="gradient-2" />
      </div>
    );
  };
}

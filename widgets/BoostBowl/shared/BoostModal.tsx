import dynamic from "next/dynamic";
import { FC, ReactNode, useState } from "react";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

type BoostModelProps = {
  icon?: ReactNode;
  title: string;
  boostInfo?: ReactNode | string;
  description?: string;
  price?: number;
  isOpen: boolean;
};
export const BoostModal: FC<BoostModelProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MotionDiv className="absolute left-0 top-0 w-full rounded-t-[12px] border-[1px] border-[#4F4F4F] p-[16px] shadow-buttonNoAccent">
      <div className="h-[36px] w-full">
        <button className="h-full pr-[10px] text-white">Cancel</button>
      </div>
      sajdhf
    </MotionDiv>
  );
};

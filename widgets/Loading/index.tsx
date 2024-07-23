"use client"

import { FC } from "react";
import BoneIcon from "@/public/images/svg/bone.svg";
import { Typography } from "@/shared/ui/Typography/Typography";
import Lottie from 'react-lottie';
import animationData from '@/public/lotties/loading.json';

interface IModalLoadingProps {
}

export const ModalLoading: FC<IModalLoadingProps> = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  // left: calc(50% - 296px/2 - 2px);
  //       top: calc(50% - 184px/2 + 4.5px);

  return (
    <div
      className={"flex flex-col gap-4 w-[296px] px-4 pb-4 pt-6 rounded-xl border-[1px] border-black-300 shadow-loadingModal backdrop-blur-[16px] bg-black-750"}>
      <div className={"w-full flex flex-col gap-2"}>
        <div className={"flex gap-2"}>
          <div>
            <BoneIcon />
          </div>
          <div>
            <Typography tag={"h2"}
                        className={"font-epilogue font-normal"}
            >
              DOGS
            </Typography>
          </div>
        </div>
        <div className={"w-[128px]"}>
          <Typography tag={"span"}
                      className={"text-white-800 leading-[18px] text-[15px]"}
          >
            Welcome to the future of NFT
          </Typography>
        </div>
      </div>

      <div className={"w-full h-[52px] flex"}>
        <div className={"w-1/2 h-full flex items-center"}>
          <Typography tag={"p"}
                      className={"text-[20px] text-white-900"}
          >
            Loading...
          </Typography>
        </div>
        <div className={"w-1/2 h-full"}>
          <Lottie
            options={defaultOptions}
            height={52}
            width={130}
          />
        </div>
      </div>
    </div>
  );
};
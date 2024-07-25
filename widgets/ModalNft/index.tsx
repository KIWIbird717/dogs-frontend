import { FC } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import BoneIcon from "@/public/images/svg/bone.svg";
import Link from "next/link";

interface IModalNftProps {
}

export const ModalNft: FC<IModalNftProps> = () => {
  return (
    <div
      className={"flex flex-col gap-4 w-full px-4 py-6 rounded-xl border-[1px] border-black-300 shadow-nftModal z-[10] relative"}
    >
      <div className={"w-full flex flex-col gap-8"}>
        <div className={"w-full flex flex-col gap-2"}>
          <div className={"w-full flex gap-2"}>
            <div>
              <BoneIcon />
            </div>
            <Typography tag={"h2"}
                        className={"text-[24px] leading-8 font-bold text-white-900"}
            >
              DOGS
            </Typography>
          </div>

          <Typography tag={"p"}
                      className={"text-white-900 text-[17px] leading-6 font-bold"}
          >
            We apologize, but the <Link href={"/main"}  className={"text-blue-900 text-[17px] font-bold leading-6"}>NFT</Link> is <br/>
            currently <Link href={"/main"}  className={"text-blue-900 text-[17px] font-bold leading-6"}>in development.</Link>
          </Typography>
        </div>

        <div>
          <Typography tag={"p"}
                      className={"text-white-900 text-[17px] leading-6 font-normal"}
          >
            But in the not too distant future, you will be able to get it for free if you stay with us. There&apos;s a
            lot more to come.
          </Typography>
        </div>

        <div>
          <Typography tag={"span"}
                      className={"text-white-800 font-normal"}
          >
            Click <Link href={"/main"} className={"text-blue-900 text-[15px] font-bold leading-6"}>More</Link> and find out what&apos;s in store for you.
          </Typography>
        </div>
      </div>

      <Button variant={"primary"}
              className={"text-white-900 text-[18px] leading-6 font-bold"}
      >
        More
      </Button>

      <div
        className={"w-full h-full absolute left-0 top-0 backdrop-blur-lg bg-black-750 rounded-xl z-[-1]"} />
    </div>
  );
};
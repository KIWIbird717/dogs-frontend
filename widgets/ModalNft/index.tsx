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
      className={
        "relative z-[10] flex w-full flex-col gap-4 rounded-xl border-[1px] border-black-300 px-4 py-6 shadow-nftModal"
      }
    >
      <div className={"flex w-full flex-col gap-8"}>
        <div className={"flex w-full flex-col gap-2"}>
          <div className={"flex w-full gap-2"}>
            <div>
              <BoneIcon />
            </div>
            <Typography tag={"h2"} className={"text-[24px] font-bold leading-8 text-white-900"}>
              DOGS
            </Typography>
          </div>

          <Typography tag={"p"} className={"text-[17px] font-bold leading-6 text-white-900"}>
            We apologize, but the{" "}
            <Link href={"/main"} className={"text-[17px] font-bold leading-6 text-blue-900"}>
              NFT
            </Link>{" "}
            is <br />
            currently{" "}
            <Link href={"/main"} className={"text-[17px] font-bold leading-6 text-blue-900"}>
              in development.
            </Link>
          </Typography>
        </div>

        <div>
          <Typography tag={"p"} className={"text-[17px] font-normal leading-6 text-white-900"}>
            But in the not too distant future, you will be able to get it for free if you stay with
            us. There&apos;s a lot more to come.
          </Typography>
        </div>

        <div>
          <Typography tag={"span"} className={"font-normal text-white-800"}>
            Click{" "}
            <Link href={"/main"} className={"text-[15px] font-bold leading-6 text-blue-900"}>
              More
            </Link>{" "}
            and find out what&apos;s in store for you.
          </Typography>
        </div>
      </div>

      <Button variant={"primary"}
              className={"text-[18px] font-bold leading-6 text-white-900"}
      >
        <Link href={"/main"}>
          More
        </Link>
      </Button>

      <div
        className={
          "absolute left-0 top-0 z-[-1] h-full w-full rounded-xl bg-black-750 backdrop-blur-lg"
        }
      />
    </div>
  );
};

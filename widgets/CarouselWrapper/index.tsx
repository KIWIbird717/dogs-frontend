import { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/Carousel";
import Image from "next/image";
import { IRank } from "@/app/stats/page";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useRouter } from "next/navigation";

interface ICarouselWrapperProps {
  handlePrevious: () => void;
  handleNext: () => void;
  ranks: IRank[];
}

export const CarouselWrapper: FC<ICarouselWrapperProps> = ({
  handleNext,
  handlePrevious,
  ranks,
}) => {
  const { push } = useRouter();

  const handlerRedirect = () => push("stats/1");

  return (
    <div className={"h-[403px] w-full"}>
      <Carousel>
        <CarouselContent>
          {ranks.map((item, i) => {
            return (
              <CarouselItem key={i} className={"flex flex-col items-center justify-center gap-2"}>
                <button onClick={handlerRedirect}>
                  <Image
                    src={item.image}
                    alt={`image+${i}`}
                    className={"h-[304px] w-[296px] object-cover"}
                  />
                </button>
                <div className={"flex w-full flex-col items-center gap-[11px]"}>
                  <div className={"flex w-full flex-col justify-center"}>
                    <Typography tag={"h1"} className={"text-center text-white-900"}>
                      {item.value}
                    </Typography>
                    <Typography
                      tag={"p"}
                      className={"text-center text-[17px] font-normal leading-6 text-white-900"}
                    >
                      {item.description}
                    </Typography>
                  </div>

                  <div
                    className={"relative h-[8px] w-[296px] rounded-[32px] border border-white-900"}
                  >
                    <div
                      className={
                        "absolute -bottom-[2px] -left-[2px] z-[10] h-[10px] w-[45%] rounded-[32px] border-none bg-gradient-button-accent"
                      }
                    />
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className={"left-0 top-[40%]"} onClick={handlePrevious} />
        <CarouselNext className={"right-0 top-[40%]"} onClick={handleNext} />
      </Carousel>
    </div>
  );
};

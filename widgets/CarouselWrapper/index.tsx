import { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/Carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/Carousel";
import Image from "next/image";
import { IRank } from "@/app/leaderboard/page";
import { Typography } from "@/shared/ui/Typography/Typography";

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
  return (
    <div className={"h-[403px] w-full"}>
      <Carousel>
        <CarouselContent>
          {ranks.map((item, i) => {
            return (
              <CarouselItem key={i} className={"flex flex-col items-center justify-center gap-2"}>
                <div>
                  <Image
                    src={item.image}
                    alt={`image+${i}`}
                    className={"h-[304px] w-[296px] object-cover"}
                  />
                </div>
                <div className={"flex w-full flex-col"}>
                  <Typography tag={"h1"}>{item.value}</Typography>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className={"left-0"} onClick={handlePrevious} />
        <CarouselNext className={"right-0"} onClick={handleNext} />
      </Carousel>
    </div>
  );
};

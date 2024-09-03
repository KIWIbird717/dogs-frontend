import { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/Carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ILeague } from "../StatsMain/shared/constants/leagues";

interface ICarouselWrapperProps {
  handlePrevious: () => void;
  handleNext: () => void;
  ranks: ILeague[];
}

export const CarouselWrapper: FC<ICarouselWrapperProps> = ({
  handleNext,
  handlePrevious,
  ranks,
}) => {
  const handlerRedirect = () => {};

  return (
    <div className={"h-[304px] w-full"}>
      <Carousel>
        <CarouselContent>
          {ranks.map((item, i) => {
            return (
              <CarouselItem key={i} className={"flex flex-col items-center justify-center gap-2"}>
                <button onClick={handlerRedirect}>
                  <Image
                    src={item.image}
                    alt={`carousel-image-${i}`}
                    className={"h-[304px] w-[296px] object-cover"}
                  />
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          className={"left-0 top-[40%] h-full w-full translate-x-[-45%]"}
          onClick={handlePrevious}
        />
        <CarouselNext
          className={"right-0 top-[40%] h-full w-full translate-x-[45%]"}
          onClick={handleNext}
        />
      </Carousel>
    </div>
  );
};

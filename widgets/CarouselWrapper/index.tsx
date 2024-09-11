import { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/Carousel";
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
                  <img
                    src={item.image.src}
                    alt={`carousel-image-${i}`}
                    className={"ml-[10px] h-[304px] w-[296px] object-contain"}
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

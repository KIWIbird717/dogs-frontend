import { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from "@/shared/ui/Carousel";
import { ILeague } from "../StatsMain/shared/constants/leagues";
import Image from "next/image";
import { UseEmblaCarouselType } from "embla-carousel-react";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";

export interface ICarouselWrapperProps {
  handlePrevious: () => void;
  handleNext: () => void;
  ranks: ILeague[];
  myLeague?: UserSlice.IUserSlice["league"];
}

export const CarouselWrapper: FC<ICarouselWrapperProps> = (props) => {
  return (
    <div className={"h-[304px] w-full"}>
      <Carousel myLeague={props.myLeague}>
        <CarouselContent>
          {props.ranks.map((item, i) => {
            return (
              <CarouselItem key={i} className={"flex flex-col items-center justify-center gap-2"}>
                <button>
                  <Image
                    src={item.image}
                    alt={`carousel-image-${i}`}
                    className={"ml-[10px] h-[304px] w-[296px] object-contain"}
                    width={296}
                    height={304}
                  />
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          className={"left-0 top-[40%] h-full w-full translate-x-[-45%]"}
          onClick={props.handlePrevious}
        />
        <CarouselNext
          className={"right-0 top-[40%] h-full w-full translate-x-[45%]"}
          onClick={props.handleNext}
        />
      </Carousel>
    </div>
  );
};

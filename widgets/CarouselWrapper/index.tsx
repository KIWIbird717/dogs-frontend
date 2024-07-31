import { FC } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/Carousel";
import Image from "next/image";
import { IRank } from "@/app/stats/page";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useRouter } from "next/navigation";

interface ICarouselWrapperProps {
  handlePrevious: () => void;
  handleNext: () => void;
  ranks: IRank[];
}

export const CarouselWrapper: FC<ICarouselWrapperProps> = (
  {
    handleNext,
    handlePrevious,
    ranks,
  },
) => {
  const { push } = useRouter();

  const handlerRedirect = () => push("stats/1");

  return (
    <div className={"w-full h-[403px]"}>
      <Carousel>
        <CarouselContent>
          {ranks.map((item, i) => {
            return <CarouselItem key={i}
                                 className={"flex flex-col items-center gap-2 justify-center"}

            >
              <button onClick={handlerRedirect}>
                <Image src={item.image}
                       alt={`image+${i}`}
                       className={"object-cover w-[296px] h-[304px]"}
                />
              </button>
              <div className={"w-full flex flex-col items-center gap-[11px]"}>
                <div className={"w-full flex flex-col justify-center"}>
                  <Typography tag={"h1"}
                              className={"text-center text-white-900"}
                  >
                    {item.value}
                  </Typography>
                  <Typography tag={"p"}
                              className={"text-center font-normal text-[17px] leading-6 text-white-900"}
                  >
                    {item.description}
                  </Typography>
                </div>

                <div className={"relative w-[296px] h-[8px] border border-white-900 rounded-[32px]"}>
                  <div
                    className={"absolute w-[45%] h-[10px] -left-[2px] -bottom-[2px] rounded-[32px] border-none bg-gradient-button-accent z-[10]"} />
                </div>
              </div>

            </CarouselItem>;
          })}

        </CarouselContent>
        <CarouselPrevious className={"left-0 top-[40%]"} onClick={handlePrevious} />
        <CarouselNext className={"right-0 top-[40%]"} onClick={handleNext} />
      </Carousel>
    </div>
  );
};
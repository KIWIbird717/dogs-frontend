"use client";

import { FC, useCallback, useMemo, useRef, useState } from "react";
import { CarouselWrapper } from "@/widgets/CarouselWrapper";
import { GuildPlayers } from "@/widgets/GuildPlayers";
import BronzeImage from "@/public/images/ranks/bronze.png";
import SilverImage from "@/public/images/ranks/silver.png";
import GoldImage from "@/public/images/ranks/gold.png";
import DiamondImage from "@/public/images/ranks/diamond.png";
import MasterImage from "@/public/images/ranks/master.png";
import GangsterImage from "@/public/images/ranks/gangster.png";
import BossImage from "@/public/images/ranks/boss.png";
import { GuildPlayerItem } from "@/widgets/GuildPlayers/ui/GuildPlayerItem";
import { useUser } from "@/shared/hooks/useUser";
import { Button } from "@/shared/ui/Button/Button";
import { StatsService } from "@/shared/lib/services/stats/stats";
import { Progress } from "@/widgets/StatsMain/entities/Progress";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { SpinnerCircularFixed } from "spinners-react";

interface IStatsMainProps {}

export interface IRank {
  rank: string;
  image: any;
}

const ranks: IRank[] = [
  {
    rank: "bronze",
    image: BronzeImage,
  },
  {
    rank: "silver",
    image: SilverImage,
  },
  {
    rank: "gold",
    image: GoldImage,
  },
  {
    rank: "diamond",
    image: DiamondImage,
  },
  {
    rank: "master",
    image: MasterImage,
  },
  {
    rank: "gangster",
    image: GangsterImage,
  },
  {
    rank: "boss",
    image: BossImage,
  },
];

export const StatsMain: FC<IStatsMainProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useUser();
  const { _id, guildName } = user;

  const fetchUsers = async ({ pageParam }: { pageParam: number }) => {
    const { data } = await StatsService.getLeagueLeaders({
      start: pageParam,
      pagination: 50,
      league: currentSlide + 1,
    });

    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ["statsUsersByLevel", currentSlide],
    queryFn: fetchUsers,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.leaders.length > 0 ? lastPageParam + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  const flattenedData = useMemo(
    () => (data ? data.pages.flatMap((page) => page.leaders) : []),
    [data, currentSlide],
  );

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, hasNextPage],
  );

  const currentUser = useMemo(() => {
    const index = flattenedData.findIndex((user) => user._id === _id);
    return index !== -1 ? { ...flattenedData[index], serialNumber: index + 1 } : null;
  }, [_id, flattenedData]);

  const currentRank = useMemo(() => ranks[currentSlide].rank, [currentSlide]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? ranks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === ranks.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={"z-[10] flex w-full flex-col gap-4"}>
      <div className={"flex flex-col gap-2 pb-2"}>
        <CarouselWrapper handlePrevious={handlePrevious} handleNext={handleNext} ranks={ranks} />
        <Progress currentRank={currentRank}
                  serialNumber={data?.pages[0].myLeague || 0}
                  statusBar={data?.pages[0].statusBar}
        />
      </div>

      <div className={"flex flex-col gap-[20px] pb-[100px]"}>
        <GuildPlayers
          title={"Leaderboard Legue"}
          players={flattenedData}
          // classNameList={"pb-[190px]"}
          classNameList={"pb-[60px]"}
        />

        {isFetching && (
          <div className={"flex w-full items-center justify-center"}>
            <SpinnerCircularFixed color={"#fff"} enabled={isFetching} size={40} />
          </div>
        )}

        {flattenedData.length > 0 && (
          <div ref={lastElementRef} className="bg-transparent h-[5px] w-full" />
        )}
      </div>

      {currentUser && (
        <Button
          className={
            "fixed bottom-[55px] left-0 z-[11] flex h-[112px] w-full items-start rounded-xl border-t border-t-black-300 bg-black-400 shadow-buttonNoAccent backdrop-blur-[16px]"
          }
        >
          <GuildPlayerItem
            id={currentUser._id}
            title={currentUser.username}
            league={currentUser?.guild ? currentUser.guild : "-"}
            avatarUrl={""}
            coins={currentUser.balance}
            index={data?.pages[0].myPlace! - 1}
            className={"border-none shadow-none"}
          />
        </Button>
      )}
    </div>
  );
};

"use client";

import { FC, useCallback, useMemo, useRef, useState } from "react";
import { CarouselWrapper } from "@/widgets/CarouselWrapper";
import { GuildPlayers } from "@/widgets/GuildPlayers";
import { GuildPlayerItem } from "@/widgets/GuildPlayers/ui/GuildPlayerItem";
import { StatsService } from "@/shared/lib/services/stats/stats";
import { Progress } from "@/widgets/StatsMain/entities/Progress";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SpinnerCircularFixed } from "spinners-react";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";
import { AnimatePresence } from "framer-motion";
import { leagues } from "./shared/constants/leagues";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));

interface IStatsMainProps {}

export const StatsMain: FC<IStatsMainProps> = () => {
  const me = useAppSelector((store) => store.user);
  const [currentSlide, setCurrentSlide] = useState(me.league - 1);
  const currentRank = leagues[currentSlide].rank;
  const PAGINATION = 50;

  const fetchUsers = async ({ pageParam }: { pageParam: number }) => {
    const { data } = await StatsService.getLeagueLeaders({
      start: pageParam * PAGINATION,
      pagination: PAGINATION,
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

  const isMyRank = currentSlide + 1 === data?.pages[0].myLeague;

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

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? leagues.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === leagues.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={"z-[10] flex w-full flex-col gap-4"}>
      <div className={"flex flex-col gap-2 pb-2"}>
        <CarouselWrapper handlePrevious={handlePrevious} handleNext={handleNext} ranks={leagues} />

        <Progress
          currentRank={currentRank}
          serialNumber={data?.pages[0].myPlace || 0}
          statusBar={data?.pages[0].statusBar}
          isMyPlaceVisible={isMyRank}
          isProgressVisible={isMyRank}
        />
      </div>

      <div className={"flex flex-col gap-[20px] pb-[130px]"}>
        <GuildPlayers
          title={"Leaderboard Legue"}
          leaders={flattenedData}
          classNameList={"pb-[60px]"}
          isDataLoading={isFetching}
        />

        {isFetching && <LoadingSinner />}

        {flattenedData.length > 0 && (
          <div ref={lastElementRef} className="bg-transparent h-[5px] w-full" />
        )}
      </div>

      <AnimatePresence>
        {me && isMyRank && (
          <MotionDiv
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            transition={{ type: "tween" }}
            className={
              "shadow-fix fixed bottom-[55px] left-0 z-[11] flex h-[112px] w-full items-start rounded-xl border-t border-t-black-300 bg-black-400 shadow-buttonNoAccent backdrop-blur-[16px]"
            }
          >
            <GuildPlayerItem
              id={me._id}
              title={me.username}
              league={me?.guildName ? me.guildName : "-"}
              avatarUrl={""}
              coins={me.balance}
              index={data?.pages[0].myPlace! - 1}
              className={"border-none shadow-none"}
            />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

type LoadingSinnerProps = {};
const LoadingSinner: FC<LoadingSinnerProps> = (props) => {
  return (
    <div className={"flex w-full animate-fade-in items-center justify-center"}>
      <SpinnerCircularFixed color={"#fff"} enabled={true} size={40} />
    </div>
  );
};

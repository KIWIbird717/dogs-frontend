"use client";

import { FC, useEffect, useRef } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import dynamic from "next/dynamic";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { cn } from "@/shared/lib/utils/cn";
import { getRandomPosition } from "./shared/func/getRandomPosition";
import { DAY_IN_MS, MAX_INTERVAL, MIN_INTERVAL, TOTAL_PRIZES } from "./shared/constants";

const MotionButton = dynamic(() => import("framer-motion").then((mod) => mod.motion.button));

type BreedPackProps = {
  onPackClick?: () => void;
  className?: string;
};

export const BreedPack: FC<BreedPackProps> = (props) => {
  const dispatch = useAppDispatch();
  const maxBoost = useAppSelector((store) => store.user.energyLimit);

  // LocalStorage для хранения количества пойманных призов
  const [prizesCaught, setPrizesCaught] = useLocalStorage<number>("prizesCaught", 0);
  const [lastReset, setLastReset] = useLocalStorage<number>("lastReset", Date.now());

  // Состояние для отображения картинки
  const [showPrize, setShowPrize] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const [prizePosition, setPrizePosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Обновляем позицию при первом рендере и каждом обновлении
  const updatePrizePosition = () => {
    const container = wrapperRef.current;

    if (container) {
      const containerRect = container.getBoundingClientRect();

      // Получаем случайные координаты
      const { top, left } = getRandomPosition(containerRect.width, containerRect.height, 38, 48);
      setPrizePosition({ top, left });
    }
  };

  // Проверка и сброс счетчика каждый день
  useEffect(() => {
    const now = Date.now();
    if (now - lastReset >= DAY_IN_MS) {
      setPrizesCaught(0);
      setLastReset(now);
    }
  }, [lastReset, setPrizesCaught, setLastReset]);

  // Функция захвата приза
  const capturePrize = () => {
    setPrizesCaught(prizesCaught + 1);
    clearTimer();
    startRandomTimer(); // Запускаем таймер заново
    capturePrize();
    dispatch(UserSlice.setCurrentBoost(maxBoost));
  };

  // Функция для показа приза
  const showPrizeToUser = () => {
    updatePrizePosition();
    setShowPrize(true);

    const autoCaptureTimeout = setTimeout(() => {
      capturePrize();
    }, 5000); // Таймер на 5 секунд

    setTimer(autoCaptureTimeout);
  };

  // Функция для запуска таймера на случайный промежуток времени
  const startRandomTimer = () => {
    const randomInterval = Math.random() * (MAX_INTERVAL - MIN_INTERVAL) + MIN_INTERVAL;

    setTimeout(() => {
      if (prizesCaught < TOTAL_PRIZES) {
        showPrizeToUser();
      }
    }, randomInterval);
  };

  // Обработчик клика по картинке
  const handleClickPack = () => {
    props.onPackClick && props.onPackClick();
  };

  // Очистка таймера
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setShowPrize(false);
  };

  // При первом рендере запускаем таймер на первый приз
  useEffect(() => {
    if (prizesCaught < TOTAL_PRIZES) {
      startRandomTimer();
    }
  }, [prizesCaught]);

  return (
    <div className={cn(props?.className, "absolute h-full w-full")}>
      <div ref={wrapperRef} className="relative h-full w-full">
        {showPrize && (
          <MotionButton
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              top: prizePosition.top,
              left: prizePosition.left,
            }}
            onClick={handleClickPack}
            className="absolute animate-bounce"
          >
            <img src={"images/breed-pack.png"} alt="breed-pack" />
          </MotionButton>
        )}
      </div>
    </div>
  );
};

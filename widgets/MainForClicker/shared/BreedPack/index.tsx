"use client";

import { FC, useEffect, useRef } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";
import dynamic from "next/dynamic";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { cn } from "@/shared/lib/utils/cn";

const MotionButton = dynamic(() => import("framer-motion").then((mod) => mod.motion.button));

const TOTAL_PRIZES = 7;
const DAY_IN_MS = 60 * 1000; // 24 часа в миллисекундах
const MIN_INTERVAL = 1 * 60 * 60 * 1000; // минимальный интервал в 1 час
const MAX_INTERVAL = 2 * 60 * 60 * 1000; // максимальный интервал в 2 часа

// Функция для генерации случайной позиции
const getRandomPosition = (
  containerWidth: number,
  containerHeight: number,
  elementWidth: number,
  elementHeight: number,
  excludedAreaPercentage: number = 0.7, // % от ширины и высоты, которые нужно исключить
) => {
  const maxX = containerWidth - elementWidth;
  const maxY = containerHeight - elementHeight;

  // Центральный квадрат, который нужно исключить
  const excludedWidth = containerWidth * excludedAreaPercentage;
  const excludedHeight = containerHeight * excludedAreaPercentage;

  const excludedStartX = (containerWidth - excludedWidth) / 2;
  const excludedEndX = excludedStartX + excludedWidth;

  const excludedStartY = (containerHeight - excludedHeight) / 2;
  const excludedEndY = excludedStartY + excludedHeight;

  let randomX, randomY;

  do {
    randomX = Math.random() * maxX;
    randomY = Math.random() * maxY;
  } while (
    randomX > excludedStartX &&
    randomX < excludedEndX &&
    randomY > excludedStartY &&
    randomY < excludedEndY
  );

  return { top: randomY, left: randomX };
};

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

  // Функция для запуска таймера на случайный промежуток времени
  const startRandomTimer = () => {
    const randomInterval = Math.random() * (MAX_INTERVAL - MIN_INTERVAL) + MIN_INTERVAL;

    setTimeout(() => {
      if (prizesCaught < TOTAL_PRIZES) {
        showPrizeToUser();
      }
    }, randomInterval);
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

  // Функция захвата приза
  const capturePrize = () => {
    setPrizesCaught(prizesCaught + 1);
    clearTimer();
    startRandomTimer(); // Запускаем таймер заново
    capturePrize();
    dispatch(UserSlice.setCurrentBoost(maxBoost));
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

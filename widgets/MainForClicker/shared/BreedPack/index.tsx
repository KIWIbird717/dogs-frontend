"use client";

import { useEffect } from "react";
import { LocalStorageKeys } from "@/shared/constants/localstorage-keys";
import { useState } from "react";
import { Logger } from "@/shared/lib/utils/logger/Logger";

type BreedPackLocalStorage = {
  lastUpdate: Date | string;
  bagsPerDay: number;
  caught: number;
};

// utils/randomIntervals.ts
export const getRandomIntervals = (count: number, duration: number): number[] => {
  const intervals: number[] = [];
  let totalTime = 0;

  for (let i = 0; i < count; i++) {
    const randomTime = Math.random() * (duration / count);
    totalTime += randomTime;
    intervals.push(totalTime);
  }

  return intervals;
};

// hooks/useLocalStorage.ts

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const logger = new Logger("useLocalStorage");
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logger.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

const TOTAL_NOTIFICATIONS = 7;
const DAY_DURATION = 24 * 60 * 60 * 1000; // Миллисекунды в дне
const NOTIFICATION_DURATION = 5 * 1000; // 5 секунд

export const BreedPack = () => {
  /**
   * Handle backpack init
   */
  useEffect(() => {
    const breedPack = localStorage.getItem(
      LocalStorageKeys.BreedPack,
    ) as BreedPackLocalStorage | null;

    // если состояние не установлено
    if (!breedPack) {
      const breedPackData = {
        lastUpdate: new Date(),
        bagsPerDay: 7,
        caught: 7,
      } as BreedPackLocalStorage;

      localStorage.setItem(LocalStorageKeys.BreedPack, JSON.stringify(breedPackData));
    }
  }, []);

  /**
   * Handle breed pack logic
   */
  useEffect(() => {
    console.log(localStorage.getItem(LocalStorageKeys.BreedPack));
  }, [window.localStorage.getItem(LocalStorageKeys.BreedPack)]);

  return (
    <div className="absolute h-full w-full bg-[rgba(255,255,255,0.1)]">
      <button onClick={() => console.log("Click on bag")}>
        <img src={"images/breed-pack.png"} alt="breed-pack" />
      </button>
    </div>
  );
};

// components/PrizeNotification.tsx
// import React, { useEffect, useState } from 'react';
// import { getRandomIntervals } from '../utils/randomIntervals';
// import { useLocalStorage } from '../hooks/useLocalStorage';

// const PrizeNotification: React.FC = () => {
//   const [notificationVisible, setNotificationVisible] = useState(false);
//   const [lastShownTime, setLastShownTime] = useLocalStorage<number>('lastShownTime', 0);
//   const [notificationsLeft, setNotificationsLeft] = useLocalStorage<number>('notificationsLeft', TOTAL_NOTIFICATIONS);

//   useEffect(() => {
//     const now = Date.now();

//     // Если день сменился, сбросить уведомления
//     if (now - lastShownTime > DAY_DURATION) {
//       setNotificationsLeft(TOTAL_NOTIFICATIONS);
//       setLastShownTime(now);
//     }

//     if (notificationsLeft > 0) {
//       const intervals = getRandomIntervals(notificationsLeft, DAY_DURATION);

//       const timers = intervals.map(interval => {
//         return setTimeout(() => {
//           setNotificationVisible(true);

//           setTimeout(() => {
//             setNotificationVisible(false);
//             setNotificationsLeft(prev => prev - 1);
//           }, NOTIFICATION_DURATION);
//         }, interval);
//       });

//       return () => {
//         timers.forEach(timer => clearTimeout(timer));
//       };
//     }
//   }, [lastShownTime, notificationsLeft, setNotificationsLeft, setLastShownTime]);

//   return (
//     <>
//       {notificationVisible && (
//         <div className="notification">
//           <p>Вам доступен приз!</p>
//           <img src="/prize.png" alt="Prize" />
//         </div>
//       )}
//     </>
//   );
// };

// export default PrizeNotification;

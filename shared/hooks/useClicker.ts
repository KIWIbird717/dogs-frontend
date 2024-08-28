import { MouseEvent, useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { UsersService } from "@/shared/lib/services/users/users";
import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { UserSlice } from "@/shared/lib/redux-store/slices/user-slice/userSlice";

export interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

// Основной хук, который используется для обработки кликов и накопления "монет"
export const useClicker = (isSetInterval?: boolean) => {
  const dispatch = useAppDispatch();
  const logger = new Logger("useClicker");

  // Локальное состояние для хранения заработанных монет, количества кликов и доступных бустов
  const [state, setState] = useState({
    earned: 0,
    touches: 0,
    boosts: 480,
  });

  // Состояние для хранения эффекта кликов
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);

  // Максимальное количество бустов
  const maxBoost = 500;

  // Функция для увеличения заработанных монет и уменьшения количества бустов
  const onIncrementEarn = async () => {
    if (state.boosts > 2) {
      setState((prevState) => ({
        ...prevState,
        earned: prevState.earned + 2,
        touches: prevState.touches + 1,
        boosts: prevState.boosts - 2,
      }));

      await debouncedSendEarned(state.earned + 2, state.touches + 1);
    }
  };

  // Функция для отправки заработанных монет на сервер
  const sendCoins = async (newCoins: number, touches: number) => {
    try {
      const { data } = await UsersService.addUseMoney({
        touches,
        earned: newCoins,
      });

      // Обновление баланса и уровня пользователя на основе ответа сервера
      dispatch(UserSlice.setBalance(data.balance));
      dispatch(UserSlice.setLevel(data.level));

      // Сброс локального состояния, но сохранение текущего уровня бустов
      setState({ earned: 0, touches: 0, boosts: state.boosts });
    } catch (error) {
      logger.error(error);
    }
  };

  // Дебаунс для ограничения частоты отправки данных на сервер
  const debouncedSendEarned = useCallback(debounce(sendCoins, 4000), []);

  // Использование эффекта для автоматического увеличения бустов с интервалом, если isSetInterval = true
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSetInterval && state.boosts < maxBoost) {
      interval = setInterval(() => {
        // Увеличение бустов на 3 каждую секунду, но не выше maxBoost
        setState((prevState) => ({
          ...prevState,
          boosts: Math.min(prevState.boosts + 3, maxBoost),
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSetInterval, state.boosts]);

  // Обработчик клика, который создает эффект клика и увеличивает заработанные монеты
  const handleClick = useCallback(
    async (event: MouseEvent) => {
      const { clientX, clientY, currentTarget } = event;
      const { left, top } = currentTarget.getBoundingClientRect();

      const x = clientX - left;
      const y = clientY - top;

      // Создание нового эффекта клика с уникальным id
      const newEffect: ClickEffect = { id: Date.now(), x, y };
      setClickEffects((prev) => [...prev, newEffect]);

      await onIncrementEarn(); // Увеличение заработанных монет

      // Удаление эффекта клика через 1 секунду
      setTimeout(() => {
        setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id));
      }, 1000);
    },
    [onIncrementEarn],
  );

  const onMaxBoost = () => {
    setState((prevState) => ({
      ...prevState,
      boosts: maxBoost,
    }));
  };

  return {
    boosts: state.boosts,
    maxBoost,
    earned: state.earned,
    clickEffects,

    onIncrementEarn,
    handleClick,
    onMaxBoost,
  };
};

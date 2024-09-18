import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Logger } from "@/shared/lib/utils/logger/Logger";
import { GameSlice } from "../game-slice/gameSlice";
import { GameServiceTypes } from "@/shared/lib/services/game/types";
import { UserApiTypes } from "@/shared/lib/services/users/types";

export namespace UserSlice {
  export type LastDailyRewardType = {
    date: Date;
    value: number;
    _id: string;
  };

  export type IUserSlice = UserApiTypes.User;

  const initialState: IUserSlice = {
    _id: "",
    age: undefined,
    country: undefined,
    guild: undefined,
    guildName: null,
    lastDailyReward: {
      date: new Date(),
      value: 0,
    },
    friendBonusTaken: new Date(),
    telegram_id: 0,
    balance: 0,
    breedKey: "Husky",
    earnPerHour: 0,
    first_name: "Userrr",
    lastOnline: new Date(),
    level: 0,
    touches: 0,
    username: "User",
    doneTasks: [],
    friends: [],
    league: 0,
    avatar: undefined,
    hasTelegramPremium: false,
    rechargeEnergy: 0,
    invitedBy: null,
    boosts: {
      multitap: {
        tapMultiplication: 0,
        energyClaimMultiplication: 0,
        level: 0,
        upgradePrice: 0,
      },
      energyLimit: {
        level: 0,
        upgradePrice: 0,
        energyLimit: 0,
      },
      rechargingSpeed: {
        level: 0,
        energyRechargeMultiplication: 0,
        upgradePrice: 0,
      },
      tapBot: {
        price: 0,
        activeFor: new Date(),
      },
      fullTank: {
        fullTankLeft: 0,
        availableToClaimIn: new Date(),
      },
      turbo: {
        activeFor: new Date(),
        turboLeft: 0,
        multiplication: 0,
      },
    },
    lastTap: new Date(),
  };

  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setAge: (state, action: PayloadAction<IUserSlice["age"]>) => {
        state.age = action.payload;
      },
      setBreed: (state, action: PayloadAction<IUserSlice["breedKey"]>) => {
        state.breedKey = action.payload;
      },
      setCountry: (state, action: PayloadAction<IUserSlice["country"]>) => {
        state.country = action.payload;
      },
      setGuildName: (state, action: PayloadAction<IUserSlice["guildName"]>) => {
        state.guildName = action.payload;
      },
      setBalance: (state, action: PayloadAction<IUserSlice["balance"]>) => {
        state.balance = action.payload;
      },
      setLevel: (state, action: PayloadAction<IUserSlice["level"]>) => {
        state.level = action.payload;
      },
      updateUser: (state, action: PayloadAction<Partial<IUserSlice>>) => {
        Object.assign(state, action.payload);
      },
      updateBoosts: <K extends keyof IUserSlice["boosts"]>(
        state: IUserSlice,
        action: PayloadAction<{ key: K; updates: Partial<IUserSlice["boosts"][K]> }>,
      ) => {
        const { key, updates } = action.payload;
        state.boosts[key] = {
          ...state.boosts[key],
          ...updates,
        };
      },
      /**
       * Добавление заработка пользователю
       * + ревалидация уровня
       */
      _addCoins: (
        state,
        action: PayloadAction<
          Pick<IUserSlice, "balance"> &
            Pick<GameSlice.Type, "levels" | "leagues"> & { level: GameServiceTypes.Levels }
        >,
      ) => {
        state.balance += action.payload.balance;

        // revalidate user level
        if (!action.payload.levels) {
          Logger.error("Can not revalidate level in redux addCoins action. levels is null");
          return;
        }

        const balanceForNextLevel =
          action.payload.levels[(action.payload.level + 1) as GameServiceTypes.Levels];

        // обновляем сразу и лигу и уровень, т.к. это одно и тоже
        if (state.balance >= balanceForNextLevel) {
          state.level += 1;
          state.league += 1;
        }
      },
      /**
       * Ревалидация уровня и лиги пользователя
       * (ревалидируем сразу и лигу и уровень, т.к. в данный момент лига и уровень одинаковы и имеют одинаковою механику обновления,
       * т.е. лига коррелирует уровню)
       * Проверка уровня пользователя в соответствии с его текущим балансом
       */
      _revalidateLevel: (
        state,
        action: PayloadAction<Pick<GameSlice.Type, "levels" | "leagues">>,
      ) => {
        if (!action.payload.levels) return;

        let userLevel = 1;

        for (const [level, requiredExperience] of Object.entries(action.payload.levels)) {
          if (state.balance >= requiredExperience) {
            userLevel = Number(level);
          } else {
            break;
          }
        }

        // 🟡🟡🟡 обновляем сразу и лигу и уровень, т.к. это одно и тоже 🟡🟡🟡
        state.level = userLevel;
        state.league = userLevel;
      },
    },
  });

  /**
   * Добавление заработка пользователю
   * + ревалидация уровня
   */
  export const addCoins = createAsyncThunk(
    "user/addCoins",
    async (coins: number, { getState, dispatch }) => {
      const state = getState() as RootState;
      const levels = state.game.levels;
      const leagues = state.game.leagues;
      const level = state.user.level as GameServiceTypes.Levels;

      if (levels) {
        dispatch(userSlice.actions._addCoins({ balance: coins, levels, level, leagues }));
      }
    },
  );

  /**
   * Ревалидация уровня и лиги пользователя
   * (ревалидируем сразу и лигу и уровень, т.к. в данный момент лига и уровень одинаковы и имеют одинаковою механику обновления,
   * т.е. лига коррелирует уровню)
   * Проверка уровня пользователя в соответствии с его текущим балансом
   */
  export const revalidateLevel = createAsyncThunk(
    "user/revalidateLevel",
    async (_: never, { getState, dispatch }) => {
      const state = getState() as RootState;
      const levels = state.game.levels;
      const leagues = state.game.leagues;

      if (levels) {
        dispatch(userSlice.actions._revalidateLevel({ levels, leagues }));
      }
    },
  );

  export const {
    setAge,
    setLevel,
    setBalance,
    updateBoosts,
    setGuildName,
    setBreed,
    setCountry,
    updateUser,
  } = userSlice.actions;
  export const userReducer = userSlice.reducer;
  export type Type = IUserSlice;
}

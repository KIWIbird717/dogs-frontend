import { useAppDispatch } from "@/shared/lib/redux-store/hooks";
import { GameSlice } from "@/shared/lib/redux-store/slices/game-slice/gameSlice";
import { GameService } from "@/shared/lib/services/game/game";
import { Logger } from "@/shared/lib/utils/logger/Logger";

/**
 * Установка переменных, которые нужны для игрового процесса
 * в redux-store
 */
export const setGameInfo = async (dispatch: ReturnType<typeof useAppDispatch>) => {
  const logger = new Logger("setGameInfo");

  // получение информации об игре
  const [levels, leagues] = await Promise.all([GameService.getLevels(), GameService.getLeagues()]);

  if (levels) {
    dispatch(GameSlice.setLevels(levels.data));
  } else {
    logger.error("Can not get info about levels");
  }

  if (leagues) {
    dispatch(GameSlice.setLeagues(leagues.data));
  } else {
    logger.error("Can not get info about leagues");
  }
};

import { serverApi } from "../../axios";
import { GameServiceTypes } from "./types";

export namespace GameService {
  /**
   * GET /game/levels
   */
  export const getLevels = () => {
    return serverApi.get<GameServiceTypes.GetLevelsResponse>("/game/levels");
  };

  /**
   * GET /game/leagues
   */
  export const getLeagues = () => {
    return serverApi.get<GameServiceTypes.GetLeaguesResponse>("/game/leagues");
  };
}

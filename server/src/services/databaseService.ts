import { dbClient } from "../utils/supaclient";
import {PlayerStatLogNfl, PlayerStatLogResponse} from "../../../shared/types/nfl/PlayerStatLog"



export const getPlayersStatsByGameId = async (gameId: number): Promise<PlayerStatLogResponse> => {

    const { data: stats, error } = await dbClient.rpc('getplayerstatsforgamenfl', {
        game_id_param: gameId
    })
    const response: PlayerStatLogResponse = {gameId: stats[0].game_id, gameName: stats[0].game_name, playerStats: []}
    for (let i = 0; i < stats.length; i ++){
//TODO - remove shared values like game name / game id from response
        response.playerStats.push(stats[i])
    }

return response;
}
import { dbClient } from "../utils/supaclient";
import {PlayerStatLogNfl, PlayerStatLogResponse} from "../../../shared/types/nfl/PlayerStatLog"
import { GetUpcomingGamesByLeagueResponse, UpcomingGame } from "../../../shared/types/GetGames"



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

export const getUpcomingGamesByLeagueIdAndSeason = async (leagueId: number, seasonYear: number): Promise<UpcomingGame[]> => {
    //some piece to get the criteria to determine what the upcoming games for a league are. hardcode for now 
    const { data: upcomingGames, error } = await dbClient.rpc('getupcominggamesbyleagueid', {
        league_id_param: leagueId,
        season_year_param: seasonYear
    })

    if (error){
        console.log("supabase error")
        throw new Error(error.message)
    }

    return upcomingGames.filter((x:any ) => x.upcoming_identifier === 'Week 8').map((x: any) => {return {gameId: x.game_id, gameName: x.game_name, upcomingIdentifier: x.upcoming_identifier, playedAt: x.played_at}})

}
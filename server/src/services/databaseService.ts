import { dbClient } from "../utils/supaclient";
import {PlayerStatLogNfl, PlayerStatLogNflGame, PlayerStatLogResponse} from "../../../shared/types/nfl/PlayerStatLog"
import { GetUpcomingGamesByLeagueResponse, UpcomingGame } from "../../../shared/types/GetGames"



export const getPlayersStatsByGameId = async (gameId: number): Promise<PlayerStatLogResponse> => {
    const { data: stats, error } = await dbClient.rpc('getplayerstatsforgamenfl', {
        game_id_param: gameId
    })

    const response: PlayerStatLogResponse = { gameId, playerStats: [] }
    for (let i = 0; i < stats.length; i++) {
        const stat = stats[i]
        if (response.playerStats.find((x) => x.player_id === stat.player_id)) continue; //if player's already in playerstats, we've already added all their games to playerstats[player].gamelog. crude solution but w/e

        const playerStat: PlayerStatLogNfl = { player_id: stat.player_id, player_name: stat.player_name, position: stat.player_position, gamelog: [] }

        playerStat.gamelog.push(...[stats.filter((x: any) => x.player_id === stat.player_id).map((n: PlayerStatLogNflGame) => {
            return {
                team_name: n.team_name, game_name: n.game_name, game_id: n.game_id, passing_comp: n.passing_comp,
                passing_att: n.passing_att, passing_yds: n.passing_yds, passing_td: n.passing_td, passing_int: n.passing_int,
                rushing_att: n.rushing_att, rushing_yds: n.rushing_yds, rushing_td: n.rushing_td, receiving_rec: n.receiving_rec, receiving_yds: n.receiving_yds,
                receiving_tgt: n.receiving_tgt, receiving_td: n.receiving_td
            }
        })])


        response.playerStats.push(playerStat)
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
import axios from '../utils/axios'
import { UpcomingGame } from '../../../shared/types/nfl'
import { PlayerStatLogResponse } from '../../../shared/types/nfl/PlayerStatLog'

export const getUpcomingGamesForLeague = async (
    leagueId: number,
    season: number
): Promise<UpcomingGame[]> => {
    const response: UpcomingGame[] = (
        await axios.get(`/upcominggames?leagueid=${leagueId}&season=${season}`)
    ).data

    return response
}

export const getPlayerStatsForGame = async (
    gameId: number
): Promise<PlayerStatLogResponse> => {
    const response = (await axios.get(`/statsforgame/${gameId}`)).data
    return response
}

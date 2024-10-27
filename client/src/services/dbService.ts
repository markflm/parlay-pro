import axios from '../utils/axios'
import { UpcomingGame } from '../../../shared/types/nfl'

export const getUpcomingGamesForLeague = async (
    leagueId: number,
    season: number
): Promise<UpcomingGame[]> => {
    const response: UpcomingGame[] = (
        await axios.get(`/upcominggames?leagueid=${leagueId}&season=${season}`)
    ).data

    return response
}

export const getPlayerStatsForGame = async (gameId: string) => {
    const response = (await axios.get(`/statsforgame/${gameId}`)).data
    return response
}

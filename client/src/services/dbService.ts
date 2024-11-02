import axios from '../utils/axios'
import { UpcomingGame } from '../../../shared/types/nfl'
import { PlayerStatLogResponse } from '../../../shared/types/nfl/PlayerStatLog'
import { ScheduleMap } from '../../../shared/types/GetGames'

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
    gamePublicId: string
): Promise<PlayerStatLogResponse> => {
    const response = (await axios.get(`/statsforgame/${gamePublicId}`)).data
    return response
}

export const getScheduleMap = async (leagueId: number, season: number) => {
    const response: ScheduleMap[] = (
        await axios.get(`/schedulemap?leagueid=${leagueId}&season=${season}`)
    ).data
    return response
}

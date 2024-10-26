import axios  from "../utils/axios";

export const getUpcomingGamesForLeague = async (leagueId: number, season: number) => {
    const response = (await axios.get(`/upcominggames?leagueid=${leagueId}&season=${season}`)).data

    return response;
}

export const getPlayerStatsForGame = async (gameId: string) => {
    const response = (await axios.get(`/statsforgame/${gameId}`)).data
    return response;
}
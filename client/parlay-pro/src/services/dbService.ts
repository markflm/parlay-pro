import axios from "axios"

export const getActiveGamesForLeague = async (leagueName: string) => {
    const response = (await axios.get(import.meta.env.VITE_PARLAY_PRO_API)).data
    return response;
}

export const getPlayerStatsForGame = async (gameId: string) => {
    const response = (await axios.get(`${import.meta.env.VITE_PARLAY_PRO_API}/statsforgame/${gameId}`)).data
    return response;
}
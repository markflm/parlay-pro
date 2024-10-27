import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
    getPlayerStatsForGame,
    getUpcomingGamesForLeague,
} from '../services/dbService'
import { Button } from './ui/button'
import React from 'react'

export default function Home() {
    console.log('home render')
    const [activeLeague, setActiveLeague] = useState()
    const [selectedGameId, setSelectedGameId] = useState()

    const {
        data: activeLeagueGameList,
        isLoading: activeLeagueGameListLoading,
    } = useQuery(
        ['active_games_for_league'],
        async () => await getUpcomingGamesForLeague(1, 2024),
        { staleTime: Infinity }
    )
    const {
        data: selectedGamePlayerStats,
        isLoading: selectedGamePlayerStatsIsLoading,
    } = useQuery(
        ['selected_game_player_stats', selectedGameId],
        async () => {
            if (!selectedGameId) return undefined
            return await getPlayerStatsForGame(selectedGameId)
        },
        { staleTime: Infinity }
    )

    useEffect(() => {}, [selectedGameId])

    console.log(activeLeagueGameList)
    return (
        <div className="w-screen h-screen flex flex-col">
            <div className="m-auto">
                <select>select league</select>
            </div>
        </div>
    )
}

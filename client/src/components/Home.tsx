import { useState } from 'react';
import { useQuery } from 'react-query'
import { getUpcomingGamesForLeague } from '../services/dbService';
import { Button } from './ui/button';
import React from 'react';

export default function Home() {
    console.log("home render")
    const [activeLeague, setActiveLeague] = useState();

    // const { data: activeLeagueGameList, isLoading: activeLeagueGameListLoading } = useQuery(
    //     ['active_games_for_league'],
    // //    async () => getUpcomingGamesForLeague(1, 2024),
    //    async () => await getUpcomingGamesForLeague(1, 2024),
    //     { staleTime: Infinity }
    // )

    return (<Button className='text-red-600'>BUTTOddN</Button>)
}
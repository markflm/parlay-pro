import { useState } from 'react';
import { useQuery } from 'react-query'
import { getActiveGamesForLeague } from '../services/dbService';

export default function Home() {
    const [activeLeague, setActiveLeague] = useState();

    const { data: activeLeagueGameList, isLoading: activeLeagueGameListLoading } = useQuery(
        ['active_games_for_league'],
        getActiveGamesForLeague(/*activeLeague.name*/ "NFL"),
        { staleTime: Infinity }
    )

}
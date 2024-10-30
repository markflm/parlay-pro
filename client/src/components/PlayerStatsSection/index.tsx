import { useContext } from 'react'
import { LeagueGameContext } from '../Home'
import { useQuery } from 'react-query'
import { getPlayerStatsForGame } from '@/services/dbService'

export default function PlayerStatsSection() {
    const {
        activeGamePerLeagueObj: { activeGameId },
    } = useContext(LeagueGameContext)
    const { data: gamePlayerStats, isLoading: gamePlayerStatsIsLoading } =
        useQuery(
            ['game_player_stats_', activeGameId],
            async () => {
                if (!activeGameId) return undefined
                return await getPlayerStatsForGame(activeGameId)
            },
            { staleTime: Infinity }
        )
    console.log('player game stats data')
    console.log(gamePlayerStats)
    return <>player stats section</>
}

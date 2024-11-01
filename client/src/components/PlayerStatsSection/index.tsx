import { useContext } from 'react'
import { LeagueGameContext } from '../Home'
import { useQuery } from 'react-query'
import { getPlayerStatsForGame } from '@/services/dbService'
import RoleStatsTable from './RoleStatsTable'

export default function PlayerStatsSection(props) {
    const roles = ['QB', 'WR', 'RB', 'TE']
    const { leagueId } = props
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
    return (
        leagueId == 1 &&
        gamePlayerStats &&
        roles.map((r) => (
            <RoleStatsTable
                role={r}
                logs={gamePlayerStats?.playerStats.filter(
                    (gps) => gps.position === r
                )}
            ></RoleStatsTable>
        ))
    )
}

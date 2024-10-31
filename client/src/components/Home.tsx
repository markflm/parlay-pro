import { useEffect, useState, createContext } from 'react'
import { useQuery } from 'react-query'
import { getPlayerStatsForGame } from '../services/dbService'
import { Button } from './ui/button'
import React from 'react'
import GameSelector from './GameSelector'
import {
    ActiveGamePerLeague,
    ActiveGamePerLeagueContext,
} from '@/types/Contexts'
import PlayerStatsSection from './PlayerStatsSection'

export const LeagueGameContext = createContext<ActiveGamePerLeagueContext>({
    activeGamePerLeagueObj: { leagueId: 1, activeGameId: undefined },
    update: () => {},
})

export default function Home() {
    const [activeGameInLeague, setActiveGameInLeague] = useState<
        ActiveGamePerLeague[]
    >([{ leagueId: 1, activeGameId: undefined }])

    function handleActiveGameChanged(leagueId: number, newGameId: number) {
        console.log('handle active game changed')
        const localAgl = [...activeGameInLeague]
        const aglIndex = activeGameInLeague.findIndex(
            (x) => x.leagueId === leagueId
        )

        if (aglIndex === -1) {
            localAgl.push({ leagueId, activeGameId: newGameId })
        }
        localAgl[aglIndex] = { leagueId, activeGameId: newGameId }
        setActiveGameInLeague(localAgl)
    }
    return (
        <div className="dark w-full h-screen flex flex-col">
            <LeagueGameContext.Provider
                value={{
                    // @ts-ignore
                    activeGamePerLeagueObj: activeGameInLeague.find(
                        (x) => x.leagueId === 1
                    ),
                    update: handleActiveGameChanged,
                }}
            >
                <div className="mx-auto w-full flex flex-col">
                    <div className="mx-auto max-w-[80%]">
                        <GameSelector></GameSelector>
                    </div>
                    <PlayerStatsSection leagueId={1}></PlayerStatsSection>
                </div>
            </LeagueGameContext.Provider>
        </div>
    )
}

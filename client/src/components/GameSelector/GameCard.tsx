import { useContext, useEffect, useState } from 'react'
import { LeagueGameContext } from '../Home'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { GameCardWidthPx } from '@/constants'
// @ts-ignore
export default function GameCard({ gameId, gameName, playedAt }) {
    const { activeGamePerLeagueObj, update } = useContext(LeagueGameContext)
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        setSelected(activeGamePerLeagueObj.activeGameId === gameId)
        return
    }, [activeGamePerLeagueObj.activeGameId])
    function handleCardClick() {
        update(activeGamePerLeagueObj.leagueId, gameId)
    }

    return (
        <div>
            <Card
                onClick={handleCardClick}
                className={`w-[${GameCardWidthPx}px] cursor-pointer ${
                    selected ? 'bg-red-500' : '' /*placeholder selected state*/
                }`}
            >
                <CardHeader>
                    <CardTitle>{gameName}</CardTitle>
                    <CardDescription>{playedAt}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}

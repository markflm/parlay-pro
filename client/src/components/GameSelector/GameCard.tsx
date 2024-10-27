import { useContext } from 'react'
import { LeagueGameContext } from '../Home'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { GameCardWidthPx } from '@/constants'
// @ts-ignore
export default function GameCard({ gameId, gameName, playedAt }) {
    const { activeGamePerLeagueObj, update } = useContext(LeagueGameContext)

    function handleCardClick() {
        console.log('CARD CLICKED')
        update(activeGamePerLeagueObj.leagueId, gameId)
    }
    return (
        <div>
            <Card
                onClick={handleCardClick}
                className={`w-[${GameCardWidthPx}px] cursor-pointer`}
            >
                <CardHeader>
                    <CardTitle>{gameName}</CardTitle>
                    <CardDescription>{playedAt}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}

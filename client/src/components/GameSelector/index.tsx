import { getUpcomingGamesForLeague } from '@/services/dbService'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useWindowSize } from '@uidotdev/usehooks'
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel'
import { UpcomingGame } from '../../../../shared/types/GetGames'
import GameCard from './GameCard'
import { GameCardWidthPx } from '@/constants'
import { getNumberOfCarouselSections } from '@/utils/uiCalculations'

export default function GameSelector(props) {
    const [api, setApi] = useState<CarouselApi>()
    const [carouselSections, setCarouselSections] = useState<UpcomingGame[][]>(
        []
    )

    const screenWidth = useWindowSize().width
    const {
        data: activeLeagueGameList,
        isLoading: activeLeagueGameListLoading,
    } = useQuery(
        ['active_games_for_league'],
        async () => await getUpcomingGamesForLeague(1, 2024),
        { staleTime: Infinity }
    )
    useEffect(() => {
        if (!activeLeagueGameList || !screenWidth) return
        const cardsPerSection = getNumberOfCarouselSections(
            screenWidth,
            GameCardWidthPx
        )
        const sections = []
        for (let i = 0; i < activeLeagueGameList.length; i += cardsPerSection) {
            sections.push(
                activeLeagueGameList.slice(i, i + (cardsPerSection - 1))
            )
        }
        setCarouselSections(sections)
    }, [activeLeagueGameList?.length, screenWidth])
    useEffect(() => {
        if (!api) {
            return
        }
        api.on('select', () => {
            console.log('carousel event')
        })
    }, [api])

    return (
        <Carousel className="" opts={{ align: 'start' }} setApi={setApi}>
            <CarouselContent className="">
                {carouselSections?.map((section) => (
                    <CarouselItem className="flex justify-between">
                        {section.map((agl) => (
                            <GameCard
                                gameId={agl.gameId}
                                gameName={agl.gameName}
                                playedAt={agl.playedAt}
                            ></GameCard>
                        ))}
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

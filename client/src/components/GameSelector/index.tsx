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
        console.log('eu')
        if (!activeLeagueGameList || !screenWidth) return
        const sectionCount = getNumberOfCarouselSections(
            screenWidth,
            GameCardWidthPx,
            activeLeagueGameList.length
        )
        console.log('SECTION count')
        console.log(sectionCount)
        const sections = []
        for (let i = 0; i < activeLeagueGameList.length; i += sectionCount) {
            sections.push(activeLeagueGameList.slice(i, i + (sectionCount - 1)))
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

    // function to determine how many game to show per carousel section

    console.log(carouselSections)
    return (
        <Carousel className="" opts={{}} setApi={setApi}>
            <CarouselContent className="">
                {activeLeagueGameList?.map((agl) => (
                    <CarouselItem>
                        <GameCard
                            gameId={agl.gameId}
                            gameName={agl.gameName}
                            playedAt={agl.playedAt}
                        ></GameCard>
                    </CarouselItem>
                ))}

                {/* <CarouselItem>...</CarouselItem>
                <CarouselItem>...</CarouselItem> */}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

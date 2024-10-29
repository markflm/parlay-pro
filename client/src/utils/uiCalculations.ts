export const getNumberOfCarouselSections = (
    screenWidth: number,
    matchCardWidth: number
) => {
    if (!screenWidth) return 1
    const concurrentMatchCardsOnScreen = screenWidth / (matchCardWidth + 25)
    return Math.floor(concurrentMatchCardsOnScreen)
}

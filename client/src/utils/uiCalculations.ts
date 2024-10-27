export const getNumberOfCarouselSections = (
    screenWidth: number,
    matchCardWidth: number,
    matchCardCount: number
) => {
    if (!screenWidth) return 1
    const concurrentMatchCardsOnScreen = screenWidth / matchCardWidth
    const requiredSections = matchCardCount / concurrentMatchCardsOnScreen
    console.log(requiredSections)
    console.log(parseInt(requiredSections))
    return requiredSections % 1 === 0
        ? requiredSections
        : parseInt(requiredSections) + 1
}



export type GetUpcomingGamesByLeagueRequest = {
leagueId: number,
filterOveride?: any //server will have criteria that determines which games are upcoming, but offer override for filter criteria 
}

export type UpcomingGame = {
    gamePublicId: number,
    gameName: string,
    upcomingIdentifier: string,
    playedAt: Date
}

export type GetUpcomingGamesByLeagueResponse = {
upcomingGames: UpcomingGame[];
}
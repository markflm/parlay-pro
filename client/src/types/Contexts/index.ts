export type ActiveGamePerLeague = {
    leagueId: number
    activeGameId: string | undefined //todo - rename to publicId
}

export type ActiveGamePerLeagueContext = {
    activeGamePerLeagueObj: ActiveGamePerLeague
    update: (leagueId: number, newGameId: number) => void
}

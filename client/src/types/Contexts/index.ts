export type ActiveGamePerLeague = {
    leagueId: number
    activeGameId: number | undefined
}

export type ActiveGamePerLeagueContext = {
    activeGamePerLeagueObj: ActiveGamePerLeague
    update: (leagueId: number, newGameId: number) => void
}

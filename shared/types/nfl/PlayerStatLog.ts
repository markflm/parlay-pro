
export type PlayerStatLogNflGame = {
    team_name: string,
    game_name: string,
    game_public_id: string
    game_isi: string,
    passing_comp: number
    passing_att: number,
    passing_yds: number,
    passing_td: number,
    passing_int: number,
    rushing_att: number,
    rushing_yds: number,
    rushing_td: number,
    receiving_rec: number,
    receiving_yds: number,
    receiving_tgt: number,
    receiving_td: number,
}

export type PlayerStatLogNfl = {
    player_public_id: string,
    player_name: string,
    position: string,
    gamelog: PlayerStatLogNflGame[]
}

export type PlayerStatLogResponse = {
    gamePublicId: string, //the id of the upcoming game, the one you're looking back from
    //maybe other stuff like game date
    playerStats: PlayerStatLogNfl[]
}
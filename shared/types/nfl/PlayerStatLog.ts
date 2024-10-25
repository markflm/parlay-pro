export type PlayerStatLogNfl = {
    player_id: number,
    player_name: string,
    position: string,
    team_name: string,
    game_name: string,
    game_id: number,
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


export type PlayerStatLogResponse = {
    gameId: number,
    gameName: string,
    //maybe other stuff like game date
    playerStats: PlayerStatLogNfl[]
}
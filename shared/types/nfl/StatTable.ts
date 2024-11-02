
type DBToTableHeader = {
    label: string,
    tooltipText: string,
    roles: string[];
}
export const DBToTableMapNfl: {[key: string]: DBToTableHeader } = {
    passing_att: {label: "PASS_ATT", tooltipText: "Passing Attempts", roles: ["QB"] },
    passing_comp: {label:"PASS_COMP", tooltipText: "Passing Completions", roles: ["QB"]},
    passing_int: {label: "INT", tooltipText: "Interceptions", roles: ["QB"]},
    passing_td: {label: "PASS_TD", tooltipText: "Passing Touchdowns", roles: ["QB"]},
    passing_yds: {label: "PASS_YDS", tooltipText: "Passing Yards", roles: ["QB"]},
    receiving_rec: {label: "REC_YDS", tooltipText: "Receptions", roles: ["WR", "RB", "TE"]},
    receiving_td: {label: "REC_TD", tooltipText: "Receiving Touchdowns", roles: ["WR", "RB", "TE"]},
    receiving_tgt: {label: "REC_TGT", tooltipText: "Targets - pass attempts intended for player", roles: ["WR", "RB", "TE"]},
    receiving_yds: {label: "REC_YDS", tooltipText: "Receiving Yards", roles: ["WR", "RB", "TE"]}, 
    rushing_att: {label: "RUSH_ATT", tooltipText: "Rushing Attempts", roles: ["WR", "RB", "TE"]}, 
    rushing_td: {label: "RUSH_TD", tooltipText: "Rushing Touchdowns", roles: ["WR", "RB", "TE"]},
    rushing_yds: {label: "RUSH_YDS", tooltipText: "Rushing Yards", roles: ["WR", "RB", "TE"]}
} 
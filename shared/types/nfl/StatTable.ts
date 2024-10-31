
type DBToTableHeader = {
    label: string,
    tooltipText: string
}
export const DBToTableMapNfl: {[key: string]: DBToTableHeader } = {
    passing_att: {label: "PASS_ATT", tooltipText: "Passing Attempts"},
    passing_comp: {label:"PASS_COMP", tooltipText: "Passing Completions"},
    passing_int: {label: "INT", tooltipText: "Interceptions"},
    passing_td: {label: "PASS_TD", tooltipText: "Passing Touchdowns"},
    passing_yds: {label: "PASS_YDS", tooltipText: "Passing Yards"},
    receiving_rec: {label: "REC_YDS", tooltipText: "Receptions"},
    receiving_td: {label: "REC_TD", tooltipText: "Receiving Touchdowns"},
    receiving_tgt: {label: "REC_TGT", tooltipText: "Targets - pass attempts intended for player"},
    receiving_yds: {label: "REC_YDS", tooltipText: "Receiving Yards"}, 
    rushing_att: {label: "RUSH_ATT", tooltipText: "Rushing Attempts"}, 
    rushing_td: {label: "RUSH_TD", tooltipText: "Rushing Touchdowns"},
    rushing_yds: {label: "RUSH_YDS", tooltipText: "Rushing Yards"}
} 
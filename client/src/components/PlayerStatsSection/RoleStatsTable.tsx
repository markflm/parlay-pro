import { useContext, useEffect, useMemo, useState } from 'react'
import {
    PlayerStatLogNfl,
    PlayerStatLogNflGame,
} from '../../../../shared/types/nfl/PlayerStatLog'
import { ScheduleMap } from '../../../shared/types/GetGames'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
import { useQuery } from 'react-query'
import { Label } from '../ui/label'
import { DBToTableMapNfl } from '../../../../shared/types/nfl/StatTable'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../ui/collapsible'
import { largeColumnWidthPx } from '@/constants'

export type RoleStatsTableProps = {
    logs: PlayerStatLogNfl[]
    role: string
    leagueId: number
}
export default function RoleStatsTable(props: RoleStatsTableProps) {
    const { logs, role, leagueId } = props
    const [closedPlayerIds, setClosedPlayerIds] = useState<string[]>([])

    console.log('role stats table')
    console.log(logs)

    const sortedFilteredDbToTableMap: any = useMemo(() => {
        if (leagueId != 1) return DBToTableMapNfl
        const filteredMap = {}
        for (const key of Object.keys(DBToTableMapNfl)) {
            if (DBToTableMapNfl[key].roles.includes(role)) {
                // @ts-ignore
                filteredMap[key] = DBToTableMapNfl[key]
            }
        }
        return filteredMap
    }, [])

    function handleCollapseChange() {
        const localClosedPlayers = [...closedPlayerIds]
        // const playerIndex = localClosedPlayers.findIndex((x) => x === )
    }

    const { data: scheduleMap } = useQuery(['schedule_map_for_league_', 1])

    return (
        <div className="my-5 mx-3">
            <Label className="text-2xl">{role}</Label>
            <Table className="w-full">
                <TableCaption>END {role} TABLE </TableCaption>
                {logs.map((gl) => (
                    <>
                        <TableHeader>
                            <TableRow className="">
                                <TableHead className="text-lg">
                                    V {gl.player_name}
                                </TableHead>
                                {(scheduleMap as ScheduleMap[]).map((sm) => (
                                    <TableHead>{sm.indicator}</TableHead>
                                ))}
                            </TableRow>

                            {/* <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="">Amount</TableHead> */}
                        </TableHeader>
                        <TableBody className="w-1">
                            {Object.keys(sortedFilteredDbToTableMap).map(
                                (map) => (
                                    <TableRow>
                                        <TableCell>
                                            {
                                                sortedFilteredDbToTableMap[map]
                                                    .label
                                            }
                                        </TableCell>
                                        {(scheduleMap as ScheduleMap[]).map(
                                            (sm) => (
                                                <TableCell>
                                                    {gl.gamelog.find(
                                                        (x) =>
                                                            x.game_isi ==
                                                            sm.indicator
                                                    ) &&
                                                        // @ts-ignore
                                                        gl.gamelog.find(
                                                            (x) =>
                                                                x.game_isi ==
                                                                sm.indicator
                                                        )[map]}
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </>
                ))}
            </Table>
        </div>
    )
}

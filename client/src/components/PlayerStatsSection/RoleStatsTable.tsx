import { useEffect, useMemo, useState } from 'react'
import {
    PlayerStatLogNfl,
    PlayerStatLogNflGame,
} from '../../../../shared/types/nfl/PlayerStatLog'
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
export type RoleStatsTableProps = {
    logs: PlayerStatLogNfl[]
    role: string
}
export default function RoleStatsTable(props: RoleStatsTableProps) {
    const { logs, role } = props

    console.log('role stats table')
    console.log(logs)

    useEffect(() => {
        console.log('logs sort ue')
        logs.sort((a, b) => b.gamelog.length - a.gamelog.length)
    }, [logs])

    // const longestGamelogIndex = useMemo(() => {
    //     console.log("usememo fired")
    //     longestGamelogIndex = logs.sort((a, b) => a.gamelog.length - b.gamelog.length)

    // }, [logs])

    return (
        <div className="my-5">
            <Table>
                <TableCaption>END {role} TABLE </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Player Name</TableHead>
                        {logs[0].gamelog.map((gl) => (
                            <TableHead className="left">
                                {gl.game_isi}
                            </TableHead>
                        ))}
                        {/* <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="">Amount</TableHead> */}
                    </TableRow>
                </TableHeader>
                {/* <TableBody>
                    {logs.map((glr) => (
                        
                        <TableCell></TableCell>
                    ))}
                </TableBody> */}
            </Table>
        </div>
    )
}

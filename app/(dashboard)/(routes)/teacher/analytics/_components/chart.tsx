"use client"

import { Card } from '@/components/ui/card'
import React from 'react'
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts'

interface ChartProps {
    data : {
        name : string,
        total : number,
    }[]
}
const Chart = ({data} : ChartProps) => {

    return (
        <Card>
            <ResponsiveContainer width="100%" height={359}>
                <BarChart data={data}>
                    <XAxis
                        dataKey="name"
                        stroke='#888888'
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tickLine={false}
                        fontSize={12}
                        stroke='#888888'
                        tickFormatter={(value) => `$${value}`}
                    />

                    <Bar
                        dataKey="total"
                        fill='#0369a1'
                        radius={[4,4,0,0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default Chart
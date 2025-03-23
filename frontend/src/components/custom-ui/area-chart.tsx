"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface AreaChartData {
    month: string;
    books: number;
    comments: number;
}

interface AreaChartProps {
    data?: AreaChartData[];
}

export function AreaChartComponent({ data = [] }: AreaChartProps) {
    const chartData = data.length ? data : [
        { month: "January", books: 186, comments: 80 },
        { month: "February", books: 305, comments: 200 },
        { month: "March", books: 237, comments: 120 },
        { month: "April", books: 73, comments: 190 },
        { month: "May", books: 209, comments: 130 },
        { month: "June", books: 214, comments: 140 },
    ];

    const chartConfig = {
        books: {
            label: "Books",
            color: "#4ecdc4",
        },
        comments: {
            label: "Comments",
            color: "#ff6b6b",
        },
    };

    return (
        <div className="w-full h-full">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ left: 0, right: 10, top: 10, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => value.length <= 3 ? value : value.slice(0, 3)}
                        />
                        <YAxis hide={true} />
                        <ChartTooltip
                            cursor={{
                                stroke: 'hsl(var(--muted))',
                                strokeWidth: 1,
                                strokeDasharray: '4 4',
                                opacity: 0.8,
                                fill: 'transparent'
                            }}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="comments"
                            type="monotone"
                            fill={chartConfig.comments.color}
                            fillOpacity={0.4}
                            stroke={chartConfig.comments.color}
                            strokeWidth={2}
                            stackId="a"
                        />
                        <Area
                            dataKey="books"
                            type="monotone"
                            fill={chartConfig.books.color}
                            fillOpacity={0.4}
                            stroke={chartConfig.books.color}
                            strokeWidth={2}
                            stackId="a"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    )
}


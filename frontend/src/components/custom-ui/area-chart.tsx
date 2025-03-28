"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartDataItem } from "@/lib/types/api-types";

interface AreaChartProps {
    data?: ChartDataItem[];
}

export function AreaChartComponent({ data = [] }: AreaChartProps) {

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

    if (data.length < 1) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <p className="text-lg text-muted">No data available</p>
            </div>
        );
    }
    return (
        <div className="w-full h-full">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
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


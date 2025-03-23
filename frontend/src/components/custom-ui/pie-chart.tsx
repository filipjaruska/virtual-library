"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import * as React from "react";
import { Label, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

interface ChartDataItem {
    browser: string;
    visitors: number;
    fill?: string;
}

interface PieChartComponentProps {
    data?: ChartDataItem[];
}

export default function PieChartComponent({ data = [] }: PieChartComponentProps) {
    const colors = [
        "#ff6b6b",  // red
        "#4ecdc4",  // teal
        "#1a535c",  // dark teal
        "#ffe66d",  // yellow
        "#a786df",  // purple
        "#6bcb77",  // green
        "#ff8ba7",  // pink
        "#4d96ff",  // blue
    ];

    let chartData = [];
    if (data.length) {
        chartData = data.map((item, index) => ({
            ...item,
            fill: colors[index % colors.length]
        }));
    } else {
        chartData = [
            { browser: "sci-fi", visitors: 28, fill: colors[0] },
            { browser: "fiction", visitors: 22, fill: colors[1] },
            { browser: "romance", visitors: 18, fill: colors[2] },
            { browser: "thriller", visitors: 15, fill: colors[3] },
            { browser: "biography", visitors: 12, fill: colors[4] }
        ];
    }

    const chartConfig = {
        visitors: {
            label: "Count"
        },
        ...chartData.reduce((acc: any, item: any) => {
            if (item.browser) {
                acc[item.browser] = {
                    label: item.browser.charAt(0).toUpperCase() + item.browser.slice(1),
                    color: item.fill
                };
            }
            return acc;
        }, {})
    };

    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [chartData])

    // Calculate percentages for each segment
    const dataWithPercentage = chartData.map((item) => ({
        ...item,
        percentage: ((item.visitors / totalVisitors) * 100).toFixed(1)
    }));

    // Even more compact legend that fits within container bounds
    const renderCompactLegend = (props: any) => {
        const { payload } = props;

        return (
            <div className="flex flex-wrap justify-center gap-x-1 gap-y-0 w-full"
                style={{ fontSize: '10px', lineHeight: '1', maxHeight: '30px', overflow: 'auto' }}>
                {payload.map((entry: any, index: number) => (
                    <div key={`item-${index}`} className="flex items-center px-1 py-0.5">
                        <div
                            className="w-2 h-2 mr-0.5 rounded-sm"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="truncate max-w-[60px]" title={entry.value}>
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full h-full">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height={290}>
                    <PieChart margin={{ top: 0, right: 0, bottom: 30, left: 0 }}>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    formatter={(value, name) => {
                                        const percentage = ((Number(value) / totalVisitors) * 100).toFixed(1);
                                        return [`${name}: ${value} (${percentage}%)`];
                                    }}
                                />
                            }
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={45}
                            outerRadius="65%"
                            cx="50%"
                            cy="42%"
                            paddingAngle={2}
                            strokeWidth={2}
                            stroke="hsl(var(--background))"
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 16}
                                                    className="fill-muted-foreground text-[10px]"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        )
                                    }
                                    return null;
                                }}
                            />
                        </Pie>
                        <Legend
                            content={renderCompactLegend}
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                maxHeight: '30px',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    )
}


"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { MonthlyPoint } from "@/lib/types/stats";

const chartConfig = {
  books: { label: "Books added", color: "hsl(var(--chart-2))" },
  comments: { label: "Comments", color: "hsl(var(--chart-1))" },
};

export function AreaChartComponent({ data = [] }: { data?: MonthlyPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        No activity data available
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 11 }}
            tickFormatter={(value: string) => value.split(" ")[0]}
          />
          <YAxis hide />
          <ChartTooltip
            cursor={{ stroke: "hsl(var(--muted-foreground))", strokeDasharray: "4 4" }}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Legend
            verticalAlign="top"
            height={28}
            content={({ payload }) => (
              <ul className="flex justify-end gap-4 text-xs">
                {payload?.map((entry) => (
                  <li key={String(entry.dataKey)} className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-sm"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-muted-foreground">
                      {chartConfig[entry.dataKey as keyof typeof chartConfig]?.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          />
          <Area
            dataKey="comments"
            type="monotone"
            stackId="activity"
            stroke={chartConfig.comments.color}
            fill={chartConfig.comments.color}
            fillOpacity={0.35}
            strokeWidth={2}
          />
          <Area
            dataKey="books"
            type="monotone"
            stackId="activity"
            stroke={chartConfig.books.color}
            fill={chartConfig.books.color}
            fillOpacity={0.35}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

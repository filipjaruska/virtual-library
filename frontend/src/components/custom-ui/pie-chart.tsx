"use client";

import { useMemo } from "react";
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { TagCount } from "@/lib/types/stats";

/**
 * Hues spaced evenly around the wheel for however many slices there are. The
 * theme's five chart tokens ran out at eight genres and repeated colours, which
 * made two pairs of slices indistinguishable in the legend. Fixed saturation
 * and lightness keep every slice legible on light, dark and OLED backgrounds.
 */
function sliceColors(count: number): string[] {
  return Array.from(
    { length: count },
    (_, index) => `hsl(${Math.round((index * 360) / count + 15)} 62% 55%)`
  );
}

export default function PieChartComponent({ data = [] }: { data?: TagCount[] }) {
  const total = useMemo(
    () => data.reduce((sum, entry) => sum + entry.count, 0),
    [data]
  );

  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        No genre data available
      </div>
    );
  }

  const colors = sliceColors(data.length);

  const chartConfig = Object.fromEntries(
    data.map((entry, index) => [entry.tag, { label: entry.tag, color: colors[index] }])
  );

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 24, left: 0 }}>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name) => {
                  const share = ((Number(value) / total) * 100).toFixed(0);
                  return [`${name}: ${value} (${share}%)`];
                }}
              />
            }
          />

          <Pie
            data={data}
            dataKey="count"
            nameKey="tag"
            innerRadius="42%"
            outerRadius="70%"
            cx="50%"
            cy="45%"
            paddingAngle={2}
            strokeWidth={2}
            stroke="hsl(var(--background))"
          >
            {data.map((entry, index) => (
              <Cell key={entry.tag} fill={colors[index]} />
            ))}

            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) return null;
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-xl font-bold"
                    >
                      {total}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) + 18}
                      className="fill-muted-foreground text-[10px]"
                    >
                      tag uses
                    </tspan>
                  </text>
                );
              }}
            />
          </Pie>

          <Legend
            verticalAlign="bottom"
            height={28}
            content={({ payload }) => (
              <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
                {payload?.map((entry) => (
                  <li key={String(entry.value)} className="flex items-center gap-1">
                    <span
                      className="h-2 w-2 rounded-sm"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="capitalize text-muted-foreground">{entry.value}</span>
                  </li>
                ))}
              </ul>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

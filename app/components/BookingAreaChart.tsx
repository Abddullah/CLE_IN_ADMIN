"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple area chart";

const chartData = [
  { month: "January", desktop: 60 },
  { month: "February", desktop: 80 },
  { month: "March", desktop: 120 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 28 },
  { month: "July", desktop: 98 },
  { month: "August", desktop: 98 },
  { month: "September", desktop: 98 },
  { month: "October", desktop: 43 },
  { month: "November", desktop: 96 },
  { month: "December", desktop: 66 },
  { month: "January", desktop: 39 },
  { month: "February", desktop: 77 },
];

const chartConfig = {
  desktop: {
    label: "Bookings",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ComponentAreaChart() {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="#2D60FF"
              fillOpacity={0.4}
              stroke="#00BFFF"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

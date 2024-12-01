"use client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
 
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An area chart with gradient fill"

const chartData = [
  { month: "January",  mobile: 80 },
  { month: "February",  mobile: 200 },
  { month: "March",  mobile: 120 },
  { month: "April", mobile: 190 },
  { month: "May", mobile: 130 },
  { month: "June",  mobile: 192 },
  { month: "July", mobile: 165 },
  { month: "August",mobile: 160 },
  { month: "September",  mobile: 140 },
  { month: "October", mobile: 80 },
  { month: "November", mobile: 120 },
  { month: "December", mobile: 135 },
  { month: "January", mobile: 178 },
  { month: "Feburary", mobile: 153 },
]

const chartConfig = {
  mobile: {
    label: "Bookings",
    color: "#00BFFF",
  },
} satisfies ChartConfig

export function ComponentAreaChart() {
  return (
    <Card className="h-[225px]">
      <CardContent>
        <ChartContainer className="h-[200px] w-[100%]" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 30,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={1}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.2}
              stroke="var(--color-mobile)"
              strokeWidth={6} 
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}





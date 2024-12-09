"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import {useTranslations} from 'next-intl';

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 214, mobile: 140 },
  { month: "August", desktop: 214, mobile: 140 },
  { month: "September", desktop: 214, mobile: 140 },
  { month: "November", desktop: 214, mobile: 140 },
  { month: "December", desktop: 214, mobile: 140 },
  { month: "January", desktop: 214, mobile: 140 },
  { month: "February", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#00BFFF",
  },
  mobile: {
    label: "Mobile",
    color: "#9DCBE5",
  },
} satisfies ChartConfig;

export function Component() {
  const t = useTranslations('dashboard');
  return (
    <ChartContainer config={chartConfig} className="min-h-[50px] w-[100%]  p-2">
      <BarChart data={chartData} height={150} width={400}>
        <CartesianGrid vertical={false} stroke="#D1D1D4" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={5}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={15} barSize={15} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={15} barSize={15} />
      </BarChart>
    </ChartContainer>
  );
}





























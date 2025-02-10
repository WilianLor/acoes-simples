"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "10:00", price: 9.2 },
  { time: "12:00", price: 9.5 },
  { time: "14:00", price: 9.6 },
  { time: "16:00", price: 9.7 },
  { time: "18:00", price: 9.4 },
  { time: "20:00", price: 9.8 },
  { time: "22:00", price: 10.2 },
];

export function PriceChart() {
  return (
    <div className="h-[700px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            stroke="#71717a"
            fontSize={12}
          />
          <YAxis
            stroke="#71717a"
            fontSize={12}
            domain={['auto', 'auto']}
            tickFormatter={(value) => `${value.toFixed(2)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "6px",
            }}
            labelStyle={{ color: "#eab308" }}
            itemStyle={{ color: "#ffffff" }}
            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Preço"]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ fill: "#22c55e", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
"use client";

import { IHistoricalDataPrice } from "@/types/stock-analytics.interface";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dayjs from "dayjs";

const PriceChart = ({
  data,
  coin,
}: {
  data: IHistoricalDataPrice[];
  coin?: string;
}) => {
  return (
    <div className="h-[700px] w-full">
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#71717a"
            fontSize={12}
            tickFormatter={(value) =>
              dayjs(new Date(value * 1000)).format("DD-MM-YYYY")
            }
          />
          <YAxis
            stroke="#71717a"
            fontSize={12}
            domain={["auto", "auto"]}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const {
                date,
                close,
                high,
                low,
                open,
                volume,
              }: IHistoricalDataPrice = payload[0].payload;

              return (
                <div
                  className="p-2 rounded-lg shadow-md bg-zinc-800 text-white text-sm"
                  style={{
                    border: "1px solid #27272a",
                  }}
                >
                  <p className=" mb-2 text-yellow-500">
                    <strong className="">
                      Data: {dayjs(new Date(date * 1000)).format("DD/MM/YYYY")}
                    </strong>
                  </p>
                  <p>
                    <strong>Abertura:</strong> {coin} {open.toFixed(2)}
                  </p>
                  <p>
                    <strong>Fechamento:</strong> {coin} {close.toFixed(2)}
                  </p>
                  <p>
                    <strong>Máxima:</strong> {coin} {high.toFixed(2)}
                  </p>
                  <p>
                    <strong>Mínima:</strong> {coin} {low.toFixed(2)}
                  </p>
                  <p>
                    <strong>Volume:</strong> {volume.toLocaleString("pt-BR")}
                  </p>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ fill: "#22c55e", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;

import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

type PropsTypes = {
  coinId: string;
};

type HistoryTypes = {
  time_open: string,
  time_close: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
  market_cap: number,
}
const Chart = ({ coinId }: PropsTypes) => {
  const { isLoading, data } = useQuery<HistoryTypes[]>("history", () => fetchHistory(coinId));
  const isDark = useRecoilValue(isDarkAtom)
  
  const series = [
    {
      data: data?.map((price) => ({
        x: new Date(price.time_open),
        y: [price.open, price.high, price.low, price.close],
      })),
    },
  ];

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={series as unknown as number[]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            plotOptions: {
              candlestick: {
                wick: {
                  useFillColor: true,
                },
              },
            },

            grid: { show: false },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;

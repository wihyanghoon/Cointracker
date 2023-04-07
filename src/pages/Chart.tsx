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
  useEffect(() => {
    console.log(data);
  });
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              type: 'candlestick',
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;

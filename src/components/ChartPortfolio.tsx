import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Loading from "./Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [""],
  datasets: [
    {
      label: "비율",
      data: [44.4, 33.6, 8, 7.1, 4.6, 2],
      backgroundColor: [
        "#ff6384",
        "#36a2eb",
        "#ffce56",
        "#4bc0c0",
        "#9966ff",
        "#ff9f40",
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  plugins: {
    legend: {
      display: false, // 상단 라벨링(범례) 비활성화
    },
    tooltip: {
      enabled: true, // 마우스 오버 시 툴팁 활성화 (기본값)
    },
  },
};
type Props = {
  ratios: number[]; //6자리
  labels: string[];
  isGita: boolean;
};
export default function ChartPortfolio({
  ratios,
  labels,
  isGita = true,
}: Props) {
  const [isLoading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(data);
  useEffect(() => {
    const total = ratios.reduce((a, b) => a + b);
    const gita = 100 - total;
    let arr: number[] = [];
    if (isGita) arr = [...ratios, gita];
    else arr = [...ratios];

    if (isGita) data.labels = [...labels, "기타"];
    else data.labels = labels;
    data.datasets[0].data = arr;
    setChartData(data);
    setLoading(false);
  }, []);

  if (isLoading) {
    return <Loading size="md" text="데이터를 불러오는 중입니다" />;
  }
  return (
    <div className="">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

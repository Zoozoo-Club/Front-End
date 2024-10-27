import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "에코프로",
    "에코프로비엠",
    "POSCO홀딩스",
    "코스모신소재",
    "LG화학",
    "삼성전자",
  ],
  datasets: [
    {
      label: "비율",
      data: [44.4, 33.6, 8, 7.1, 4.6, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "#36a2eb",
        "#ffce56",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
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
};
export default function ChartPortfolio({ ratios, labels }: Props) {
  useEffect(() => {
    const total = ratios.reduce((a, b) => a + b);
    const gita = 100 - total;
    const arr = [...ratios, gita];
    data.labels = [...labels, "기타"];
    data.datasets[0].data = arr;
  }, []);
  return (
    <div className="">
      <Doughnut data={data} options={options} />
    </div>
  );
}

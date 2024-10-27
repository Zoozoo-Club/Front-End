import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  // labels: ["에코프로", "에코프로비엠", "POSCO홀딩스", "코스모신소재", "LG화학", "삼성전자"],
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
type Props = {
  ratios: number[]; //6자리
};
export default function ChartPortfolio({ ratios }: Props) {
  useEffect(() => {
    data.datasets[0].data = ratios;
  }, []);
  return (
    <div className="">
      <Doughnut data={data} />
    </div>
  );
}

type Props = {
  profit: number;
  name: string;
  category: string;
  risk: number;
  url?: string;
};

const riskRate = [
  "",
  "매우높은위험",
  "높은위험",
  "다소높은위험",
  "보통위험",
  "낮은위험",
  "매우낮은위험",
];
const riskColorTextRate = [
  "",
  "#bc535f",
  "#a454ab",
  "#7860ba",
  "#696a78",
  "#0072bc",
  "##1E827B",
];
const riskColorBgRate = [
  "",
  "#e6aab1",
  "#d9b3de",
  "#cec1f0",
  "#afb0c0",
  "#97c3de",
  "#7fc6c7",
];
export default function RecommendItem({
  profit,
  name,
  category,
  risk,
  url,
}: Props) {
  const goToExternalSite = (url: string) => {
    window.location.href = url;
  };
  return (
    <div
      className="bg-[#f4f6f9] rounded-lg h-36 w-32 p-2 flex flex-col items-start"
      onClick={() => {
        if (url) goToExternalSite(url);
      }}
    >
      <span
        className="bg-green-200 p-1 px-2 rounded-md text-[8px] inline font-bold"
        style={{
          background: `${riskColorBgRate[risk]}`,
          color: `${riskColorTextRate[risk]}`,
        }}
      >
        {risk} {riskRate[risk]}
      </span>
      <div className="flex flex-col justify-between flex-1 w-full">
        <div>
          <p className="text-[10px] pt-2">{category}</p>
          <p className="text-sm font-semibold">{name}</p>
        </div>
        <div className="">
          <p className="text-xs text-end">수익률(세전, 연)</p>
          <p className="text-red-500 text-end font-semibold">{profit}%</p>
        </div>
      </div>
    </div>
  );
}

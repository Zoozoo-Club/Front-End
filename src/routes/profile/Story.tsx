import { PiExclamationMark } from "react-icons/pi";

export default function Story() {
  return (
    <div className="flex justify-center flex-col items-center h-full">
      <div className="bg-[#efefef] w-12 h-12 flex justify-center items-center rounded-full mb-4">
        <PiExclamationMark size={32} color={"#7d7d7d"} />
      </div>
      <p className="text-lg">작성된 스토리가 없습니다.</p>
    </div>
  );
}

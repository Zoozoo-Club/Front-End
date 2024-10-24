import React from "react";

export default function Ranking() {
  return (
    <div>
      <div className="flex gap-2 p-3">
        <div className="btn text-xs bg-[#CBD9FF] p-1 px-2 rounded-full ">
          수익률
        </div>
        <div className="btn text-xs bg-[#CBD9FF] p-1 px-2 rounded-full ">
          투자총액
        </div>
        <div className="btn text-xs bg-[#CBD9FF] p-1 px-2 rounded-full">
          참여자 수
        </div>
      </div>
      <div className="rank-container mx-2 my-2 rounded-lg shadow-xl shadow-slate-100">
        <div className="rank-item">1. 삼성전자 클럽 +16.3%</div>
        <div className="rank-item">2. SK하이닉스 클럽 +13.3%</div>
      </div>
    </div>
  );
}

import "../style.css";
type Props = {
  selectedMenu: "rank" | "info";
  onRank: () => void;
  onInfo: () => void;
};
function Menu({ selectedMenu, onRank, onInfo }: Props) {
  return (
    <div className="w-full h-12 border-solid border-b-2  border-slate-200 flex relative">
      <div
        onClick={onRank}
        className={`${
          selectedMenu === "rank" ? "" : "text-slate-300"
        } w-1/2 flex justify-center items-center `}
      >
        <p className="text-center">랭킹 보기</p>
      </div>
      <div
        onClick={onInfo}
        className={`${
          selectedMenu === "info" ? "" : "text-slate-300"
        } w-1/2 flex justify-center items-center `}
      >
        <p className="text-center">클럽 정보</p>
      </div>
      <div
        className={`w-1/2 absolute bg-black h-[2px] bottom-0 line ${
          selectedMenu === "info" ? "move-right" : ""
        }`}
      ></div>
    </div>
  );
}

export default Menu;

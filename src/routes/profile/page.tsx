import HeaderNav from "@/components/HeaderNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Avatar from "boring-avatars";
import Story from "./Story";
import Info from "./Info";

export default function Profile() {
  const navigate = useNavigate();
  const isFollowing = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<"story" | "stock">("story");
  const onRank = () => {
    setSelectedMenu("story");
  };
  const onInfo = () => {
    setSelectedMenu("stock");
  };
  const handleBack = () => {
    // /rank -> / , /rank/detail?club= -> /rank
    navigate("/");
  };

  return (
    <>
      <HeaderNav title={"프로필"} backBtn={handleBack}></HeaderNav>
      <div className="container flex-grow flex flex-col">
        <div className="my-info flex justify-between p-4 w-full">
          <div>
            <p className="text-2xl font-semibold">{"소욘"}</p>
            <p>{"삼성전자 클럽"}</p>
          </div>
          <Avatar name={"소욘"} variant="beam" width={48} />
        </div>
        <div className="my-info flex justify-between text-center px-8 py-2 items-center">
          <div className="cnt ">
            <p className="text-slate-400">스토리</p>
            <p className="font-semibold">{2}</p>
          </div>
          <div className="line w-[1px] bg-slate-400 h-6"></div>
          <div className="cnt">
            <p className="text-slate-400">팔로워</p>
            <p className="font-semibold">{2}</p>
          </div>
          <div className="line w-[1px] bg-slate-400 h-6"></div>
          <div className="cnt">
            <p className="text-slate-400">팔로잉</p>
            <p className="font-semibold">{2}</p>
          </div>
          <div className="line w-[1px] bg-slate-400 h-6"></div>
          <div className="cnt">
            <p className="text-slate-400">보유배지</p>
            <p className="font-semibold">{2}</p>
          </div>
        </div>
        <div className="btn-container p-4">
          {isFollowing ? (
            <div className="btn unfollow w-full h-12 bg-blue-500 rounded-lg text-center flex justify-center items-center my-2">
              <p className="text-white font-medium text-lg">언팔로우</p>
            </div>
          ) : (
            <div className="text-white font-medium text-lg">팔로우</div>
          )}
        </div>
        <Menu selectedMenu={selectedMenu} onRank={onRank} onInfo={onInfo} />
        <div className="flex-grow h-96 pb-12 overflow-scroll">
          {selectedMenu === "story" && <Story />}
          {selectedMenu === "stock" && <Info />}
        </div>
      </div>
    </>
  );
}

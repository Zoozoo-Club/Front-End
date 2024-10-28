import HeaderNav from "@/components/HeaderNav";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Avatar from "boring-avatars";
import Story from "./Story";
import Info from "./Info";
import { useAuthStore } from "@/store/store";
import useSWR from "swr";
import { IFollowerRes, IFollowingRes, IMyClubRes } from "@/apis/types";
import clubAPI from "@/apis/clubAPI";
import followsAPI from "@/apis/followsAPI";
import Loading from "@/components/Loading";

export default function Profile() {
  const navigate = useNavigate();
  const clubService = useMemo(() => new clubAPI(), []);
  const followService = useMemo(() => new followsAPI(), []);
  const { nickname } = useAuthStore();
  const [selectedMenu, setSelectedMenu] = useState<"story" | "stock">("story");

  // 내 팔로워/팔로잉 정보 가져오기
  const {
    data: follower,
    isLoading: isLoadingFollower,
    error: errorFollower,
  } = useSWR<IFollowerRes[] | null>("my-follower", () => 
    followService.myFollowers()
  );

  const {
    data: following,
    isLoading: isLoadingFollowing,
    error: errorFollowing,
  } = useSWR<IFollowingRes[] | null>("my-following", () => 
    followService.myFollowing()
  );

  // 클럽 정보 가져오기
  const {
    data: myClub,
    error: errorClub,
    isLoading: isLoadingClub,
  } = useSWR<IMyClubRes>("my-club", () => clubService.getMyClub());

  // 로딩 상태 통합 처리
  if (isLoadingFollower || isLoadingFollowing || isLoadingClub) {
    return <Loading fullScreen text="프로필 정보를 불러오는 중입니다" />;
  }

  // 에러 상태 통합 처리
  if (errorFollower || errorFollowing || errorClub) {
    navigate("/error");
  }

  const onRank = () => {
    setSelectedMenu("story");
  };

  const onInfo = () => {
    setSelectedMenu("stock");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <HeaderNav title={"프로필"} backBtn={handleBack}></HeaderNav>
      <div className="container flex-grow flex flex-col">
        <div className="my-info flex justify-between p-4 w-full">
          <div>
            <p className="text-2xl font-semibold">{nickname}</p>
            <p>{myClub?.clubName + " 클럽"}</p>
          </div>
          <Avatar name={nickname || ""} variant="beam" width={48} />
        </div>
        <div className="my-info flex justify-between text-center px-8 py-2 items-center">
          <div className="cnt ">
            <p className="text-slate-400">스토리</p>
            <p className="font-semibold">{0}</p>
          </div>
          <div className="line w-[1px] bg-slate-400 h-6"></div>
          <div className="cnt">
            <p className="text-slate-400">팔로워</p>
            <p className="font-semibold">{follower ? follower.length : 0}</p>
          </div>
          <div className="line w-[1px] bg-slate-400 h-6"></div>
          <div className="cnt">
            <p className="text-slate-400">팔로잉</p>
            <p className="font-semibold">{following ? following.length : 0}</p>
          </div>
          <div className="line w-[1px] bg-slate-400 h-6"></div>
          <div className="cnt">
            <p className="text-slate-400">보유배지</p>
            <p className="font-semibold">{0}</p>
          </div>
        </div>
        <div className="btn-container p-4"></div>
        <Menu selectedMenu={selectedMenu} onRank={onRank} onInfo={onInfo} />
        <div className="flex-grow h-96 pb-12 overflow-scroll">
          {selectedMenu === "story" && <Story />}
          {selectedMenu === "stock" && <Info />}
        </div>
      </div>
    </>
  );
}
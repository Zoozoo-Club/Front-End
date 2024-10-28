import HeaderNav from "@/components/HeaderNav";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./Menu";
import Avatar from "boring-avatars";
import Story from "./Story";
import followsAPI from "@/apis/followsAPI";
import useSWR, { mutate } from "swr";
import { IFollowerRes, IFollowingRes, IOtherInfo } from "@/apis/types";
import { useAuthStore } from "@/store/store";
import OtherInfo from "./OtherInfo";
import Loading from "@/components/Loading";

export default function OtherProfile() {
  const { id } = useParams(); // URL에서 id를 추출
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const { nickname } = useAuthStore();
  const service = useMemo(() => new followsAPI(), []);
  if (!id) {
    navigate("/error");
  }
  const [selectedMenu, setSelectedMenu] = useState<"story" | "stock">("story");

  const handleFollow = async () => {
    if (!id) return;
    try {
      console.log("눌리면 대답을해");
      await service.follow(+id);
      mutate("other-follower");
      mutate("other-following");
      setIsFollowing(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUnFollow = async () => {
    if (!id) return;
    try {
      console.log("눌리면 대답을해un");
      await service.unFollow(+id);
      mutate("other-follower");
      mutate("other-following");
      setIsFollowing(false);
    } catch (error) {
      console.error(error);
    }
  };
  const {
    data: follower,
    isLoading,
    error,
  } = useSWR<IFollowerRes[] | null>("other-follower", () =>
    id ? service.targetUserFollowers(+id) : null
  );
  const {
    data: following,
    isLoading: isLoading2,
    error: error2,
  } = useSWR<IFollowingRes[] | null>("other-following", () =>
    id ? service.targetUserFollowing(+id) : null
  );
  const {
    data,
    isLoading: isLoading3,
    error: error3,
  } = useSWR<IOtherInfo | null>("other-info", () =>
    id ? service.targetUserInfo(id) : null
  );
  useEffect(() => {
    console.log("flow0", follower);
  }, [id]);
  useEffect(() => {
    if (follower && follower?.length > 0) {
      const meFollow = follower.find((v) => v.nickname === nickname);
      if (meFollow) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    }
    if (nickname && nickname === data?.userName) navigate("/profile");
  }, [follower, nickname, data]);

  if (error || error2 || error3 || !id) {
    return <div> no id</div>;
  }
  if (isLoading || isLoading2 || isLoading3) {
    return <Loading size="md" text="유저 정보를 불러오는 중입니다" />;
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
            <p className="text-2xl font-semibold">{data?.userName}</p>
            <p>{data?.clubName + " 클럽"}</p>
          </div>
          <Avatar name={data?.userName} variant="beam" width={48} />
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
        <div className="btn-container p-4">
          {isFollowing ? (
            <div
              className="btn unfollow w-full h-12 bg-blue-500 rounded-lg text-center flex justify-center items-center my-2"
              onClick={handleUnFollow}
            >
              <p className="text-white font-medium text-lg">언팔로우</p>
            </div>
          ) : (
            <div
              className="btn unfollow w-full h-12 bg-blue-500 rounded-lg text-center flex justify-center items-center my-2"
              onClick={handleFollow}
            >
              <p className="text-white font-medium text-lg">팔로우</p>
            </div>
          )}
        </div>
        <Menu selectedMenu={selectedMenu} onRank={onRank} onInfo={onInfo} />
        <div className="flex-grow h-96 pb-12 overflow-scroll">
          {selectedMenu === "story" && <Story />}
          {selectedMenu === "stock" && <OtherInfo id={id} />}
        </div>
      </div>
    </>
  );
}

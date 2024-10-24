import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import IconSetting from "@/assets/icon-setting.svg?react";
export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-scroll">
      <div className="fixed w-full h-full overflow-hidden z-0">
        <div
          className="bg-cover bg-center w-full h-full fixed z-[-1]"
          style={{ backgroundImage: "url('/images/bg.jpg')" }}
        ></div>
      </div>
      <div className="max-w-xl w-xl h-screen-small relative z-1 m-auto flex flex-col items-center justify-between gap-6">
        <main className="flex-1 w-full h-full overflow-scroll bg-white flex flex-col">
          <Outlet />
        </main>
        <div className="nav h-12 bg-red-50 w-full max-w-[576px] fixed bottom-0 flex items-center">
          <div className="flex flex-1 gap-4 items-center text-center p-4">
            <p className="w-14 leading-snug" onClick={() => navigate("/")}>
              커뮤니티
            </p>
            <p className="w-14 leading-snug" onClick={() => navigate("/rank")}>
              주주클럽 랭킹
            </p>
            <p
              className="w-14 leading-snug"
              onClick={() => navigate("/profile")}
            >
              프로필
            </p>
            <p
              className="w-14 leading-snug"
              onClick={() => navigate("/lounge")}
            >
              주주클럽 라운지
            </p>
            <IconSetting />
          </div>
          <div className="w-12">
            <p>메뉴</p>
          </div>
        </div>
      </div>
    </div>
  );
}

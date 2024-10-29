import { Outlet, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import {
  useAuthStore,
  useLoginModalStore,
  useNextUrlStore,
} from "@/store/store";

export default function Layout() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const openLoginModal = useLoginModalStore((state) => state.openModal);
  const setNextUrl = useNextUrlStore((state) => state.setNextUrl);

  const handleNavigate = (path: string) => {
    if (path === "/profile" && !token) {
      setNextUrl(path);
      openLoginModal();
      return;
    }
    navigate(path);
  };

  return (
    <div className="w-full h-screen-small overflow-x-hidden overflow-y-scroll scroll">
      <div className="fixed w-full h-screen-small overflow-hidden z-0">
        <div
          className="bg-cover bg-center w-full h-screen-small fixed z-[-1]"
          style={{ backgroundImage: "url('/images/bg.jpg')" }}
        ></div>
      </div>
      <div className="max-w-xl w-xl h-screen-small relative z-1 m-auto flex flex-col items-center justify-between gap-6">
        <main className="flex-1 w-full h-screen-small overflow-hidden bg-white flex flex-col scroll fixed max-w-xl">
          <Outlet />
        </main>
        <div className="nav h-12 bg-white w-full max-w-[576px] fixed bottom-0 flex items-center">
          <div className="flex flex-1 gap-4 items-center text-center p-4">
            {/* <p className="flex-1 leading-snug" onClick={() => navigate('/')}>
              커뮤니티
            </p> */}
            <p
              className="flex-1 leading-snug text-sm"
              onClick={() => navigate("/rank")}
            >
              주주클럽
              <br />
              랭킹
            </p>
            <p
              className="flex-1 leading-snug"
              onClick={() => handleNavigate("/profile")}
            >
              프로필
            </p>
            <p
              className="flex-1 leading-snug text-sm"
              onClick={() => navigate("/lounge")}
            >
              주주클럽 <br />
              라운지
            </p>
          </div>
          <div className="w-12 h-full flex flex-col items-center justify-center bg-blue-500 text-white">
            <CiMenuBurger />
            <p className="text-xs">메뉴</p>
          </div>
        </div>
      </div>
    </div>
  );
}

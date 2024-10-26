import { useEffect, useState } from "react";
import "./modal.css";
import { useLoginModalStore } from "../store/store";
import { useAuth } from "@/hooks/useAuth";
const inputCSS = " rounded-lg px-3 py-2 w-full my-1";

export default function LoginPopup() {
  const { isOpen, closeModal } = useLoginModalStore();
  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget.classList.contains("main-modal")) {
      closeModal();
    }
  };
  const { signIn } = useAuth();

  const handleLogin = async () => {
    const res = await signIn({ userId: id, password: password });
    console.log("login res:", res);
  };
  useEffect(() => {
    //id,pw가 있으면
    if (id && password) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [id, password]);
  useEffect(() => {
    if (isOpen) {
      // 모달이 열리면 body의 overflow를 hidden으로 설정하여 배경 스크롤을 막음
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫히면 body의 overflow를 auto로 설정하여 배경 스크롤을 허용함
      document.body.style.overflow = "auto";
    }

    // 클린업 함수: 모달이 언마운트될 때 overflow를 auto로 설정하여 배경 스크롤을 허용함
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div
      className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
      style={{ background: "rgba(0,0,0,.7)", zIndex: "10000" }}
      onClick={(e) => {
        console.log("너냐");
        close(e);
      }}
    >
      <div
        className="border border-teal-500 modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content py-4 text-left px-6 ">
          <div className="modal-top flex justify-between items-center">
            <p className="text-2xl font-bold"></p>
            <div
              className="modal-close cursor-pointer z-50"
              onClick={() => closeModal()}
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="modal-body my-3 text-center">
            <div className="bg-white/40 rounded-lg px-2 py-4 space-y-4">
              <p className="text-start text-2xl font-semibold  pb-4">
                ID와 접속 비밀번호를
                <br />
                입력하세요
              </p>
              <div>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="ID"
                  className={`${inputCSS} bg-[#f3f9fe] `}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="접속 비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputCSS} bg-[#f7f7f7] `}
                />
              </div>
            </div>
          </div>
          <div className="modal-bottom flex justify-center pt-2">
            <button
              onClick={handleLogin}
              className="focus:outline-none px-4 bg-indigo-500 p-3 ml-3 rounded-lg text-white hover:bg-indigo-400"
              disabled={!isValid}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

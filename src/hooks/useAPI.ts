import { catfactAPI } from "@/apis/catfactAPI";
import dummyAPI from "../apis/dummyAPI";

//key가 있다면 sessionKey를 param으로 받음. 없음 x
const createAPIs = (sessionKey: string) => {
  if (sessionKey) {
    return {
      dummyAPI: new dummyAPI(sessionKey),
      catfactAPI: new catfactAPI(sessionKey),
    };
  }
  return {
    dummyAPI: new dummyAPI(),
    catfactAPI: new catfactAPI(),
  };
};

let savedSession: string | undefined;
let savedAPI: ReturnType<typeof createAPIs> | undefined;
export function getAPI() {
  // 전역상태(상태관리lib에서 저장하는)에 저장된 세션 가져옴
  // const session = useSession.getState().session;
  const session = "";
  if (session && savedSession !== session) {
    savedSession = session;
    savedAPI = createAPIs(session);
  } else {
    savedAPI = createAPIs("");
  }
  return savedAPI;
}

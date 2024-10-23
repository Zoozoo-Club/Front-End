import { ICatfact, ICatfactRes } from "../apis/catfactAPI";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAPI } from "./useAPI";
import { useCommonModalStore } from "@/store/store";
const DATA_PER_PAGE = 20;

const observerOptions = {
  // 뷰포트 요소. 해당root에서 얼마나 보여질것인가
  rootMargin: "40px", //바깥여백을 활용해 Root범위를 확장&축소 가능 viewport 영역밖까지 잡아줄 수 있음
  threshold: 0, // 0 : 1px라도 보이면실행. 1 다보이면실행?
};

//무한스크롤을 위한 catfact api 사용
export function useCatfactInfinityScroll() {
  const { catfactAPI } = getAPI();
  const [datas, setDatas] = useState<ICatfact[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, SetError] = useState(false);
  const { openModal, closeModal } = useCommonModalStore();
  const observer = useRef<IntersectionObserver | null>(null);
  const prevPageRef = useRef<number | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
          console.log("page up", entries[0]);
        }
      }, observerOptions);

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const loadMoreData = async () => {
    if (prevPageRef.current === page) return; // 같은 페이지일 경우 로딩하지 않음
    console.log("preve Page :", prevPageRef.current);
    setLoading(true);
    try {
      const resData: ICatfactRes = await catfactAPI.getcatfacts(
        page,
        DATA_PER_PAGE
      );
      // 마지막 페이지
      console.log("load");
      if (resData.current_page === resData.last_page) {
        setHasMore(false);
        openModal("Alert", "전부 로딩 완료!", closeModal);
      }

      setDatas((prev) => [...prev, ...resData.data]);
      prevPageRef.current = page;
    } catch (error) {
      console.error("Error fetching data:", error);
      openModal("Error", "Error!", closeModal);
      SetError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    loadMoreData();
  }, [page]);

  return { error, loading, hasMore, datas, lastElementRef };
}

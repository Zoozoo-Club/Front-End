import { useCatfactInfinityScroll } from "@/hooks/useCatfactInfinityScroll";

export const InfinityScrollComponent = () => {
  const { error, loading, datas, lastElementRef } = useCatfactInfinityScroll();

  if (error) {
    return (
      <div>
        <p>Error!</p>
      </div>
    );
  }
  return (
    <div className="flex-1" id="scrollArea">
      {datas &&
        datas.map((data, idx) => {
          if (idx !== datas.length - 1) {
            return (
              <div
                className={`idx-${idx} border border-blue-500 rounded mb-2 p-2`}
                key={idx}
              >
                {data.fact}
              </div>
            );
          } else {
            return (
              <div
                key={idx}
                ref={lastElementRef}
                className={`idx-${idx} border border-gray-500 rounded bg-gray-200`}
              >
                {data.fact}
              </div>
            );
          }
        })}
      {loading && (
        <div className="loading">
          <p>loading...</p>
        </div>
      )}
    </div>
  );
};

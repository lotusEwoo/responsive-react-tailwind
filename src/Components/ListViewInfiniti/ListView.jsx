import { useEffect, useRef } from "react";
import { useOrderListQueryHook } from "./hook";

export const OrderListView = () => {
  const {
    data,
    loading: isRefetching,
    thresholdElementRef,
    loadMore,
    pagination,
    refetch: queryItems,
  } = useOrderListQueryHook();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    queryItems({ skip: 0, limit: 10 });
  }, []);

  // keep scroll position when re-render
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }
    if (isRefetching && pagination.skip === 0) {
      window.scrollTo(0, 0);
    } else {
      const scrollPosition = container.scrollTop;
      requestAnimationFrame(() => {
        container.scrollTop = scrollPosition;
      });
    }
  }, [data.items, isRefetching, pagination.skip]);

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="relative flex flex-col gap-3 overflow-auto p-3 pb-[60px] md:hidden "
      >
        {isRefetching
          ? new Array(4)
              .fill(0)
              .map((_, index) => <SkeletonOrderItem key={index} />)
          : data?.items?.map((each, index) => (
              <div
                ref={
                  index === data.items.length - 1 ? thresholdElementRef : null
                }
                key={each?.id}
                className="mx-auto w-full max-w-md rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 border border-lime-200 flex flex-col justify-center items-center gap-2"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-600 text-white font-bold text-lg shadow">
                  {each.id}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {each.name}
                </h2>
                <p className="text-sm text-gray-500">
                  This is a sample order card
                </p>
              </div>
            ))}

        {/* skeleton load more  */}
        {loadMore &&
          new Array(5)
            .fill(0)
            .map((_, index) => (
              <SkeletonOrderItem key={index + data.items.length} />
            ))}
      </div>
    </>
  );
};

export const SkeletonOrderItem = () => {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-white border border-lime-200 p-6 shadow-lg">
      <div className="flex flex-col items-center justify-center animate-pulse space-y-3">
        {/* Avatar circle */}
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>

        {/* Title line */}
        <div className="h-4 w-32 rounded bg-gray-300"></div>

        {/* Subtitle line */}
        <div className="h-3 w-24 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

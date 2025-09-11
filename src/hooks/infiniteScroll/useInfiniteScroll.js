// https://dev.to/moruno21/graphql-infinite-scroll-4oan
import useIntersectedElement from "./useIntersectedElement";

const useInfiniteScroll = ({ fetchNextPage, options }) => {
  const { thresholdElementRef } = useIntersectedElement({
    callback: fetchNextPage,
    options,
  });

  return { thresholdElementRef };
};

export default useInfiniteScroll;

import { useCallback, useState } from "react";
import useInfiniteScroll from "../../hooks/infiniteScroll/useInfiniteScroll";
import { useOrderListLazyQuery } from "./fakeAPI";

export function useOrderListQueryHook() {
  const [queryOrderList, { fetchMore }] = useOrderListLazyQuery({});

  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
  const [loading, setLoading] = useState();
  const [loadMore, setLoadMore] = useState(false);
  const [data, setData] = useState({ items: [], total: 0 });

  const refetch = useCallback(
    (paginationFetch) => {
      setLoading(true);

      if (!paginationFetch) {
        setPagination({ skip: 0, limit: pagination.limit });
      }

      queryOrderList({
        variables: {
          query: {
            skip: 0,
            limit: pagination.limit,
            ...paginationFetch,
          },
        },
      })
        .then((res) => {
          setData(res?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef
    [queryOrderList]
  );

  const fetchMoreData = useCallback(() => {
    if (
      loadMore ||
      loading ||
      data.items.length >= data.total ||
      pagination.skip >= data.total
    )
      return;

    setLoadMore(true);

    fetchMore({
      variables: {
        query: {
          skip: data.items.length ?? pagination.skip + 10,
          limit: pagination.limit,
        },
      },
    })
      .then((fetchMoreResult) => {
        setData((prev) => ({
          items: [...prev.items, ...fetchMoreResult.data.items],
          total: fetchMoreResult.data.total,
        }));
        setPagination((prev) => ({
          ...prev,
          skip: prev.skip + 10,
        }));
      })
      .finally(() => setLoadMore(false));
  }, [
    loadMore,
    loading,
    data.items,
    data.total,
    pagination.skip,
    pagination.limit,
    fetchMore,
  ]);

  const { thresholdElementRef } = useInfiniteScroll({
    fetchNextPage: fetchMoreData,
    options: { rootMargin: "300px" },
  });

  return {
    refetch,
    loading,
    loadMore,
    data,
    fetchMore,
    thresholdElementRef,
    pagination,
  };
}

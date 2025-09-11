import { useState } from "react";

// fake query hook
export function useOrderListLazyQuery() {
  const [called, setCalled] = useState(false);

  const fakeDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const queryOrderList = async ({ variables }) => {
    setCalled(true);

    const { skip = 0, limit = 10 } = variables.query || {};

    await fakeDelay(1500);

    // fake items
    const items = Array.from({ length: limit }).map((_, i) => {
      const id = skip + i + 1;
      return {
        id,
        name: `Item #${id}`,
      };
    });

    const total = 100; // giả sử tổng có 50 bản ghi

    return {
      data: {
        items,
        total,
      },
    };
  };

  const fetchMore = ({ variables }) => {
    return queryOrderList({ variables });
  };

  return [queryOrderList, { fetchMore, called }];
}

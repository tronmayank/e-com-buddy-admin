import { QueryStatus } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";

type UseCustomPaginationPropsType<T> = {
  useEndPointHook: {
    data?: any | T;
    isLoading: boolean;
    isFetching: boolean;
    error?: any;
    status: QueryStatus;
  };
};

export const useGetDataByCustomQuery = <T>({
  useEndPointHook,
}: UseCustomPaginationPropsType<T>) => {
  const [items, setItems] = useState<T | null>(null);

  const { data, isLoading, isFetching } = useEndPointHook;

  useEffect(() => {
    if (!isFetching && !isLoading) {
      if (data) {
        setItems(data?.data);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, data]);

  return { items, isLoading, isFetching };
};

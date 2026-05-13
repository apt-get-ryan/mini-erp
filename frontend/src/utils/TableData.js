import { useMemo } from "react";

function useSortedData(data, sortStatus) {
  return useMemo(() => {
    const sorted = [...data];

    sorted.sort((a, b) => {
      const column = sortStatus.columnAccessor;

      const first = a?.[column];
      const second = b?.[column];

      if (sortStatus.direction === 'asc') {
        if (first == null && second != null) return -1;
        if (first != null && second == null) return 1;
      }

      if (sortStatus.direction === 'desc') {
        if (first == null && second != null) return 1;
        if (first != null && second == null) return -1;
      }

      if (typeof first === 'string' && typeof second === 'string') {
        return sortStatus.direction === 'asc'
          ? first.localeCompare(second)
          : second.localeCompare(first);
      }

      if (first > second) {
        return sortStatus.direction === 'asc' ? 1 : -1;
      }

      if (first < second) {
        return sortStatus.direction === 'asc' ? -1 : 1;
      }

      return 0;
    });

    return sorted;
  }, [data, sortStatus]);
};


export {useSortedData};
import {useMemo} from "react";

export const useSortedPosts = (posts, currentPage, selectedSort) => {
  return useMemo(() => {
    if (selectedSort) {
      return [...currentPage].sort((a, b) =>
          a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return currentPage;
  }, [selectedSort, currentPage]);
};
export const usePosts = (posts, currentPage, selectedSort, searchQuery) => {
  const sortedPosts = useSortedPosts(posts, currentPage, selectedSort);
  return useMemo(() => {
    return sortedPosts.filter((item) => {
      if (selectedSort) {
        return item[selectedSort]
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
      }
      return item;
    });
  }, [searchQuery, sortedPosts, selectedSort]);
};

import { useMemo } from "react";

export const useSortedPosts = (posts, selectedSort) => {
    const sortedPosts = useMemo(() => {
        if (selectedSort) {
            return [...posts]
                .sort((a, b) => a[selectedSort]
                    .localeCompare(b[selectedSort]))
        }
        return posts;
    }, [selectedSort, posts]);
    return sortedPosts;
}

export const usePosts = (posts, selectedSort, searchQuery) => {
    const sortedPosts = useSortedPosts(posts, selectedSort);
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(item => {
            if (selectedSort) {
                return item[selectedSort]
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            }
            return item;
        });
    }, [searchQuery, sortedPosts]);
    return sortedAndSearchedPosts;

} 

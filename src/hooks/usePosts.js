import { useMemo } from "react";

/** Отсортированный список постов */
export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    let sortedPosts = posts;

    if (sort) {
      sortedPosts = [...posts].sort((a, b) => {
        return a[sort].localeCompare(b[sort]);
      });
    }

    return sortedPosts;
  }, [sort, posts]);

  return sortedPosts;
};


/** Отсортированный (с помощью поиска и фильтрации) список постов */
export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);

  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [query, sortedPosts]);

  return sortedAndSearchPosts;
};

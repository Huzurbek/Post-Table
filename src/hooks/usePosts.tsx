import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ETableHeaderType,
  IPagination,
  IPost,
  ISort,
  SortOption,
} from "../types";

const reactNodeParse = (value: string, filter: string) => {
  return value.split("~!").map((val, i) => {
    if (val === filter)
      return (
        <span key={i} className="search-hightligh">
          {val}
        </span>
      );
    return val;
  });
};

export const usePost = ({ autoLoad }: { autoLoad?: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<ISort | null>(null);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    perPage: 10,
  });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const posts = (await response.json()) as IPost[];
      setPosts(posts);
      setTotal(posts.length);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [setLoading, setPosts, setTotal]);

  useEffect(() => {
    if (autoLoad === true) void fetchPosts();
  }, [autoLoad, fetchPosts]);

  const postsData = useMemo((): Record<
    string,
    (string | JSX.Element)[] | string
  >[] => {
    const start = (pagination?.page - 1 ?? 0) * pagination.perPage;
    let slicedPosts = posts.slice(start, start + pagination.perPage);

    if (sort != null) {
      console.log(sort);
      slicedPosts = slicedPosts.sort((a, b) => {
        const key = sort.key as keyof IPost;
        if (sort.type === ETableHeaderType.Number) {
          if (sort.sort === SortOption.ASC)
            return Number(a[key]) - Number(b[key]);
          return Number(b[key]) - Number(a[key]);
        } else {
          if (sort.sort === SortOption.ASC)
            return a[key].toString().localeCompare(b[key].toString());
          return b[key].toString().localeCompare(a[key].toString());
        }
      });
    }

    if (filter.length > 0)
      slicedPosts = slicedPosts.reduce<IPost[]>((acc, post) => {
        const currentPost = { ...post };
        let flag = false;
        Object.keys(post).forEach((key) => {
          const property = key as keyof IPost;
          if (String(post[property]).includes(filter)) {
            flag = true;
            currentPost[property] = currentPost[property]
              .toString()
              .replace(new RegExp(filter, "gi"), `~!${filter}~!`) as never;
          }
        });
        if (flag) acc.push(currentPost);
        return Object.values(acc);
      }, []);

    return slicedPosts.map((post) => ({
      body: reactNodeParse(post.body, filter),
      id: reactNodeParse(post.id.toString(), filter),
      title: reactNodeParse(post.title, filter),
      userId: post.userId.toString(),
    }));
  }, [posts, filter, pagination, sort]);
  return {
    loading,
    fetchPosts,
    postsData,
    setFilter,
    setPagination,
    pagination,
    total,
    setSort,
  };
};

import { useState, useEffect } from "react";
import { PostList } from "./PostList";
import { useGetPostsQuery } from "../../store/features/api/apiSlice";
import type { Post } from "../../models";

interface AllPostsContainerProps {
  onPostsRefresh?: () => void;
}

const AllPostsContainer = ({ onPostsRefresh }: AllPostsContainerProps) => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const {
    data: postsData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetPostsQuery(
    {
      page,
      limit: 10,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // Handle infinite scroll pagination
  useEffect(() => {
    if (postsData) {
      if (page === 1) {
        setAllPosts(postsData);
      } else {
        setAllPosts((prev) => [...prev, ...postsData]);
      }
    }
  }, [postsData, page]);

  const loadMorePosts = () => {
    if (!isFetching && postsData && postsData.length === 10) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    refetch();
    onPostsRefresh?.();
  };

  // Expose refresh function for parent components
  useEffect(() => {
    if (onPostsRefresh) {
      (window as any).postListRefresh = handleRefresh;
    }
    return () => {
      if ((window as any).postListRefresh) {
        delete (window as any).postListRefresh;
      }
    };
  }, [onPostsRefresh]);

  return (
    <PostList
      posts={allPosts}
      isLoading={isLoading}
      error={error}
      emptyMessage="No posts yet"
      emptyDescription="Be the first to share a post!"
      hasMorePosts={postsData && postsData.length === 10}
      isLoadingMore={isFetching}
      onLoadMore={loadMorePosts}
    />
  );
};

export { AllPostsContainer };

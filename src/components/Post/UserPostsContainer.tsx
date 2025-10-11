import { useState, useEffect } from "react";
import { PostList } from "./PostList";
import { useGetPostsByUserIdQuery } from "../../store/features/api/apiSlice";
import type { Post } from "../../models";

interface UserPostsContainerProps {
  userId: string;
}

const UserPostsContainer = ({ userId }: UserPostsContainerProps) => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const {
    data: postsData,
    isLoading,
    error,
    isFetching,
  } = useGetPostsByUserIdQuery(
    {
      userId,
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

  // Reset pagination when userId changes
  useEffect(() => {
    setPage(1);
    setAllPosts([]);
  }, [userId]);

  const loadMorePosts = () => {
    if (!isFetching && postsData && postsData.length === 10) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <PostList
      posts={allPosts}
      isLoading={isLoading}
      error={error}
      emptyMessage="No posts yet"
      emptyDescription="This user hasn't shared any posts."
      hasMorePosts={postsData && postsData.length === 10}
      isLoadingMore={isFetching}
      onLoadMore={loadMorePosts}
    />
  );
};

export { UserPostsContainer };

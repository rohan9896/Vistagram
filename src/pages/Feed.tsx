import {
  Flex,
  VStack,
  Spinner,
  Center,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { PostComponent, UserCard } from "../components";
import { CreatePost } from "../components/CreatePost";
import CreatePostButton from "../components/CreatePostButton";
import { useAppSelector } from "../store/store";
import { useGetPostsQuery } from "../store/features/api/apiSlice";
import { useState, useEffect } from "react";
import { formatTimestamp } from "../utils";

const Feed = () => {
  const user = useAppSelector((state) => state.user.user);
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<any[]>([]);

  const {
    data: posts,
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

  // infinite scroll pagination
  useEffect(() => {
    if (posts) {
      if (page === 1) {
        setAllPosts(posts);
      } else {
        setAllPosts((prev) => [...prev, ...posts]);
      }
    }
  }, [posts, page]);

  const loadMorePosts = () => {
    if (!isFetching && posts && posts.length === 10) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePostCreated = () => {
    setPage(1);
    refetch();
  };

  if (isLoading) {
    return (
      <Flex minH="100vh" bg="gray.50" justify="center" align="center">
        <Center>
          <VStack spacing={4}>
            <Spinner size="xl" color="vistagram.500" />
            <Text color="gray.600">Loading posts...</Text>
          </VStack>
        </Center>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex minH="100vh" bg="gray.50" justify="center" align="center">
        <Center>
          <Text color="red.500">Failed to load posts. Please try again.</Text>
        </Center>
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" bg="gray.50" justify="center" align="start" py={8}>
      <VStack spacing={6} padding={"1rem"} pb="6rem">
        <Box
          padding="1rem"
          border="1px solid"
          borderColor="gray.200"
          rounded="1rem"
          width="100%"
        >
          <CreatePost
            currentUserAvatar={user?.avatar ?? ""}
            onSuccess={handlePostCreated}
          />
        </Box>

        {/* <UserCard /> */}

        {allPosts?.map((post) => (
          <PostComponent
            key={post.id}
            postId={post.id}
            username={post.username}
            location={post.location}
            userAvatar={post.userAvatar}
            imageUrl={post.imageUrl}
            caption={post.caption}
            initialLikes={post.likes}
            timestamp={formatTimestamp(post.createdAt)}
            isLikedByUser={post.isLikedByUser}
          />
        ))}

        {/* Load More Button */}
        {posts && posts.length === 10 && (
          <Button
            onClick={loadMorePosts}
            isLoading={isFetching}
            loadingText="Loading more..."
            colorScheme="vistagram"
            variant="outline"
            size="md"
          >
            Load More Posts
          </Button>
        )}
      </VStack>

      <CreatePostButton />
    </Flex>
  );
};

export { Feed };

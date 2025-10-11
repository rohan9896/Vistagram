import { Flex, VStack, Spinner, Center, Text } from "@chakra-ui/react";
import { PostComponent } from "../components";
import { CreatePost } from "../components/CreatePost";
import CreatePostButton from "../components/CreatePostButton";
import { useAppSelector } from "../store/store";
import { useGetPostsQuery } from "../store/features/api/apiSlice";

const Feed = () => {
  const user = useAppSelector((state) => state.user.user);
  const { data: posts, isLoading, error } = useGetPostsQuery();

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString();
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
      <VStack spacing={6} padding={"1rem"}>
        <CreatePost
          currentUserAvatar={user?.avatar ?? ""}
          onSubmit={() => {}}
        />

        {posts?.map((post) => (
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
          />
        ))}
      </VStack>

      <CreatePostButton />
    </Flex>
  );
};

export { Feed };

import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Container,
} from "@chakra-ui/react";
import { UserCard } from "../components/UserCard";
import { PostComponent } from "../components/PostComponent";
import {
  useGetUserByIdQuery,
  useGetPostsByUserIdQuery,
} from "../store/features/api/apiSlice";
import { useAppSelector } from "../store/store";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();

  const loggedInUserId = useAppSelector((state) => state.user.user?.id);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByIdQuery(userId!);

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useGetPostsByUserIdQuery(userId!);

  if (userLoading) {
    return (
      <Container maxW="container.md" py={8}>
        <VStack spacing={4}>
          <Spinner size="lg" color="vistagram.500" />
          <Text>Loading user profile...</Text>
        </VStack>
      </Container>
    );
  }

  if (userError) {
    return (
      <Container maxW="container.md" py={8}>
        <Alert status="error">
          <AlertIcon />
          Failed to load user profile. Please try again.
        </Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxW="container.md" py={8}>
        <Alert status="warning">
          <AlertIcon />
          User not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Flex minH="100vh" bg="gray.50" justify="center" align="start" py={8}>
      <VStack spacing={6} padding="1rem" maxW="470px" width="100%">
        {/* User Card */}
        <UserCard user={user} />

        {/* Posts Section */}
        <Box width="100%">
          <Heading
            margin="1rem"
            size="lg"
            mb={6}
            color="gray.800"
            textAlign="left"
          >
            {loggedInUserId === user.id ? "My" : ""} Posts
          </Heading>

          {postsLoading ? (
            <VStack spacing={4}>
              <Spinner size="lg" color="vistagram.500" />
              <Text>Loading posts...</Text>
            </VStack>
          ) : postsError ? (
            <Alert status="error">
              <AlertIcon />
              Failed to load posts. Please try again.
            </Alert>
          ) : !posts || posts.length === 0 ? (
            <Box
              textAlign="center"
              py={12}
              bg="white"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.200"
            >
              <Text fontSize="lg" color="gray.500" mb={2}>
                No posts yet
              </Text>
              <Text fontSize="sm" color="gray.400">
                This user hasn't shared any posts.
              </Text>
            </Box>
          ) : (
            <VStack spacing={6}>
              {posts.map((post) => (
                <PostComponent
                  key={post.id}
                  postId={post.id}
                  username={post.username}
                  location={post.location || ""}
                  userAvatar={post.userAvatar}
                  imageUrl={post.imageUrl}
                  caption={post.caption}
                  initialLikes={post.likes}
                  timestamp={post.createdAt}
                />
              ))}
            </VStack>
          )}
        </Box>
      </VStack>
    </Flex>
  );
};

export { UserProfile };

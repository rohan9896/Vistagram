import {
  VStack,
  Spinner,
  Text,
  Button,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/react";
import { PostCard } from "./PostCard";
import type { Post } from "../models";

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  error: any;
  emptyMessage?: string;
  emptyDescription?: string;
  hasMorePosts?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

const PostList = ({
  posts,
  isLoading,
  error,
  emptyMessage = "No posts yet",
  emptyDescription = "Be the first to share a post!",
  hasMorePosts = false,
  isLoadingMore = false,
  onLoadMore,
}: PostListProps) => {
  if (isLoading) {
    return (
      <VStack spacing={4} py={8}>
        <Spinner size="lg" color="vistagram.500" />
        <Text color="gray.600">Loading posts...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="lg">
        <AlertIcon />
        Failed to load posts. Please try again.
      </Alert>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Box
        textAlign="center"
        py={12}
        bg="white"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text fontSize="lg" color="gray.500" mb={2}>
          {emptyMessage}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {emptyDescription}
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={6} width="100%">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMorePosts && posts.length >= 10 && (
        <Button
          onClick={onLoadMore}
          isLoading={isLoadingMore}
          loadingText="Loading more..."
          colorScheme="vistagram"
          variant="outline"
          size="md"
        >
          Load More Posts
        </Button>
      )}
    </VStack>
  );
};

export { PostList };

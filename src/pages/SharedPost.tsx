import {
  Box,
  Center,
  Spinner,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SharedPostView } from "../components/SharedPostView";

interface PostData {
  id: number;
  userId: number;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  location: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

const SharedPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedPost = async () => {
      if (!postId) {
        setError("Invalid post ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // This will be replaced with the actual API call once backend is ready
        const response = await fetch(
          `http://localhost:3000/api/shared-posts/${postId}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            setError("Post not found or not available for sharing");
          } else {
            setError("Failed to load shared post");
          }
          setLoading(false);
          return;
        }

        const postData = await response.json();
        setPost(postData);
      } catch (err) {
        console.error("Error fetching shared post:", err);
        setError("Failed to load shared post");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedPost();
  }, [postId]);

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Center h="100vh">
          <VStack spacing={4}>
            <Spinner size="xl" color="vistagram.500" />
            <Text color="gray.600">Loading shared post...</Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Center h="100vh">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            maxW="400px"
            borderRadius="lg"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Post Not Found
            </AlertTitle>
            <AlertDescription maxWidth="sm" mb={4}>
              {error ||
                "The shared post you're looking for doesn't exist or is no longer available."}
            </AlertDescription>
            <Button
              colorScheme="vistagram"
              size="sm"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
          </Alert>
        </Center>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <SharedPostView
        postId={post.id}
        username={post.username}
        location={post.location}
        userAvatar={post.userAvatar}
        imageUrl={post.imageUrl}
        caption={post.caption}
        likes={post.likes}
        timestamp={formatTimestamp(post.createdAt)}
      />
    </Box>
  );
};

export { SharedPost };

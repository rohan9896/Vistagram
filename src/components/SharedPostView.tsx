import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { MdLocationOn } from "react-icons/md";

interface SharedPostViewProps {
  postId: number;
  username: string;
  location: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  timestamp: string;
}

const SharedPostView = ({
  username,
  location,
  userAvatar,
  imageUrl,
  caption,
  likes,
  timestamp,
}: SharedPostViewProps) => {
  const formatTimestamp = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={6}>
        {/* Header */}
        <Box textAlign="center">
          <Heading size="lg" color="gray.800" mb={2}>
            Shared Post
          </Heading>
          <Text color="gray.600" fontSize="sm">
            View this post from Vistagram
          </Text>
        </Box>

        {/* Post Card */}
        <Box
          maxW="470px"
          bg="white"
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          w="full"
        >
          {/* User Header */}
          <Flex align="center" justify="space-between" px={4} py={3}>
            <HStack spacing={3}>
              <Avatar
                size="sm"
                name={username}
                src={userAvatar}
                border="2px solid"
                borderColor="vistagram.500"
              />
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                  {username}
                </Text>
                <HStack spacing={1}>
                  <MdLocationOn size={12} color="gray.500" />
                  <Text fontSize="xs" color="gray.600">
                    {location}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </Flex>

          {/* Post Image */}
          <Box position="relative" bg="gray.100">
            <Image
              src={imageUrl}
              alt="Shared post image"
              width="100%"
              objectFit="cover"
              maxH="600px"
            />
          </Box>

          {/* Post Content */}
          <Box px={4} py={3}>
            {/* Like Count */}
            <Text fontSize="sm" fontWeight="semibold" color="gray.800" mb={2}>
              {likes.toLocaleString()} likes
            </Text>

            {/* Caption */}
            <Text fontSize="sm" color="gray.800" mb={3}>
              <Text as="span" fontWeight="semibold" mr={2}>
                {username}
              </Text>
              {caption}
            </Text>

            {/* Timestamp */}
            <Text fontSize="xs" color="gray.600">
              {formatTimestamp(timestamp)}
            </Text>
          </Box>
        </Box>

        {/* Footer */}
        <Box textAlign="center" py={4}>
          <Text fontSize="sm" color="gray.600" mb={2}>
            Want to see more posts like this?
          </Text>
          <Text fontSize="sm" color="vistagram.500" fontWeight="semibold">
            Join Vistagram to explore more content
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export { SharedPostView };

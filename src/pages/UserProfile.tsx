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
} from "@chakra-ui/react";
import { UserCard, UserPostsContainer } from "../components";
import { useGetUserByIdQuery } from "../store/features/api/apiSlice";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByIdQuery(userId!);

  if (userLoading) {
    return (
      <Flex minH="100vh" bg="gray.50" justify="center" align="center">
        <VStack spacing={4}>
          <Spinner size="lg" color="vistagram.500" />
          <Text>Loading user profile...</Text>
        </VStack>
      </Flex>
    );
  }

  if (userError) {
    return (
      <Flex
        minH="100vh"
        bg="gray.50"
        justify="center"
        align="center"
        px={{ base: 2, sm: 4 }}
      >
        <Alert status="error" maxW={{ base: "90%", sm: "470px" }}>
          <AlertIcon />
          Failed to load user profile. Please try again.
        </Alert>
      </Flex>
    );
  }

  if (!user) {
    return (
      <Flex
        minH="100vh"
        bg="gray.50"
        justify="center"
        align="center"
        px={{ base: 2, sm: 4 }}
      >
        <Alert status="warning" maxW={{ base: "90%", sm: "470px" }}>
          <AlertIcon />
          User not found.
        </Alert>
      </Flex>
    );
  }

  return (
    <Flex
      minH="100vh"
      bg="gray.50"
      justify="center"
      align="start"
      py={8}
      px={{ base: 2, sm: 4 }}
    >
      <VStack
        spacing={6}
        padding={{ base: "0.5rem", sm: "1rem" }}
        maxW="500px"
        width="100%"
      >
        {/* User Card */}
        <UserCard user={user} />

        {/* Posts Section */}
        <Box width="100%">
          <Heading size="lg" mb={6} color="gray.800" textAlign="center">
            Posts
          </Heading>

          <UserPostsContainer userId={userId!} />
        </Box>
      </VStack>
    </Flex>
  );
};

export { UserProfile };

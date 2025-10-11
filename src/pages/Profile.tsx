import { Box, Container, Flex, VStack, Heading, Text } from "@chakra-ui/react";
import { UserCard } from "../components";
import { useAppSelector } from "../store/store";

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (!isLoggedIn || !user) {
    return (
      <Container maxW="container.md" py={8}>
        <Flex justify="center" align="center" minH="50vh">
          <VStack spacing={4}>
            <Heading size="lg" color="gray.600">
              Please log in to view your profile
            </Heading>
            <Text color="gray.500">
              You need to be logged in to access this page.
            </Text>
          </VStack>
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={2} color="gray.800">
            My Profile
          </Heading>
          <Text color="gray.600">
            Manage your account information and settings
          </Text>
        </Box>

        <Flex justify="center">
          <UserCard user={user} />
        </Flex>

        {/* Future sections can be added here */}
        <Box
          p={6}
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
        >
          <Heading size="md" mb={4} color="gray.800">
            Account Statistics
          </Heading>
          <VStack align="start" spacing={2}>
            <Text color="gray.600">
              <Text as="span" fontWeight="semibold">
                Posts:
              </Text>{" "}
              Coming soon
            </Text>
            <Text color="gray.600">
              <Text as="span" fontWeight="semibold">
                Followers:
              </Text>{" "}
              Coming soon
            </Text>
            <Text color="gray.600">
              <Text as="span" fontWeight="semibold">
                Following:
              </Text>{" "}
              Coming soon
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export { Profile };

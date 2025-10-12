import { Flex, VStack, Box } from "@chakra-ui/react";
import { AllPostsContainer, CreatePostButton } from "../components";
import { CreatePost } from "../components/CreatePost/CreatePost";
import { useAppSelector } from "../store/store";

const Feed = () => {
  const user = useAppSelector((state) => state.user.user);

  const handlePostCreated = () => {
    if ((window as any).postListRefresh) {
      (window as any).postListRefresh();
    }
  };

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
        pb="6rem"
        width="100%"
        maxW="500px"
      >
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

        <AllPostsContainer />
      </VStack>

      <CreatePostButton />
    </Flex>
  );
};

export { Feed };

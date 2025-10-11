import { Flex, VStack, Box } from "@chakra-ui/react";
import { AllPostsContainer } from "../components";
import { CreatePost } from "../components/CreatePost";
import CreatePostButton from "../components/CreatePostButton";
import { useAppSelector } from "../store/store";

const Feed = () => {
  const user = useAppSelector((state) => state.user.user);

  const handlePostCreated = () => {
    if ((window as any).postListRefresh) {
      (window as any).postListRefresh();
    }
  };

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

        <AllPostsContainer onPostsRefresh={handlePostCreated} />
      </VStack>

      <CreatePostButton />
    </Flex>
  );
};

export { Feed };

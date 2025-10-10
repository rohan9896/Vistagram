import { Flex, VStack } from "@chakra-ui/react";
import { PostComponent } from "../components";

const Post = () => {
  return (
    <Flex minH="100vh" bg="gray.50" justify="center" align="start" py={8}>
      <VStack spacing={6}>
        {/* <PostComponent /> */}

        <PostComponent
          username="mountain_explorer"
          location="Swiss Alps, Switzerland"
          userAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
          imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
          caption="The mountains are calling and I must go 🏔️ What an incredible view!The mountains are calling and I must go 🏔️ What an incredible view!The mountains are calling and I must go 🏔️ What an incredible view!The mountains are calling and I must go 🏔️ What an incredible view!The mountains are calling and I must go 🏔️ What an incredible view!The mountains are calling and I must go 🏔️ What an incredible view!The mountains are calling and I must go 🏔️ What an incredible view!The mountains are calling and I must go 🏔️ What an incredible view!The mountains are calling and I must go 🏔️ What an incredible view!"
          initialLikes={2891}
          comments={[]}
          timestamp="5 hours ago"
        />
      </VStack>
    </Flex>
  );
};

export default Post;

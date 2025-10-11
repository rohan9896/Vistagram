import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  MdChatBubbleOutline,
  MdFavorite,
  MdFavoriteBorder,
  MdLocationOn,
} from "react-icons/md";
import { CommentsDrawer, type IComment } from "./PostComment/CommentsDrawer";
import { useGetCommentsQuery } from "../store/features/api/apiSlice";
import type { Comment as ApiComment } from "../models";

interface IPostComponentProps {
  postId: number;
  username: string;
  location: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  initialLikes: number;
  timestamp: string;
}

const PostComponent = (props: IPostComponentProps) => {
  const {
    postId,
    username,
    location,
    userAvatar,
    imageUrl,
    caption,
    initialLikes,
    timestamp,
  } = props;

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const {
    isOpen: isShowMoreOpen,
    onOpen: onShowMoreOpen,
    onClose: onShowMoreClose,
  } = useDisclosure();

  const {
    isOpen: isCommentsOpen,
    onOpen: onCommentsOpen,
    onClose: onCommentsClose,
  } = useDisclosure();

  // Lazy load comments only when comments drawer is opened
  const {
    data: apiComments = [],
    isLoading: isLoadingComments,
    error: commentsError,
  } = useGetCommentsQuery(postId, {
    skip: !isCommentsOpen, // Only fetch when drawer is open
  });

  // Map API comments to IComment format
  const comments: IComment[] = apiComments.map((comment: ApiComment) => ({
    id: comment.id,
    username: comment.username,
    avatar: comment.avatar,
    text: comment.text,
    timestamp: "Just now", // This will be formatted in CommentsDrawer
    createdAt: comment.createdAt,
  }));

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleAddComment = (commentText: string) => {
    // TODO: Implement add comment API call
    console.log("Adding comment:", commentText, "to post:", postId);
  };

  const truncatedCaption =
    caption.length > 150 ? caption.slice(0, 150) + "..." : caption;

  return (
    <Box
      maxW="470px"
      bg="white"
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
    >
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
              <Text fontSize="xs" color="gray.500">
                {location}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Flex>

      <Box position="relative" bg="gray.100">
        <Image
          src={imageUrl}
          alt="Post image"
          width="100%"
          objectFit="cover"
          onDoubleClick={handleLike}
          cursor="pointer"
        />
      </Box>

      <Box px={4} py={3}>
        <HStack spacing={3} mb={2}>
          <IconButton
            aria-label="Like"
            icon={
              isLiked ? (
                <MdFavorite size={24} />
              ) : (
                <MdFavoriteBorder size={24} />
              )
            }
            variant="ghost"
            color={isLiked ? "red.500" : "gray.700"}
            size="sm"
            onClick={handleLike}
            _hover={{
              bg: "transparent",
              transform: "scale(1.1)",
            }}
            transition="all 0.2s"
          />
          <IconButton
            onClick={onCommentsOpen}
            aria-label="Comment"
            icon={<MdChatBubbleOutline size={22} />}
            variant="ghost"
            color="gray.700"
            size="sm"
            _hover={{
              bg: "transparent",
              transform: "scale(1.1)",
            }}
            transition="all 0.2s"
          />
        </HStack>

        <Text fontSize="sm" fontWeight="semibold" color="gray.800" mb={2}>
          {likes.toLocaleString()} likes
        </Text>

        <Text fontSize="sm" color="gray.800">
          <Text as="span" fontWeight="semibold" mr={2}>
            {username}
          </Text>
          {truncatedCaption}
          {caption.length > 150 && (
            <Text
              as="span"
              color="vistagram.500"
              cursor="pointer"
              onClick={onShowMoreOpen}
              ml={1}
            >
              Show more
            </Text>
          )}
        </Text>

        <Text
          onClick={onCommentsOpen}
          fontSize="sm"
          color="gray.500"
          mt={2}
          cursor="pointer"
          _hover={{ color: "gray.600" }}
        >
          {isCommentsOpen && isLoadingComments
            ? "Loading comments..."
            : `View comments`}
        </Text>

        <Text fontSize="xs" color="gray.400" mt={1}>
          {timestamp}
        </Text>
      </Box>

      <Modal isOpen={isShowMoreOpen} onClose={onShowMoreClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{username}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm" color="gray.800">
              {caption}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="vistagram" onClick={onShowMoreClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CommentsDrawer
        isOpen={isCommentsOpen}
        onClose={onCommentsClose}
        comments={comments}
        onAddComment={handleAddComment}
        isLoading={isLoadingComments}
        error={commentsError}
      />
    </Box>
  );
};

export { PostComponent };

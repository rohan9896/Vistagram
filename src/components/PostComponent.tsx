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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  MdChatBubbleOutline,
  MdFavorite,
  MdFavoriteBorder,
  MdLocationOn,
  MdShare,
} from "react-icons/md";
import { CommentsDrawer, type IComment } from "./PostComment/CommentsDrawer";
import {
  useGetCommentsQuery,
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetLikeByPostAndUserQuery,
  useCreateCommentMutation,
  useCreateSharedPostMutation,
} from "../store/features/api/apiSlice";
import { useAppSelector } from "../store/store";
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
  isLikedByUser?: boolean;
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
    isLikedByUser = false,
  } = props;

  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const user = useAppSelector((state) => state.user.user);

  const [createLike] = useCreateLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const [createComment] = useCreateCommentMutation();
  const [createSharedPost] = useCreateSharedPostMutation();
  const toast = useToast();

  const { refetch: refetchLikeRecord } = useGetLikeByPostAndUserQuery(
    { postId, userId: user?.id || 0 },
    { skip: !user?.id }
  );

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

  const {
    data: apiComments = [],
    isLoading: isLoadingComments,
    error: commentsError,
    refetch: refetchComments,
  } = useGetCommentsQuery(postId, {
    skip: !isCommentsOpen,
    refetchOnMountOrArgChange: true,
  });

  const comments: IComment[] = apiComments.map((comment: ApiComment) => ({
    id: comment.id,
    username: comment.username,
    avatar: comment.avatar,
    text: comment.text,
    timestamp: "Just now",
    createdAt: comment.createdAt,
  }));

  const handleLike = async () => {
    if (!user?.id) return;

    const wasLiked = isLiked;
    const previousLikeCount = likeCount;

    if (wasLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }

    try {
      if (wasLiked) {
        const { data: currentLikeRecord } = await refetchLikeRecord();
        console.log(
          "Current like record:",
          currentLikeRecord,
          "for postId:",
          postId,
          "userId:",
          user.id
        );
        if (currentLikeRecord?.id) {
          console.log("Deleting like with ID:", currentLikeRecord.id);
          await deleteLike({ likeId: currentLikeRecord.id, postId }).unwrap();
        } else {
          console.error(
            "No like record found to delete for postId:",
            postId,
            "userId:",
            user.id
          );
          setIsLiked(wasLiked);
          setLikeCount(previousLikeCount);
          return;
        }
      } else {
        await createLike({ postId, userId: user.id }).unwrap();
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      setIsLiked(wasLiked);
      setLikeCount(previousLikeCount);
    }
  };

  const handleAddComment = async (commentText: string) => {
    if (!user?.id || !commentText.trim()) return;

    try {
      await createComment({
        postId,
        userId: user.id,
        username: user.username,
        avatar: user.avatar || "",
        text: commentText.trim(),
      }).unwrap();

      console.log("Comment created successfully");
      refetchComments();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleShare = async () => {
    if (!user?.id) {
      toast({
        title: "Login Required",
        description: "Please log in to share posts",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const result = await createSharedPost({ postId }).unwrap();

      if (navigator.clipboard) {
        const url = window.location.origin + result.shareUrl;

        await navigator.clipboard.writeText(url);
        toast({
          title: "Share Link Copied!",
          description: "The share link has been copied to your clipboard",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Share Link Created",
          description: `Share URL: ${result.shareUrl}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error("Error sharing post:", error);
      toast({
        title: "Share Failed",
        description: error.data?.error || "Failed to create share link",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const truncatedCaption =
    caption.length > 150 ? caption.slice(0, 150) + "..." : caption;

  return (
    <Box
      maxW="470px"
      width="100%"
      minWidth="360px"
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
          <IconButton
            onClick={handleShare}
            aria-label="Share"
            icon={<MdShare size={22} />}
            variant="ghost"
            color="gray.700"
            size="sm"
            _hover={{
              bg: "transparent",
              transform: "scale(1.1)",
              color: "vistagram.500",
            }}
            transition="all 0.2s"
          />
        </HStack>

        <Text fontSize="sm" fontWeight="semibold" color="gray.800" mb={2}>
          {likeCount.toLocaleString()} likes
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

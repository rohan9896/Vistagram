import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Comment, type ICommentProps } from "./Comment";
import { MdSend } from "react-icons/md";
import { useAppSelector } from "../../store/store";
import { formatTimestamp } from "../../utils";

export interface IComment extends ICommentProps {
  id: number;
  createdAt: string;
}

interface ICommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: IComment[];
  onAddComment: (comment: string) => void;
  isLoading?: boolean;
  error?: any;
}

const CommentsDrawer = (props: ICommentsDrawerProps) => {
  const { isOpen, onClose, comments, onAddComment, isLoading, error } = props;

  const user = useAppSelector((state) => state.user.user);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Text fontSize="lg" fontWeight="semibold">
            Comments
          </Text>
        </DrawerHeader>

        <DrawerBody px={0}>
          {isLoading ? (
            <Center py={8}>
              <VStack spacing={4}>
                <Spinner size="lg" color="vistagram.500" />
                <Text color="gray.600">Loading comments...</Text>
              </VStack>
            </Center>
          ) : error ? (
            <Center py={8}>
              <Text color="red.500">
                Failed to load comments. Please try again.
              </Text>
            </Center>
          ) : (
            <VStack spacing={0} align="stretch" divider={<Divider />}>
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  username={comment.username}
                  avatar={comment.avatar}
                  text={comment.text}
                  timestamp={formatTimestamp(comment.createdAt)}
                />
              ))}
              {comments.length === 0 && (
                <Center py={8}>
                  <Text color="gray.500">
                    No comments yet. Be the first to comment!
                  </Text>
                </Center>
              )}
            </VStack>
          )}

          <Box
            position="sticky"
            bottom={0}
            bg="white"
            borderTopWidth="1px"
            px={6}
            py={4}
            mt={4}
          >
            <Flex gap={3}>
              <Avatar size="sm" name="current_user" src={user?.avatar ?? ""} />
              <InputGroup>
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  size="md"
                  borderRadius="full"
                  bg="gray.50"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "vistagram.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-vistagram-500)",
                  }}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Send comment"
                    icon={<MdSend />}
                    size="sm"
                    variant="ghost"
                    colorScheme="vistagram"
                    isDisabled={!newComment.trim()}
                    onClick={handleAddComment}
                  />
                </InputRightElement>
              </InputGroup>
            </Flex>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export { CommentsDrawer };

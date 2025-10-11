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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Comment, type ICommentProps } from "./Comment";
import { MdSend } from "react-icons/md";

export interface IComment extends ICommentProps {
  id: number;
}

interface ICommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: IComment[];
  onAddComment: (comment: string) => void;
}

const CommentsDrawer = (props: ICommentsDrawerProps) => {
  const { isOpen, onClose, comments, onAddComment } = props;

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
          <VStack spacing={0} align="stretch" divider={<Divider />}>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                username={comment.username}
                avatar={comment.avatar}
                text={comment.text}
                timestamp={comment.timestamp}
              />
            ))}
          </VStack>

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
              <Avatar
                size="sm"
                name="current_user"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150"
              />
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

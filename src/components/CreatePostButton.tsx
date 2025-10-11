import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { CreatePost } from "./CreatePost";
import { useAppSelector } from "../store/store";

const CreatePostButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const avatar = useAppSelector((state) => state.user.user?.avatar);

  return (
    <>
      <Box
        position="fixed"
        bottom="1rem"
        right="50%"
        transform="translateX(50%)"
        zIndex={10}
      >
        <Button
          onClick={onOpen}
          leftIcon={<MdAdd size={20} />}
          colorScheme="vistagram"
          size="lg"
          boxShadow="lg"
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "xl",
          }}
          transition="all 0.2s"
        >
          Create Post
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreatePost currentUserAvatar={avatar ?? ""} onSubmit={() => {}} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostButton;

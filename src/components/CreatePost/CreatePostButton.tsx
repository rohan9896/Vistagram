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
import { useAppSelector } from "../../store/store";

const CreatePostButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const avatar = useAppSelector((state) => state.user.user?.avatar);

  return (
    <>
      <Box position="fixed" bottom="2rem" right="2rem" zIndex={1000}>
        <Button
          onClick={onOpen}
          colorScheme="vistagram"
          size="lg"
          borderRadius="full"
          width="60px"
          height="60px"
          boxShadow="lg"
          _hover={{
            transform: "scale(1.1)",
            boxShadow: "xl",
          }}
          _active={{
            transform: "scale(0.95)",
          }}
          transition="all 0.2s ease-in-out"
        >
          <MdAdd size={28} />
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreatePost currentUserAvatar={avatar ?? ""} onSuccess={onClose} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { CreatePostButton };

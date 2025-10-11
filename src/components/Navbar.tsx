import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Text,
  Link,
  Button,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAppSelector } from "../store/store";
import { useLogin } from "../hooks/useLogin";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loggedInUser = useAppSelector((user) => user.user);
  const { handleLogout, isLogoutLoading } = useLogin();

  return (
    <Box bg="white" px={4} boxShadow="sm">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
        mx="auto"
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="vistagram.500"
          cursor="pointer"
        >
          Vistagram
        </Text>

        <HStack
          as="nav"
          spacing={4}
          display={{ base: "none", md: "flex" }}
          fontWeight="medium"
        >
          <Link
            href="/home"
            _hover={{ textDecoration: "none", color: "gray.600" }}
          >
            Home
          </Link>
          <Link
            href={`/profile/${loggedInUser.user?.id}`}
            _hover={{ textDecoration: "none", color: "gray.600" }}
          >
            Profile
          </Link>
        </HStack>

        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <Button
          size="sm"
          colorScheme="vistagram"
          display={{ base: "none", md: "inline-flex" }}
          onClick={loggedInUser.isLoggedIn ? handleLogout : undefined}
          isLoading={loggedInUser.isLoggedIn && isLogoutLoading}
          loadingText="Logging out..."
        >
          {loggedInUser.isLoggedIn ? "Logout" : "Login"}
        </Button>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <VStack as="nav" spacing={4} align="start" fontWeight="medium">
            <Link
              href="/"
              _hover={{ textDecoration: "none", color: "gray.600" }}
              onClick={onClose}
            >
              Home
            </Link>
            <Link
              href="/explore"
              _hover={{ textDecoration: "none", color: "gray.600" }}
              onClick={onClose}
            >
              Explore
            </Link>
            <Link
              href={`/profile/${loggedInUser.user?.id}`}
              _hover={{ textDecoration: "none", color: "gray.600" }}
              onClick={onClose}
            >
              Profile
            </Link>
            <Button
              size="sm"
              colorScheme="vistagram"
              w="full"
              onClick={loggedInUser.isLoggedIn ? handleLogout : onClose}
              isLoading={loggedInUser.isLoggedIn && isLogoutLoading}
              loadingText="Logging out..."
            >
              {loggedInUser.isLoggedIn ? "Logout" : "Login"}
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export { Navbar };

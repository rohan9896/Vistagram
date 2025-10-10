import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Heading,
  Flex,
  Alert,
  AlertIcon,
  Text,
  Link,
  Center,
  InputGroup,
  InputRightElement,
  IconButton,
  Checkbox,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { MdLocationOn, MdCameraAlt } from "react-icons/md";
import { useLogin } from "../hooks/useLogin";
import { STATUS } from "../store/features/auth/userSlice";

const LoginPage = () => {
  const {
    email,
    password,
    rememberMe,
    status,
    error,
    setEmail,
    setPassword,
    setRememberMe,
    handleLogin,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Flex minH="100vh" bg="gray.50">
      <Box
        display={{ base: "none", lg: "flex" }}
        flex="1"
        bgGradient="linear(to-br, vistagram.500, vistagram.600, red.600)"
        position="relative"
        overflow="hidden"
      >
        <Box position="absolute" inset="0" bg="blackAlpha.100" />
        <Flex
          position="relative"
          zIndex="1"
          direction="column"
          justify="center"
          align="center"
          color="white"
          p={12}
        >
          <Box mb={8} position="relative">
            <Flex
              bg="whiteAlpha.200"
              backdropFilter="blur(10px)"
              p={6}
              borderRadius="full"
              justify="center"
              align="center"
            >
              <Icon as={MdLocationOn} boxSize={16} />
            </Flex>
            <Flex
              position="absolute"
              bottom="-8px"
              right="-8px"
              bg="white"
              color="vistagram.600"
              borderRadius="full"
              p={1}
            >
              <Icon as={MdCameraAlt} boxSize={8} />
            </Flex>
          </Box>
          <Heading size="3xl" mb={4}>
            Vistagram
          </Heading>
          <Text fontSize="xl" textAlign="center" maxW="md" opacity={0.9}>
            Discover and share amazing points of interest from around the world
          </Text>
        </Flex>
      </Box>

      <Flex flex="1" align="center" justify="center" p={8}>
        <Stack spacing={4} width="full" maxWidth="md">
          <Center display={{ base: "flex", lg: "none" }} mb={4}>
            <Stack spacing={3} align="center">
              <Flex
                bg="vistagram.500"
                p={4}
                borderRadius="full"
                position="relative"
              >
                <Icon as={MdLocationOn} boxSize={8} color="white" />
                <Flex
                  position="absolute"
                  bottom="-4px"
                  right="-4px"
                  bg="vistagram.600"
                  borderRadius="full"
                  p={0.5}
                >
                  <Icon as={MdCameraAlt} boxSize={5} color="white" />
                </Flex>
              </Flex>
              <Heading size="xl" color="gray.700">
                Vistagram
              </Heading>
            </Stack>
          </Center>

          <Box
            borderWidth={1}
            borderColor="gray.200"
            px={8}
            py={8}
            borderRadius="lg"
            boxShadow="md"
            bg="white"
          >
            <Stack as="form" spacing={4} onSubmit={(e) => handleLogin(e)}>
              <Heading size="lg" mb={2} color="gray.700" fontWeight="semibold">
                Log In
              </Heading>

              {status === STATUS.FAILURE && (
                <Alert status="error" fontSize="sm" py={2} borderRadius="md">
                  <AlertIcon boxSize={4} />
                  {error}
                </Alert>
              )}

              <FormControl id="email" isRequired>
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  color="gray.600"
                  mb={1.5}
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  Email
                </Text>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  bg="gray.50"
                  borderColor="gray.200"
                  fontSize="sm"
                  size="lg"
                  _hover={{
                    borderColor: "gray.300",
                  }}
                  _focus={{
                    borderColor: "vistagram.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-vistagram-500)",
                  }}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  color="gray.600"
                  mb={1.5}
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  Password
                </Text>
                <InputGroup size="lg">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    bg="gray.50"
                    borderColor="gray.200"
                    fontSize="sm"
                    _hover={{
                      borderColor: "gray.300",
                    }}
                    _focus={{
                      borderColor: "vistagram.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-vistagram-500)",
                    }}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={handleTogglePassword}
                      variant="ghost"
                      size="sm"
                      color="gray.600"
                      _hover={{
                        color: "gray.700",
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Flex justify="space-between" align="center" pt={1}>
                <Checkbox
                  size="sm"
                  colorScheme="vistagram"
                  isChecked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Remember me
                </Checkbox>
                <Link
                  href="#"
                  fontSize="sm"
                  color="vistagram.500"
                  fontWeight="medium"
                  _hover={{
                    color: "vistagram.400",
                    textDecoration: "underline",
                  }}
                >
                  Forgot?
                </Link>
              </Flex>

              <Button
                type="submit"
                colorScheme="vistagram"
                isLoading={status === STATUS.LOADING}
                loadingText="Logging in..."
                size="lg"
                fontWeight="bold"
                mt={2}
              >
                Log In
              </Button>
            </Stack>
          </Box>

          <Box
            borderWidth={1}
            borderColor="gray.200"
            px={8}
            py={4}
            borderRadius="lg"
            boxShadow="md"
            bg="white"
            textAlign="center"
            opacity={0.5}
            pointerEvents="none"
          >
            <Text fontSize="sm" color="gray.600">
              New to Vistagram?{" "}
              <Link
                href="#"
                color="vistagram.500"
                fontWeight="semibold"
                _hover={{ color: "vistagram.400", textDecoration: "underline" }}
              >
                Sign Up
              </Link>
            </Text>
          </Box>

          <Box pt={4}>
            <HStack
              justify="center"
              spacing={4}
              fontSize="xs"
              color="gray.600"
              flexWrap="wrap"
            >
              <Link href="#" _hover={{ color: "gray.700" }}>
                Help
              </Link>
              <Link href="#" _hover={{ color: "gray.700" }}>
                Privacy
              </Link>
              <Link href="#" _hover={{ color: "gray.700" }}>
                Terms
              </Link>
              <Link href="#" _hover={{ color: "gray.700" }}>
                Contact
              </Link>
            </HStack>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export { LoginPage };

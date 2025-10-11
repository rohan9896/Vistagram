import {
  Avatar,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { MdEmail, MdCalendarToday } from "react-icons/md";
import { FaIdBadge } from "react-icons/fa";
import type { User } from "../models";
import { useCallback } from "react";
import { useAppSelector } from "../store/store";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const loggedInUserId = useAppSelector((state) => state.user.user?.id);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  return (
    <Card
      bg="white"
      borderColor="gray.200"
      borderWidth={1}
      boxShadow="md"
      borderRadius="lg"
      overflow="hidden"
      minWidth={{ base: "280px", sm: "400px" }}
      maxW="470px"
      width="100%"
    >
      <CardBody p={6}>
        <Flex justify="space-between" align="start" mb={4}>
          <VStack spacing={4} align="start" flex={1}>
            <Flex align="center" gap={4}>
              <Avatar
                size="lg"
                name={user.username}
                src={user.avatar}
                border="3px solid"
                borderColor="vistagram.500"
              />
              <VStack align="start" spacing={1}>
                <Heading size="md" color="gray.800">
                  {user.username} {loggedInUserId === user.id ? "(You)" : ""}
                </Heading>
                <Badge colorScheme="vistagram" variant="subtle">
                  Active User
                </Badge>
              </VStack>
            </Flex>

            <VStack align="start" spacing={3} w="full">
              <HStack spacing={2}>
                <MdEmail color="gray.500" size={16} />
                <Text fontSize="sm" color="gray.600">
                  {user.email}
                </Text>
              </HStack>

              <HStack spacing={2}>
                <MdCalendarToday color="gray.500" size={16} />
                <Text fontSize="sm" color="gray.600">
                  Joined {formatDate(user.createdAt)}
                </Text>
              </HStack>
              <HStack spacing={2}>
                <FaIdBadge color="gray.500" size={16} />
                <Text fontSize="sm" color="gray.600">
                  User ID: {user.id}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export { UserCard };

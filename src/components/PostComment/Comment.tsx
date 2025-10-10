import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export interface ICommentProps {
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
}

const Comment = (props: ICommentProps) => {
  const { username, avatar, text, timestamp } = props;

  return (
    <Box px={6} py={4} _hover={{ bg: "gray.50" }}>
      <Flex align="start" gap={3}>
        <Avatar size="sm" name={username} src={avatar} />

        <Box flex="1">
          <Flex align="center" gap={2} mb={1}>
            <Text fontSize="sm" fontWeight="semibold" color="gray.800">
              {username}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {timestamp}
            </Text>
          </Flex>

          <Text fontSize="sm" color="gray.700" mb={2}>
            {text}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export { Comment };

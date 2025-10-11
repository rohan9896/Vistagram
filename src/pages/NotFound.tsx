import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <Box>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="5rem"
      >
        <Text>404 Not Found</Text>
        <Link to="/">Go Home</Link>
      </Flex>
    </Box>
  );
};

import { Flex, Link, Box, Button, Text } from "@chakra-ui/react";

export const Navigation = ({ setAddModalIsOpen }) => {
  return (
    <Box position="sticky" top={0} bg={"white"} zIndex={1}>
      <nav>
        <Flex
          gap={{ base: 4, sm: 6, md: 8 }}
          px={"40px"}
          py={"16px"}
          wrap={"wrap"}
        >
          <Link href="/">Events</Link>
          <Link href="/about-us">About us</Link>
          <Button ml={"auto"} onClick={() => setAddModalIsOpen(true)}>
            <Text display={{ base: "none", sm: "inline-block" }}>
              Add Event
            </Text>
            <Text display={{ base: "inline-block", sm: "none" }}>+</Text>
          </Button>
        </Flex>
      </nav>
    </Box>
  );
};

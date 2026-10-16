import { Heading, Text, Center, Stack, Link } from "@chakra-ui/react";

export const AboutUsPage = () => {
  return (
    <Center h="90dvh">
      <Stack gap={"96px"} p="40px">
        <Stack textAlign={"center"} gap={"24px"}>
          <Heading
            wordBreak={"break-word"}
            fontSize={"64px"}
            lineHeight={"120%"}
          >
            This page is under construction
          </Heading>
          <Text fontSize={"28px"}>Stay tuned...</Text>
        </Stack>
        <Link href="/">Back to events</Link>
      </Stack>
    </Center>
  );
};

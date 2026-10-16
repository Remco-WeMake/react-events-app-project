import { Link } from "react-router";
import { Card, Skeleton, SkeletonText, Flex } from "@chakra-ui/react";

export const EventCardSkeleton = () => {
  return (
    <Link>
      <Card.Root as={"article"}>
        <Skeleton aspectRatio={16 / 9} />
        <Card.Body gap={"12px"}>
          <Flex direction={"column"} gap={"16px"}>
            <SkeletonText noOfLines={2} gap={"8px"} />
            <SkeletonText noOfLines={2} gap={"8px"} />
          </Flex>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

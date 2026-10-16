import { Link } from "react-router";
import { Heading, Card, Text, Image, Tag, Flex } from "@chakra-ui/react";
import { format as formatDateTime } from "date-format-parse";

export const EventCard = (props) => {
  const event = props.event;
  const categories = props.categories;

  return (
    <Link to={`/event/${event.id}`}>
      <Card.Root as={"article"}>
        <Image src={event.image} aspectRatio={16 / 9} />
        <Card.Body gap={"12px"}>
          <Flex direction={"column"} gap={"16px"}>
            <Flex direction={"column"} gap={"8px"}>
              <Flex gap={"8px"}>
                {categories.map((cat) => {
                  if (event.categoryIds.includes(cat.id)) {
                    return (
                      <Tag.Root colorPalette="blue" key={cat.id}>
                        <Tag.Label>{cat.name}</Tag.Label>
                      </Tag.Root>
                    );
                  }
                })}
              </Flex>
              <Heading as="h2">{event.title}</Heading>
            </Flex>
            <Flex direction={"column"} gap={"8px"}>
              <Text>{event.description}</Text>
              <Text>
                From: {formatDateTime(event.startTime, "DD MMMM HH:mm ")} Till:{" "}
                {formatDateTime(event.endTime, "DD MMMM HH:mm")}
              </Text>
            </Flex>
          </Flex>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

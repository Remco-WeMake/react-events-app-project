import { useLoaderData } from "react-router-dom";
import {
  Heading,
  Card,
  Text,
  Image,
  Tag,
  Flex,
  Button,
} from "@chakra-ui/react";
import { format as formatDateTime } from "date-format-parse";
import { EditEventModal } from "../components/modals/EditEventModal";
import { DeleteEventModal } from "../components/modals/DeleteEventModal";
import { useState, useContext } from "react";
import { CategoriesContext } from "../components/Root";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);

  return {
    event: await event.json(),
  };
};

const ContextUser = () => {
  return {
    categories: useContext(CategoriesContext),
  };
};

export const EventPage = () => {
  const { event } = useLoaderData();
  const categories = ContextUser().categories;
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  return (
    <>
      <Card.Root border={"none"}>
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
              <Text>At: {event.location}</Text>
              <Text>
                From: {formatDateTime(event.startTime, "DD MMMM HH:mm ")} Till:{" "}
                {formatDateTime(event.endTime, "DD MMMM HH:mm")}
              </Text>
            </Flex>
          </Flex>
        </Card.Body>
        <Card.Footer mt={"16px"}>
          <Button onClick={() => setEditModalIsOpen(true)}>Edit Event</Button>
          <Button
            colorPalette="red"
            variant={"ghost"}
            onClick={() => setDeleteModalIsOpen(true)}
          >
            Delete Event
          </Button>
        </Card.Footer>
      </Card.Root>
      <EditEventModal
        event={event}
        isOpen={editModalIsOpen}
        setIsOpen={setEditModalIsOpen}
      />
      <DeleteEventModal
        eventId={event.id}
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
      />
    </>
  );
};

import { useState, useContext } from "react";
import {
  Heading,
  SimpleGrid,
  VStack,
  Stack,
  Input,
  Checkbox,
  CheckboxGroup,
  Flex,
} from "@chakra-ui/react";
import { EventCard } from "../components/cards/EventCard";
import { EventCardSkeleton } from "../components/cards/EventCardSkeleton";
import { CategoriesContext, EventsContext } from "../components/Root";

const ContextUser = () => {
  return {
    categories: useContext(CategoriesContext),
    events: useContext(EventsContext),
  };
};

export const EventsPage = () => {
  const categories = ContextUser().categories;
  const { events: allEvents, loading } = ContextUser().events;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const visibleEvents = allEvents.filter((event) => {
    // Check wether event title matches searchterm.
    const matchesSearchterm = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Check wether event categories match filters.
    const matchesFilters =
      selectedFilters.length === 0
      || event.categoryIds.some((id) => selectedFilters.includes(id));

    return matchesSearchterm && matchesFilters;
  });

  return (
    <VStack p={"40px"}>
      <Stack align={"center"} gap="24px" mb="40px">
        <Heading textAlign={{ base: "center", md: "left" }}>
          What event are you looking for?
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap="24px">
          <Input
            type="text"
            placeholder="Search by title"
            size="lg"
            variant={"subtle"}
            maxW={"960px"}
            borderRadius={"100dvw"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>

          {/* Cat(s) */}
          <CheckboxGroup
            value={selectedFilters}
            onValueChange={setSelectedFilters}
            display={"flex"}
            flexDirection={"row"}
            gap={"16px"}
            name="category-filter"
          >
            {categories.map((cat) => {
              return (
                <Checkbox.Root key={cat.id} value={cat.id}>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>{cat.name}</Checkbox.Label>
                </Checkbox.Root>
              );
            })}
          </CheckboxGroup>
        </Flex>
      </Stack>
      {loading || visibleEvents.length ?
        <>
          <Heading mb="16px">List of events</Heading>
          <SimpleGrid w={"100%"} columns={[1, 2, 3]} gap={"24px"}>
            {loading ?
              Array.from({ length: 9 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))
            : visibleEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  categories={categories}
                />
              ))
            }
          </SimpleGrid>
        </>
      : <Heading>No Events found</Heading>}
    </VStack>
  );
};

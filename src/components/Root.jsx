import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { AddEventModal } from "./modals/addEventModal";
import { useState, createContext } from "react";
import { Toaster } from "./ui/toaster";
import { useEffect } from "react";

export const CategoriesContext = createContext([]);
export const EventsContext = createContext([]);

export const Root = () => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const categoriesRequest = await fetch(
          "http://localhost:3000/categories",
        );
        setCategories(await categoriesRequest.json());

        const eventsRequest = await fetch("http://localhost:3000/events");
        setEvents(await eventsRequest.json());
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getEvents = async () => {
    setLoading(true);
    const getEventsRequest = await fetch("http://localhost:3000/events");
    setEvents(await getEventsRequest.json());
    setLoading(false);
  };

  return (
    <Box>
      <CategoriesContext.Provider value={categories}>
        <EventsContext.Provider value={{ events, getEvents, loading }}>
          <Navigation setAddModalIsOpen={setAddModalIsOpen} />
          <Outlet />
          <AddEventModal
            isOpen={addModalIsOpen}
            setIsOpen={setAddModalIsOpen}
          />
          <Toaster />
        </EventsContext.Provider>
      </CategoriesContext.Provider>
    </Box>
  );
};

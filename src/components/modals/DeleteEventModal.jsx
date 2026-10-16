import { Controller, useForm } from "react-hook-form";
import {
  Center,
  Dialog,
  Heading,
  Field,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { toaster } from "../ui/toaster";

export const DeleteEventModal = ({ isOpen, setIsOpen, eventId }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      validation: false,
    },
  });

  const deleteEvent = async (data) => {
    console.log(data);
    const result = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (result.ok) {
      // The event was successfully deleted!
      setIsOpen(false);
      toaster.create({
        title: "Event deleted",
        description:
          "The event has been deleted successfully! You will be redirected in 5 seconds",
        duration: 5000,
      });
      setTimeout(() => {
        window.location.replace("/");
      }, 5000);
    } else {
      toaster.create({
        title: "Delete event error",
        type: "error",
        description: "The event could not be deleted!",
      });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Dialog.Backdrop></Dialog.Backdrop>
      <Dialog.Positioner>
        <Center h={"100dvh"}>
          <Dialog.Content minW={"40dvw"}>
            <Dialog.Header>Edit event</Dialog.Header>
            <form onSubmit={handleSubmit(deleteEvent)}>
              <Dialog.Body>
                <Heading mb="24px">
                  Are you sure you want to delete this event?
                </Heading>
                <Controller
                  control={control}
                  name="validation"
                  rules={{
                    validate: (value) =>
                      value || "This field should be checked.",
                  }}
                  render={({ field }) => (
                    <Field.Root invalid={!!errors.validation}>
                      <Checkbox.Root
                        checked={field.value}
                        onCheckedChange={({ checked }) =>
                          field.onChange(checked)
                        }
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>
                          Yes, I want to delete this event.
                        </Checkbox.Label>
                      </Checkbox.Root>
                      <Field.ErrorText mt={"4px"}>
                        {errors.validation?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  )}
                />
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                  Delete event
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Center>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

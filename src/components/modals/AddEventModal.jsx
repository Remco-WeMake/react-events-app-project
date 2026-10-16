import { useLoaderData, useRevalidator } from "react-router-dom";
import { Controller, useController, useForm } from "react-hook-form";
import {
  Center,
  Dialog,
  Field,
  Fieldset,
  Input,
  Textarea,
  Button,
  DateInput,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import { useContext } from "react";
import { CategoriesContext, EventsContext } from "../Root";

const ContextUser = () => {
  return {
    categories: useContext(CategoriesContext),
  };
};

export const AddEventModal = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const cats = useController({
    control,
    name: "cats",
    defaultValue: [],
    rules: {
      validate: (value) =>
        value.length || "At least one category should be checked.",
    },
  });

  const categories = ContextUser().categories;
  const { getEvents } = useContext(EventsContext);

  const createEvent = async (data) => {
    // console.table(data);
    // console.log(new Date(data.date[0]).toISOString());
    const result = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        createdBy: 3,
        title: data.title,
        description: data.description,
        location: data.location,
        image: data.image,
        categoryIds: data.cats,
        startTime: new Date(data.date[0]).toISOString(),
        endTime: new Date(data.date[1]).toISOString(),
      }),
    });

    if (result.ok) {
      // The creation of the post was successful!
      await getEvents();
      setIsOpen(false);
      toaster.create({
        title: "Event added",
        description: "The event has been added successfully!",
      });
    } else {
      toaster.create({
        title: "Add event error",
        type: "error",
        description: "The event could not be added!",
      });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Dialog.Backdrop></Dialog.Backdrop>
      <Dialog.Positioner>
        <Center h={"100dvh"}>
          <Dialog.Content minW={"40dvw"}>
            <Dialog.Header>Add event</Dialog.Header>
            <form onSubmit={handleSubmit(createEvent)}>
              <Dialog.Body>
                {/* Title */}
                <Field.Root invalid={errors.title} mt={4}>
                  <Field.Label>Event title</Field.Label>
                  <Input
                    placeholder="Write title..."
                    {...register("title", {
                      required: "Title is required",
                    })}
                  />
                  <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                </Field.Root>

                {/* Description */}
                <Field.Root invalid={errors.description} mt={4}>
                  <Field.Label>Description</Field.Label>
                  <Textarea
                    placeholder="Write description..."
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  <Field.ErrorText>
                    {errors.description?.message}
                  </Field.ErrorText>
                </Field.Root>

                {/* Location */}
                <Field.Root invalid={errors.location} mt={4}>
                  <Field.Label>Event location</Field.Label>
                  <Input
                    placeholder="Write location..."
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                  <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
                </Field.Root>

                {/* Image */}
                <Field.Root invalid={errors.image} mt={4}>
                  <Field.Label>Image url</Field.Label>
                  <Input
                    placeholder="Write title..."
                    {...register("image", {
                      required: "Image url is required",
                    })}
                  />
                  <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
                </Field.Root>

                {/* Date */}
                <Field.Root invalid={errors.date} mt={4}>
                  <Controller
                    control={control}
                    name="date"
                    rules={{
                      validate: (value) =>
                        (value?.[0] != null && value?.[1] != null)
                        || "Please fill in a start and an end date.",
                    }}
                    render={({ field }) => (
                      <DateInput.Root
                        value={field.value}
                        onValueChange={(e) => field.onChange(e.value)}
                        granularity="minute"
                        selectionMode="range"
                        invalid={!!errors.date}
                      >
                        <DateInput.Label>Event duration</DateInput.Label>

                        <DateInput.Control gap="4">
                          <DateInput.Segments index={0} />
                          <DateInput.Segments index={1} />
                        </DateInput.Control>

                        <DateInput.HiddenInput index={0} />
                        <DateInput.HiddenInput index={1} />
                      </DateInput.Root>
                    )}
                  />
                  <Field.ErrorText>{errors.date?.message}</Field.ErrorText>
                </Field.Root>

                {/* Cat(s) */}
                <Fieldset.Root invalid={errors.cats} mt={4}>
                  <Fieldset.Legend>
                    Select one or multiple categories
                  </Fieldset.Legend>
                  <CheckboxGroup
                    value={cats.field.value}
                    onValueChange={cats.field.onChange}
                    name={cats.field.name}
                  >
                    <Fieldset.Content>
                      {categories.map((cat) => {
                        return (
                          <Checkbox.Root key={cat.id} value={cat.id}>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>{cat.name}</Checkbox.Label>
                          </Checkbox.Root>
                        );
                      })}
                    </Fieldset.Content>
                  </CheckboxGroup>
                  <Fieldset.ErrorText>
                    {errors.cats?.message}
                  </Fieldset.ErrorText>
                </Fieldset.Root>
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
                  Submit Event
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Center>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

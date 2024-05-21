"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { createUserSchema } from "@/app/schema";
import axios from "axios";

type UserFormData = z.infer<typeof createUserSchema>;

const NewUserButton = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(createUserSchema),
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const createUser = async (data: any) => {
    try {
      setSubmitting(true);
      if (errors) null;
      await axios.post("http://127.0.0.1:8000/user", data);
      setSubmitting(false);
      setOpen(false);
      reset();
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setSubmitting(true);
      setError("An unexpected error occurred.");
      setSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button style={{ backgroundColor: "#1C2541" }}>
          <PersonIcon />
          Add New User
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title mb="1">Add New User</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add new user to assign issues
        </Dialog.Description>

        <form onSubmit={handleSubmit(createUser)}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
                {...register("name")}
                placeholder="Enter your full name"
              />
            </label>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root
                {...register("email")}
                placeholder="Enter your email"
              />
            </label>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>

            <Button type="submit" style={{ backgroundColor: "#1C2541" }}>
              Submit
              {isSubmitting && <Spinner />}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NewUserButton;

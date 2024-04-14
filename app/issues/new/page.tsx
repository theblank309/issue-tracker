"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Callout, TextField, Text } from "@radix-ui/themes";

import { createIssueSchema } from "@/app/schema";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { PrimaryButton } from "@/app/components/Buttons";
import TextEditior from "./TextEditior";

import delay from "delay";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const postIssue = async (data: any) => {
    try {
      setSubmitting(true);
      await axios.post("http://127.0.0.1:8000/issue", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(true);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-xl mt-5">
      {error && (
        <Callout.Root color="red" className="mb-3" size="1">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-2" onSubmit={handleSubmit(postIssue)}>
        <Text as="p" className="text-sm font-medium">
          Title
        </Text>
        <TextField.Root
          placeholder="Title of your issue"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Text as="p" className="text-sm font-medium mt-5">
          Description
        </Text>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <TextEditior onChange={field.onChange} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <PrimaryButton disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default NewIssuePage;

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";

import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Box, Callout, Text, TextField } from "@radix-ui/themes";

import { createIssueSchema, IssueResponse } from "@/app/schema";
import Spinner from "@/app/components/Spinner";
import { PrimaryButton } from "@/app/components/Buttons";
import ErrorMessage from "@/app/components/ErrorMessage";

const TextEditor = dynamic(() => import("./TextEditor"), { ssr: false });

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: IssueResponse }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const postIssue = async (data: any) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch(`http://127.0.0.1:8000/issues/${issue?.id}`, data);
        router.push(`/issues/${issue?.id}`);
      } else {
        await axios.post("http://127.0.0.1:8000/issue", data);
        router.push("/issues");
      }
      router.refresh();
    } catch (error) {
      setSubmitting(true);
      setError("An unexpected error occurred.");
    }
  };

  console.log(issue);
  return (
    <Box className="max-w-xl mt-5">
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
          defaultValue={issue?.title}
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Text as="p" className="text-sm font-medium mt-5">
          Description
        </Text>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <TextEditor
              onChange={field.onChange}
              description={issue?.description}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <PrimaryButton disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </PrimaryButton>
      </form>
    </Box>
  );
};

export default IssueForm;

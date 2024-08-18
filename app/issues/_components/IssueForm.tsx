"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";

import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Box, Callout, Flex, Select, Text, TextField } from "@radix-ui/themes";

import { createIssueSchema, Impact, IssueResponse, Status } from "@/app/schema";
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
    setValue,
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
        console.log(data);
        await axios.patch(
          `http://127.0.0.1:8000/update_issues/${issue?.id}`,
          data
        );
        router.push(`/issues/${issue?.id}`);
      } else {
        await axios.post("http://127.0.0.1:8000/create_issue", data);
        router.push("/issues");
      }
      router.refresh();
    } catch (error) {
      setSubmitting(true);
      console.log(error);
      setError("An unexpected error occurred.");
    }
  };

  if (issue) {
    setValue("status", issue?.status);
    setValue("impact", issue?.impact);
  }
  return (
    <Box className="max-w-xl mt-4">
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
        <Flex gapX="2">
          <Box>
            <Text as="p" className="text-sm font-medium" mb="1">
              Impact
            </Text>
            <Flex direction="column" width="150px">
              <Select.Root
                defaultValue={issue ? issue?.impact : "None"}
                onValueChange={(value: Impact) => setValue("impact", value)}
              >
                <Select.Trigger />
                <Select.Content position="popper">
                  <Select.Group>
                    <Select.Item value="None">Select impact...</Select.Item>
                    <Select.Item value="HIGH">High</Select.Item>
                    <Select.Item value="MODERATE">Moderate</Select.Item>
                    <Select.Item value="LOW">Low</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Box>
          {issue && (
            <Box>
              <Text as="p" className="text-sm font-medium" mb="1">
                Status
              </Text>
              <Flex direction="column" width="150px">
                <Select.Root
                  defaultValue={issue?.status}
                  onValueChange={(value: Status) => setValue("status", value)}
                >
                  <Select.Trigger />
                  <Select.Content position="popper">
                    <Select.Group>
                      <Select.Item value="OPEN">Open</Select.Item>
                      <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                      <Select.Item value="CLOSED">Closed</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </Flex>
            </Box>
          )}
        </Flex>
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
          {issue ? "Submit Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </PrimaryButton>
      </form>
    </Box>
  );
};

export default IssueForm;

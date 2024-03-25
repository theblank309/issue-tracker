"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";

import { createIssueSchema } from "@/app/schema";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  const MDEOptions = useMemo(() => {
    return {
      spellChecker: true,
      status: false,
    };
  }, []);

  return (
    <div className="max-w-xl mt-10">
      {error && (
        <Callout.Root color="red" className="mb-3" size="1">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("http://127.0.0.1:8000/issue", data);
            router.push("/issues");
          } catch (error) {
            console.log(error);
            setError("An unexpected error occurred.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              options={MDEOptions}
              {...field}
              className="text-sm"
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;

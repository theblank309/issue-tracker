"use client";

import Link from "next/link";
import { Button, TextField, TextArea } from "@radix-ui/themes";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useMemo } from "react";

const NewIssuePage = () => {
  const MDEOptions = useMemo(() => {
    return {
      spellChecker: true,
      status: false,
    };
  }, []);

  return (
    <div className="max-w-xl mt-10 space-y-3">
      <TextField.Root placeholder="Title" />
      <SimpleMDE placeholder="Description" options={MDEOptions} />
      <Button>
        <Link href="/">Submit New Issue</Link>
      </Button>
    </div>
  );
};

export default NewIssuePage;

"use client";

import Link from "next/link";
import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl mt-10 space-y-3">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" />
      <Button>
        <Link href="/">Submit New Issue</Link>
      </Button>
    </div>
  );
};

export default NewIssuePage;

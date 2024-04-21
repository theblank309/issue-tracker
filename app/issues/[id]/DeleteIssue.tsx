import { PrimaryButton } from "@/app/components/Buttons";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

const DeleteIssue = () => {
  return (
    <PrimaryButton>
      <TrashIcon /> Delete Issue
    </PrimaryButton>
  );
};

export default DeleteIssue;

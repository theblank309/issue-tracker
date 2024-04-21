import Link from "next/link";

import { PrimaryButton } from "@/app/components/Buttons";
import { Pencil2Icon } from "@radix-ui/react-icons";

const EditIssue = ({ id }: { id: number }) => {
  return (
    <Link href={`/issues/${id}/edit`}>
      <PrimaryButton width="100%">
        <Pencil2Icon /> Edit Issue
      </PrimaryButton>
    </Link>
  );
};

export default EditIssue;

import Link from "next/link";

import { PlusIcon } from "@radix-ui/react-icons";
import { PrimaryButton } from "@/app/components/Buttons";

const NewIssueButton = () => {
  return (
    <Link href="/issues/new">
      <PrimaryButton>
        <PlusIcon /> New Issue
      </PrimaryButton>
    </Link>
  );
};

export default NewIssueButton;

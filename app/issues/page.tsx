import { PlusIcon } from "@radix-ui/react-icons";
import Button from "@/app/components/Button";
import Link from "next/link";

const IssuesPage = () => {
  return (
    <Link href="/issues/new">
      <Button>
        <PlusIcon /> New Issue
      </Button>
    </Link>
  );
};

export default IssuesPage;

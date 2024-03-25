import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = () => {
  return (
    <Button>
      <PlusIcon />
      <Link href="/issues/new">New Issue</Link>
    </Button>
  );
};

export default IssuesPage;

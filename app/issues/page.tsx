import { PlusIcon } from "@radix-ui/react-icons";
import Button from "@/app/components/Button";
import Link from "next/link";
import { Table } from "@radix-ui/themes";
import axios from "axios";

interface IssueResponse {
  id: number;
  title: string;
  createdAt: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSE";
}

const IssuesPage = async () => {
  const response = await axios.get("http://127.0.0.1:8000/get_issues");
  const issues: IssueResponse[] = response.data;

  const tableRows = (issue: IssueResponse) => {
    const date = new Date(issue.createdAt);
    return (
      <Table.Row key={issue.id}>
        <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
        <Table.Cell>{issue.status}</Table.Cell>
        <Table.Cell>{date.toDateString()}</Table.Cell>
      </Table.Row>
    );
  };

  return (
    <>
      <Link href="/issues/new" className="cursor-pointer">
        <Button>
          <PlusIcon /> New Issue
        </Button>
      </Link>
      <div className="mt-5">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{issues.map(tableRows)}</Table.Body>
        </Table.Root>
      </div>
    </>
  );
};

export default IssuesPage;

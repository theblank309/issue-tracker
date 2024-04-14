import { PrimaryButton } from "@/app/components/Buttons";
import CustomLink from "@/app/components/Link";
import { PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";

export interface IssueResponse {
  id: number;
  title: string;
  createdAt: string;
  status: Status;
  description: string;
}

export enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

const IssuesPage = async () => {
  const response = await axios.get("http://127.0.0.1:8000/get_issues");
  // const response = { data: [] };
  const issues: IssueResponse[] = response.data;

  const tableRows = (issue: IssueResponse) => {
    const date = new Date(issue.createdAt);
    return (
      <Table.Row key={issue.id}>
        <Table.RowHeaderCell>
          <CustomLink href={`/issues/${issue.id}`}>{issue.title}</CustomLink>
        </Table.RowHeaderCell>
        <Table.Cell>
          <IssueStatusBadge status={issue.status} />
        </Table.Cell>
        <Table.Cell>{date.toDateString()}</Table.Cell>
      </Table.Row>
    );
  };

  return (
    <>
      <div className="mb-5">
        <Link href="/issues/new">
          <PrimaryButton>
            <PlusIcon /> New Issue
          </PrimaryButton>
        </Link>
      </div>
      <div>
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

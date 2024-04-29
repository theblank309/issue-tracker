import { Table } from "@radix-ui/themes";

import { IssueResponse } from "@/app/schema";
import CustomLink from "@/app/components/Link";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

interface Props {
  issues: IssueResponse[];
}

const IssuesTable = ({ issues }: Props) => {
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
    <Table.Root variant="surface" layout="fixed">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{issues.map(tableRows)}</Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;

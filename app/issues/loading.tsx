import { PlusIcon } from "@radix-ui/react-icons";
import { Link, Skeleton, Table } from "@radix-ui/themes";
import React from "react";
import { PrimaryButton } from "@/app/components/Buttons";

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];

  const tableRows = (issue: number) => {
    return (
      <Table.Row key={issue}>
        <Table.RowHeaderCell>
          <Skeleton className="h-4" />
        </Table.RowHeaderCell>
        <Table.Cell>
          <Skeleton className="h-4" />
        </Table.Cell>
        <Table.Cell>
          <Skeleton className="h-4" />
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <>
      <div className="mb-5">
        <Link href="/issues/new" className="cursor-pointer">
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

export default LoadingIssuesPage;

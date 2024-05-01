"use client";

import { useState } from "react";

import { Table } from "@radix-ui/themes";
import {
  CaretSortIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@radix-ui/react-icons";

import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import CustomLink from "@/app/components/Link";
import { IssueResponse } from "@/app/schema";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  issues: IssueResponse[];
}

const IssuesTable = ({ issues }: Props) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const router = useRouter();
  const searchParams = useSearchParams();

  // ------------------------------------ Header and Sort ---------------------------------------------
  const columns: {
    label: string;
    value: keyof IssueResponse;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt" },
  ];

  const handleSort = (column: any) => {
    let direction = "asc";
    if (sortConfig.key === column.value && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (
      sortConfig.key === column.value &&
      sortConfig.direction === "desc"
    ) {
      direction = "";
    }
    setSortConfig({ key: column.value, direction });

    const params = new URLSearchParams(searchParams.toString());
    if (direction !== "") {
      params.set("orderBy", column.value);
      params.set("sort", direction);
    } else {
      params.delete("orderBy");
      params.delete("sort");
    }

    const query = params.toString();
    router.push("/issues?" + query);
  };

  const setIcons = (column: any) => {
    if (column.value !== sortConfig.key || sortConfig.direction === "") {
      return <CaretSortIcon className="inline" />;
    }
    return sortConfig.direction === "asc" ? (
      <TriangleUpIcon className="inline" />
    ) : (
      <TriangleDownIcon className="inline" />
    );
  };

  const setHeaders = (column: any) => {
    return (
      <Table.ColumnHeaderCell key={column.value}>
        <button onClick={() => handleSort(column)}>{column.label}</button>{" "}
        {setIcons(column)}
      </Table.ColumnHeaderCell>
    );
  };

  // ------------------------------------ Table Row Values ---------------------------------------------
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
        <Table.Row>{columns.map(setHeaders)}</Table.Row>
      </Table.Header>
      <Table.Body>{issues.map(tableRows)}</Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;

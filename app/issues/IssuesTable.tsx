"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Table } from "@radix-ui/themes";
import {
  CaretSortIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@radix-ui/react-icons";

import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import CustomLink from "@/app/components/Link";
import { IssueResponse } from "@/app/schema";
import IssueImpactBadge from "@/app/components/IssueImpactBadge";

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
    { label: "Impact", value: "impact" },
    { label: "Created", value: "createdAt" },
    { label: "Updated", value: "updatedAt" },
    { label: "Status", value: "status" },
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

    const query = params.toString() ? "?" + params.toString() : "";
    router.push("/issues" + query);
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

  // ------------------------------------ Table Headers ---------------------------------------------
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
    const createdDate = new Date(issue.createdAt);
    const updatedData = new Date(issue.createdAt);
    return (
      <Table.Row key={issue.id}>
        <Table.RowHeaderCell>
          <CustomLink href={`/issues/${issue.id}`}>{issue.title}</CustomLink>
        </Table.RowHeaderCell>
        <Table.Cell>
          <IssueImpactBadge impact={issue.impact} />
        </Table.Cell>
        <Table.Cell>{createdDate.toDateString()}</Table.Cell>
        <Table.Cell>{updatedData.toDateString()}</Table.Cell>
        <Table.Cell>
          <IssueStatusBadge status={issue.status} />
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>{columns.map(setHeaders)}</Table.Row>
      </Table.Header>
      <Table.Body>{issues.map(tableRows)}</Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;

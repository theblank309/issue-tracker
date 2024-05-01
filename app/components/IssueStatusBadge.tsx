import React from "react";
import { Status } from "@/app/schema";
import { Badge } from "@radix-ui/themes";

interface Props {
  status: Status;
}

const statusMap: Record<
  string,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge size="2" color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;

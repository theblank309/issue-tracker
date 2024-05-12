import React from "react";
import { Status } from "@/app/schema";
import { Badge } from "@radix-ui/themes";

interface Props {
  status: Status;
  size?: "1" | "2" | "3";
}

const statusMap: Record<
  string,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status, size = "2" }: Props) => {
  return (
    <Badge size={size} color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;

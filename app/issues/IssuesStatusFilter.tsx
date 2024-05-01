"use client";

import { Flex, Select } from "@radix-ui/themes";
import { Status } from "@/app/schema";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: Status.OPEN },
  { label: "In Progress", value: Status.IN_PROGRESS },
  { label: "Closed", value: Status.CLOSED },
];

const IssuesStatusFilter = () => {
  const router = useRouter();
  const nextParams = useSearchParams();

  const statusChange = (value: string) => {
    const params = new URLSearchParams(nextParams.toString());
    value !== "ALL" ? params.set("status", value) : params.delete("status");
    const query = params.toString() ? "?" + params.toString() : "";
    router.push(`/issues${query}`);
  };

  return (
    <Flex direction="column" minWidth="120px">
      <Select.Root
        onValueChange={statusChange}
        defaultValue={nextParams.get("status") || ""}
      >
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content position="popper">
          <Select.Group>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default IssuesStatusFilter;

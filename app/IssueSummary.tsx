import React from "react";
import { Status } from "./schema";
import { Box, Card, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssueSummary = ({ open, in_progress, closed }: Props) => {
  const containers: { label: string; status: Status; value: number }[] = [
    { label: "Open Issues", status: Status.OPEN, value: open },
    {
      label: "In Progress Issues",
      status: Status.IN_PROGRESS,
      value: in_progress,
    },
    { label: "Closed Issues", status: Status.CLOSED, value: closed },
  ];

  return (
    <Grid gap="3" columns={{ initial: "1", xs: "3" }}>
      {containers.map((container) => (
        <Box width={{ initial: "80dvw", xs: "160px" }} key={container.status}>
          <Card>
            <Flex direction="column">
              <Link
                className="text-sm font-medium"
                href={`issues?status=${container.status}`}
              >
                {container.label}
              </Link>
              <Text size="5" className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Card>
        </Box>
      ))}
    </Grid>
  );
};

export default IssueSummary;

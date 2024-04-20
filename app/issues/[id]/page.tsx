import axios from "axios";
import { notFound } from "next/navigation";
import { IssueResponse } from "../page";

import { PrimaryButton } from "@/app/components/Buttons";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import parse from "html-react-parser";

interface Props {
  params: { id: number };
}

const IssueDetailPage = async ({ params }: Props) => {
  let issue: IssueResponse | null = null;
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/get_issues/${params.id}`
    );
    issue = response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      notFound();
    }
  }
  if (!issue) {
    notFound();
  }

  const date = new Date(issue?.createdAt);
  return (
    <Grid
      className="mt-8"
      columns={{ initial: "1", md: "2" }}
      gapY={{ initial: "3" }}
    >
      <Box width={{ md: "70vw" }}>
        <Heading as="h3">{issue?.title}</Heading>
        <Flex className="space-x-3 my-2">
          <IssueStatusBadge status={issue?.status} />
          <Text as="p" className="text-sm">
            {date.toDateString()}
          </Text>
        </Flex>
        <Text as="p" className="mt-5 mb-2 text-sm font-medium ml-1">
          Description:
        </Text>
        <Box
          className="p-2 w-11/12 h-[50vh] border-2 rounded-md border-border-color bg-white"
          style={{ overflow: "auto" }}
        >
          {parse(issue?.description)}
        </Box>
      </Box>
      <Flex
        position="relative"
        width={{ md: "25vw" }}
        left={{ md: "22vw" }}
        justify={{ md: "end" }}
      >
        <Flex
          direction={{ md: "column" }}
          gapY={{ md: "2" }}
          gapX={{ initial: "1" }}
          width="150px"
        >
          <PrimaryButton>
            <Pencil2Icon /> Edit Issue
          </PrimaryButton>
          <PrimaryButton>
            <TrashIcon /> Delete Issue
          </PrimaryButton>
        </Flex>
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;

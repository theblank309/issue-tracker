import axios from "axios";
import { notFound } from "next/navigation";
import { IssueResponse } from "../page";

import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
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
    <div className="mt-8">
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
        className="p-2 w-9/12 h-[50vh] border-2 rounded-md border-border-color bg-white"
        style={{ overflow: "auto" }}
      >
        {parse(issue?.description)}
      </Box>
    </div>
  );
};

export default IssueDetailPage;

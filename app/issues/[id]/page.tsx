import axios from "axios";
import React from "react";
import { IssueResponse } from "../page";
import { notFound } from "next/navigation";

import delay from "delay";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

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
  await delay(2000);
  if (!issue) {
    notFound();
  }

  const date = new Date(issue?.createdAt);
  return (
    <div>
      <Heading as="h3" className="mt-8">
        {issue?.title}
      </Heading>
      <Flex className="space-x-3 my-2">
        <IssueStatusBadge status={issue?.status} />
        <Text as="p">{date.toDateString()}</Text>
      </Flex>
      <Card>
        <Text as="p">{issue?.description}</Text>
      </Card>
    </div>
  );
};

export default IssueDetailPage;

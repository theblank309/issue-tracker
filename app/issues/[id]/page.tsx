import axios from "axios";
import { notFound } from "next/navigation";
import { IssueResponse } from "@/app/schema";

import { Box, Flex, Grid } from "@radix-ui/themes";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import EditIssue from "@/app/issues/[id]/EditIssue";
import DeleteIssue from "@/app/issues/[id]/DeleteIssue";

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

  return (
    <Grid
      className="mt-8"
      columns={{ initial: "1", md: "2" }}
      gapY={{ initial: "3" }}
    >
      <Box width={{ md: "70vw" }}>
        <IssueDetails issue={issue} />
      </Box>

      <Flex
        direction={{ md: "column" }}
        gapY={{ md: "2" }}
        gapX={{ initial: "1" }}
        className="md:ml-auto"
        width={{ md: "150px" }}
      >
        <EditIssue id={issue.id} />
        <DeleteIssue id={issue.id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;

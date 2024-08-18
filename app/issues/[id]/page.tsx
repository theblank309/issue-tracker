import axios from "axios";
import { notFound } from "next/navigation";
import { IssueResponse } from "@/app/schema";

import { Box, Flex, Grid } from "@radix-ui/themes";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import EditIssue from "@/app/issues/[id]/EditIssue";
import DeleteIssue from "@/app/issues/[id]/DeleteIssue";
import { SearchUser } from "./SearchUser";

interface Props {
  params: { id: number };
}

const IssueDetailPage = async ({ params }: Props) => {
  let issue: IssueResponse | null = null;
  let user_email: string = "";
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/get_issues/${params.id}`
    );
    issue = response.data;
    if (issue?.user) {
      user_email = issue?.user.email;
    }
    console.log(issue);
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      notFound();
    }
  }
  if (!issue) {
    notFound();
  }

  console.log(user_email);
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
        width={{ md: "200px" }}
      >
        <SearchUser user_email={user_email} id={issue.id} />
        <EditIssue id={issue.id} />
        <DeleteIssue id={issue.id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;

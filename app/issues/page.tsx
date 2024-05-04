import axios from "axios";
import { Box, Flex } from "@radix-ui/themes";
import IssuesTable from "./IssuesTable";
import NewIssueButton from "./NewIssueButton";
import { IssueResponse, Status } from "@/app/schema";
import IssuesStatusFilter from "@/app/issues/IssuesStatusFilter";

interface Props {
  searchParams: { status: Status; orderBy: keyof IssueResponse; sort: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = new URLSearchParams(searchParams);
  const query = params.toString() ? "?" + params.toString() : "";
  const response = await axios.get("http://127.0.0.1:8000/get_issues" + query);
  const issues: IssueResponse[] = response.data;

  return (
    <>
      <Flex className="mb-5" justify="between">
        <IssuesStatusFilter />
        <NewIssueButton />
      </Flex>
      <Box>
        <IssuesTable issues={issues} />
      </Box>
    </>
  );
};

export default IssuesPage;

import axios from "axios";
import { Box, Flex } from "@radix-ui/themes";
import IssuesTable from "./IssuesTable";
import NewIssueButton from "./NewIssueButton";
import { IssueResponse, Status } from "@/app/schema";
import IssuesStatusFilter from "@/app/issues/IssuesStatusFilter";

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : "";
  const query = status ? `?status=${status}` : "";
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

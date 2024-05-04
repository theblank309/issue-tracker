import axios from "axios";
import { Box, Flex } from "@radix-ui/themes";
import IssuesTable from "./IssuesTable";
import NewIssueButton from "./NewIssueButton";
import { IssueResponse, Status } from "@/app/schema";
import IssuesStatusFilter from "@/app/issues/IssuesStatusFilter";
import Pagination from "../components/Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof IssueResponse;
    sort: string;
    currentPage: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = new URLSearchParams(searchParams);
  const query = params.toString() ? "?" + params.toString() : "";
  const response = await axios.get("http://127.0.0.1:8000/get_issues" + query);
  const issues: IssueResponse[] = response.data;

  return (
    <>
      <Flex justify="between" mb="4">
        <IssuesStatusFilter />
        <NewIssueButton />
      </Flex>
      <Box>
        <IssuesTable issues={issues} />
      </Box>
      <Flex align="center" gapX="2" my="4" justify="end">
        <Pagination
          itemCount={100}
          pageSize={10}
          currentPage={parseInt(searchParams.currentPage) || 1}
        ></Pagination>
      </Flex>
    </>
  );
};

export default IssuesPage;

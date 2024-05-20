import IssuesStatusFilter from "@/app/issues/IssuesStatusFilter";
import { IssueResponse, Status } from "@/app/schema";
import { Box, Flex } from "@radix-ui/themes";
import axios from "axios";
import Pagination from "../components/Pagination";
import IssuesTable from "./IssuesTable";
import NewIssueButton from "./NewIssueButton";
import NewUserButton from "./NewUserButton";

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
  const currentPage = parseInt(searchParams.currentPage) || 1;
  params.set("currentPage", currentPage.toString());

  const query = params.toString() ? "?" + params.toString() : "";
  const issues = (
    await axios.get<IssueResponse[]>("http://127.0.0.1:8000/get_issues" + query)
  ).data;

  const pageSize = 10;
  const itemCount = (
    await axios.get<number>("http://127.0.0.1:8000/get_issues_count" + query)
  ).data;

  return (
    <>
      <Flex justify="between" mb="4">
        <IssuesStatusFilter />
        <Flex gapX="2">
          <NewIssueButton />
          <NewUserButton />
        </Flex>
      </Flex>
      <Box>
        <IssuesTable issues={issues} />
      </Box>
      <Flex align="center" gapX="2" my="4" justify="end">
        <Pagination
          itemCount={itemCount}
          pageSize={pageSize}
          currentPage={currentPage}
        ></Pagination>
      </Flex>
    </>
  );
};

export default IssuesPage;

import axios from "axios";
import { Box } from "@radix-ui/themes";
import IssuesTable from "./IssuesTable";
import NewIssueButton from "./NewIssueButton";
import { IssueResponse } from "@/app/schema";

const IssuesPage = async () => {
  const response = await axios.get("http://127.0.0.1:8000/get_issues");
  const issues: IssueResponse[] = response.data;

  return (
    <>
      <Box className="mb-5">
        <NewIssueButton />
      </Box>
      <Box>
        <IssuesTable issues={issues} />
      </Box>
    </>
  );
};

export default IssuesPage;

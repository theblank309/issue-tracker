import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import parse from "html-react-parser";
import { IssueResponse } from "@/app/schema";

interface Props {
  issue: IssueResponse;
}

const IssueDetails = ({ issue }: Props) => {
  const date = new Date(issue?.createdAt);
  return (
    <>
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
    </>
  );
};

export default IssueDetails;

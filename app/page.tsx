import { Box, Card, Flex, Grid, Text } from "@radix-ui/themes";
// import Select from "./components/Select/Select";
import IssueSummary from "./IssueSummary";
import { SummaryOptions } from "./schema";
import dynamic from "next/dynamic";
import AssignedChart from "./AssignedChart";
import IssueChart from "./IssueChart";

const Select = dynamic(() => import("./components/Select/Select"), {
  ssr: false,
});

export default function Home() {
  const summarySelect: { label: string; option: SummaryOptions }[] = [
    { label: "Overall", option: SummaryOptions.OVERALL },
    { label: "Current Year", option: SummaryOptions.CURRENT_YEAR },
    {
      label: "Current Month",
      option: SummaryOptions.CURRENT_MONTH,
    },
  ];
  return (
    <Grid columns="0.45fr 1fr" width="auto" gapX="4" height="80dvh" mt="3">
      <Flex gapY="3" direction="column" align="start">
        <IssueSummary open={30} in_progress={10} closed={5} />
        <AssignedChart unassigned={150} assigned={23} />
      </Flex>
      <Flex direction="column" gapY="3">
        <IssueChart />
        <Grid columns="1fr 0.5fr" height="50%" gapX="4">
          <Box
            width="100%"
            className="bg-white border border-border-color rounded-md p-2"
          >
            <Text size="3" weight="medium" m="2" align="center">
              Latest Issue
            </Text>
          </Box>
          <Box
            width="100%"
            className="bg-white border border-border-color rounded-md p-2"
          >
            <Text size="3" weight="medium" m="2" align="center">
              Leaderboard
            </Text>
          </Box>
        </Grid>
      </Flex>
    </Grid>
  );
}

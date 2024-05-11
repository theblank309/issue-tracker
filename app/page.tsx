import { Box, Card, Flex, Text } from "@radix-ui/themes";
// import Select from "./components/Select/Select";
import IssueSummary from "./IssueSummary";
import { SummaryOptions } from "./schema";
import dynamic from "next/dynamic";
import AssignedChart from "./AssignedChart";

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
    <Flex gapY="3" direction="column" align="start" width="30dvw">
      <Select
        items={summarySelect}
        fontWeight={500}
        defaultValue={SummaryOptions.OVERALL}
      />
      <IssueSummary open={30} in_progress={10} closed={5} />
      <Box height="60dvh" width="100%">
        <Card>
          <Text size="3" weight="medium" mt="1">
            Issues Assigned Overview
          </Text>
          <Box height="60dvh" width="100%">
            <AssignedChart unassigned={150} assigned={23} />
          </Box>
        </Card>
      </Box>
    </Flex>
  );
}

import { Flex } from "@radix-ui/themes";
import Select from "./components/Select/Select";
import IssueSummary from "./IssueSummary";
import { SummaryOptions } from "./schema";

export default function Home() {
  const summarySelect: { label: string; option: SummaryOptions }[] = [
    { label: "Overall", option: SummaryOptions.OVERALL },
    {
      label: "Current Month",
      option: SummaryOptions.CURRENT_MONTH,
    },
    { label: "Current Year", option: SummaryOptions.CURRENT_YEAR },
  ];
  return (
    <Flex gapY="4" direction="column" align="start">
      <Select items={summarySelect} fontWeight={500} />
      <IssueSummary open={30} in_progress={10} closed={5} />
    </Flex>
  );
}

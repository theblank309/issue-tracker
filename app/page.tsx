import { Flex } from "@radix-ui/themes";
// import Select from "./components/Select/Select";
import IssueSummary from "./IssueSummary";
import { SummaryOptions } from "./schema";
import dynamic from "next/dynamic";

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
    <Flex gapY="3" direction="column" align="start">
      <Select
        items={summarySelect}
        fontWeight={500}
        defaultValue={SummaryOptions.OVERALL}
      />
      <IssueSummary open={30} in_progress={10} closed={5} />
    </Flex>
  );
}

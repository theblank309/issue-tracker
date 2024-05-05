import IssueSummary from "./IssueSummary";

export default function Home() {
  return (
    <>
      <IssueSummary open={30} in_progress={10} closed={5} />
    </>
  );
}

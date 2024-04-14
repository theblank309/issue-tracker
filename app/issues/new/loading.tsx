import { TextField, Text, TextArea, Box, Skeleton } from "@radix-ui/themes";
import { PrimaryButton } from "@/app/components/Buttons";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl mt-5">
      <form className="space-y-2">
        <Skeleton height="4vh" width="10vw" />
        <Skeleton height="4vh" />
        <Skeleton height="4vh" width="10vw" />
        <Skeleton height="45vh" />
        <PrimaryButton disabled={true}>Submit New Issue</PrimaryButton>
      </form>
    </Box>
  );
};

export default LoadingNewIssuePage;

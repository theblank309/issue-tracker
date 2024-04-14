import { TextField, Text, TextArea, Box, Skeleton } from "@radix-ui/themes";
import { PrimaryButton } from "@/app/components/Buttons";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl mt-5">
      <form className="space-y-2">
        <Text as="p" className="text-sm font-medium">
          <Skeleton>Title</Skeleton>
        </Text>
        <TextField.Root></TextField.Root>
        <Text as="p" className="text-sm font-medium mt-5">
          <Skeleton>Description</Skeleton>
        </Text>
        <TextArea placeholder="Reply to comment…" />
        <PrimaryButton disabled={false}>Submit New Issue</PrimaryButton>
      </form>
    </Box>
  );
};

export default LoadingNewIssuePage;

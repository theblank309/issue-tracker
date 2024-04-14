import { Box, Flex, Heading, Text, Skeleton } from "@radix-ui/themes";
import React from "react";

const LoadingDetailPage = () => {
  return (
    <div className="mt-8">
      <Skeleton height={"5vh"} width={"30vw"} />
      <Flex className="space-x-3 my-2">
        <Skeleton height={"3vh"} width={"14vw"} />
        <Skeleton height={"3vh"} width={"15vw"} />
      </Flex>

      <Text as="p" className="mt-5 mb-2 text-sm font-medium ml-1">
        <Skeleton height={"2vh"} width={"10vw"} />
      </Text>
      <Skeleton>
        <Box
          className="p-2 w-9/12 h-[50vh] border-2 rounded-md border-border-color bg-white"
          style={{ overflow: "auto" }}
        ></Box>
      </Skeleton>
    </div>
  );
};

export default LoadingDetailPage;

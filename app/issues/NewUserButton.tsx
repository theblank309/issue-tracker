import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { PrimaryButton } from "@/app/components/Buttons";
import { PersonIcon } from "@radix-ui/react-icons";

const NewUserButton = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button style={{ backgroundColor: "#1C2541" }}>
          <PersonIcon />
          Add New User
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add New User</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add new user to assign issues
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              defaultValue="Freja Johnsen"
              placeholder="Enter your full name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              defaultValue="freja@example.com"
              placeholder="Enter your email"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button style={{ backgroundColor: "#1C2541" }}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NewUserButton;

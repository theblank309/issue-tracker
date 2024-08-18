"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PersonIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { z } from "zod";
import { createUserSchema } from "@/app/schema";
import { useRouter } from "next/navigation";

type UserData = z.infer<typeof createUserSchema>;

export function SearchUser({
  user_email,
  id,
}: {
  user_email: string;
  id: number;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(user_email);
  const [users, setUsers] = React.useState<UserData[]>([]);

  React.useEffect(() => {
    async function getUsers() {
      const response = await axios.get<UserData[]>(
        "http://127.0.0.1:8000/get_users"
      );
      setUsers(response.data);
    }
    getUsers();
  }, []);

  let selectUser = async (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    await axios.patch(`http://127.0.0.1:8000/assign_user`, {
      issue_id: id,
      user_email: currentValue === value ? "" : currentValue,
    });
    router.refresh();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-[35px] justify-center"
          style={{ backgroundColor: "#1C2541", color: "white" }}
        >
          <div className="flex justify-center items-center gap-x-1">
            {<PersonIcon />}
            {value
              ? users?.find((user) => user.email === value)?.name
              : "Assign User"}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[200px]"
        style={{ fontFamily: "sans-serif" }}
      >
        <Command>
          <CommandInput placeholder="Search User" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {users?.map((user) => {
              return (
                <CommandItem
                  key={user.email}
                  value={user.email}
                  onSelect={selectUser}
                >
                  {user.name}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

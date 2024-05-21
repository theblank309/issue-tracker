"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import classnames from "classnames";

import {
  ActivityLogIcon,
  DashboardIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { PiBugDroid } from "react-icons/pi";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";

import styles from "./app.module.css";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tracks", href: "/issues" },
  ];

  const setLink = (link: any) => {
    return (
      <Link
        href={link.href}
        key={link.href}
        className={classnames({
          "text-zinc-900": link.href === currentPath,
          "text-zinc-500": link.href !== currentPath,
          "text-base mx-3 hover:text-zinc-800 transition-colors ": true,
        })}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <nav className="min-h-16 border-b content-center px-5 bg-white">
      <Flex gap="3" className="items-center">
        <Box mr="5">
          <Flex className="font-bold text-xl items-center text-fifth-color">
            <PiBugDroid size={"35px"} className="mr-2" /> Tracker
          </Flex>
        </Box>

        {/* Navbar for large screen */}
        <div className="hidden md:block">
          {links.map((link) => setLink(link))}
        </div>

        {/* Navbar for small screen */}
        <div className="block ml-auto md:hidden">
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <Button
                color="gray"
                variant="surface"
                highContrast
                onClick={() => setOpen(true)}
              >
                <HamburgerMenuIcon />
              </Button>
            </Dialog.Trigger>
            <Dialog.Content
              className={styles.mobileSidebar}
              style={{
                transform: `${open ? "translateX(0)" : "translateX(100%)"}`,
              }}
            >
              {links.map((link) => (
                <Flex
                  align="center"
                  justify="end"
                  my="4"
                  key={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label === "Issues" ? (
                    <ActivityLogIcon />
                  ) : (
                    <DashboardIcon />
                  )}
                  <Text size="3" asChild>
                    {setLink(link)}
                  </Text>
                </Flex>
              ))}
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </Flex>
    </nav>
  );
};
export default NavBar;

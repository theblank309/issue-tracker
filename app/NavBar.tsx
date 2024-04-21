"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Box, Flex, Button, Dialog } from "@radix-ui/themes";
import { PiBugDroid } from "react-icons/pi";
import classnames from "classnames";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
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
    <nav className="min-h-16 border-b content-center px-5 mb-5 bg-white">
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
            <Dialog.Trigger>
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
              style={{
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                top: 0,
                right: open ? 0 : "-50%",
                width: "50%",
                height: "100%",
                padding: "20px",
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
                transition: "right 0.3s ease-out",
              }}
              className="gap-y-3"
            >
              {links.map((link) => (
                <Dialog.Description
                  key={link.href}
                  onClick={() => setOpen(false)}
                >
                  {setLink(link)}
                </Dialog.Description>
              ))}
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </Flex>
    </nav>
  );
};
export default NavBar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Box, Flex } from "@radix-ui/themes";
import { PiBugDroid } from "react-icons/pi";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issue" },
  ];
  return (
    <nav className="min-h-14 border-b content-center pl-5">
      <Flex gap="3" className="items-center">
        <Box mr="5">
          <Flex className="font-bold text-lg items-center">
            <PiBugDroid size={"30px"} className="mr-2" /> Tracker
          </Flex>
        </Box>
        {links.map((link) => (
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
        ))}
      </Flex>
    </nav>
  );
};
export default NavBar;

import React from "react";
import classnames from "classnames";
import * as Toolbar from "@radix-ui/react-toolbar";
import {
  FaHeading,
  FaListUl,
  FaParagraph,
  FaBold,
  FaItalic,
} from "react-icons/fa6";

const FixedToolBar = () => {
  const toggleButtonStyle = {
    "mx-1 h-6 w-6 rounded": true,
    "inline-flex items-center justify-center": true,
    "hover:bg-third-color hover:text-white transition-colors": true,
    "data-[state=on]:bg-third-color data-[state=on]:text-white transition-colors":
      true,
  };
  return (
    <div>
      <Toolbar.Root
        className="flex p-2 rounded-md border border-border-color bg-white"
        aria-label="Formatting options"
      >
        <Toolbar.ToggleGroup type="single" aria-label="Text formatting">
          <Toolbar.ToggleItem
            className={classnames(toggleButtonStyle)}
            value="heading"
            aria-label="Heading"
          >
            <FaHeading size={"15px"} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className={classnames(toggleButtonStyle)}
            value="text"
            aria-label="Text"
          >
            <FaParagraph size={"15px"} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className={classnames(toggleButtonStyle)}
            value="list"
            aria-label="List"
          >
            <FaListUl size={"15px"} />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator className="ToolbarSeparator border border-border-color mx-3" />
        <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
          <Toolbar.ToggleItem
            className={classnames(toggleButtonStyle)}
            value="bold"
            aria-label="Bold"
          >
            <FaBold size={"15px"} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className={classnames(toggleButtonStyle)}
            value="italic"
            aria-label="Italic"
          >
            <FaItalic size={"15px"} />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
      </Toolbar.Root>
    </div>
  );
};

export default FixedToolBar;

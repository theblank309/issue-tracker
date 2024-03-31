"use client";

import React from "react";
import classnames from "classnames";
import { type Editor } from "@tiptap/react";
import * as Toolbar from "@radix-ui/react-toolbar";
import {
  FaHeading,
  FaListUl,
  FaParagraph,
  FaBold,
  FaItalic,
} from "react-icons/fa6";

interface Props {
  editor: Editor | null;
  enterEvent: string;
  handleValueChange: (value: string) => void;
}

const FixedToolBar = ({ editor, enterEvent, handleValueChange }: Props) => {
  if (!editor) {
    return null;
  }

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
        <Toolbar.ToggleGroup
          type="single"
          aria-label="Text formatting"
          id="toolbar-set1"
          defaultValue="text"
          value={enterEvent}
          onValueChange={handleValueChange}
        >
          <Toolbar.ToggleItem
            id="heading"
            className={classnames(toggleButtonStyle)}
            value="heading"
            aria-label="Heading"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            <FaHeading size={"15px"} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            id="text"
            className={classnames(toggleButtonStyle)}
            value="text"
            aria-label="Text"
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <FaParagraph size={"15px"} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            id="list"
            className={classnames(toggleButtonStyle)}
            value="list"
            aria-label="List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
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
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
          >
            <FaBold size={"15px"} />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className={classnames(toggleButtonStyle)}
            value="italic"
            aria-label="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
          >
            <FaItalic size={"15px"} />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
      </Toolbar.Root>
    </div>
  );
};

export default FixedToolBar;

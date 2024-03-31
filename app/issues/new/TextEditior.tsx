import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FixedToolBar from "./ToolBar";

interface Props {
  onChange: (richText: string) => void;
  description?: string;
}

const TextEditior = ({ onChange, description }: Props) => {
  const editor = useEditor({
    content: "",
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [4],
          HTMLAttributes: {
            class: "text-lg font-bold",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "text-sm",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-5 text-sm",
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "border h-[45vh] max-h-[45vh] overflow-auto rounded-md p-2 border-border-color bg-white",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  const [selectedValue, setSelectedValue] = useState("text");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <FixedToolBar
        editor={editor}
        enterEvent={selectedValue}
        handleValueChange={handleValueChange}
      />
      <EditorContent
        editor={editor}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            if (selectedValue === "list") {
              setSelectedValue("list");
            } else {
              setSelectedValue("text");
            }
          }
        }}
      />
    </div>
  );
};

export default TextEditior;

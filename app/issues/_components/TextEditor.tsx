import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FixedToolBar from "@/app/issues/_components/ToolBar";

interface Props {
  onChange: (richText: string) => void;
  description?: string;
}

const TextEditor = ({ onChange, description }: Props) => {
  const editor = useEditor({
    content: description,
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
    },
  });

  const [eventArray, setEventArray] = useState<Array<String>>([]);
  const [selectedValue, setSelectedValue] = useState("text");

  const updateEventArray = (element: string) => {
    if (eventArray.length <= 2) {
      setEventArray([...eventArray, element]);
    } else {
      setEventArray([...eventArray.slice(1), element]);
    }
  };

  function arraysAreEqual(arr1: Array<String>, arr2: Array<String>) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  }

  return (
    <div>
      <FixedToolBar
        editor={editor}
        enterEvent={selectedValue}
        handleValueChange={(value: string) => {
          setSelectedValue(value);
        }}
      />
      <EditorContent
        editor={editor}
        onKeyDown={(event) => {
          updateEventArray(event.key);
          if (
            arraysAreEqual(
              ["Enter", "Backspace", "Enter"],
              [...eventArray.slice(1), event.key]
            )
          ) {
            setSelectedValue("text");
          } else if (event.key === "Enter") {
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

export default TextEditor;

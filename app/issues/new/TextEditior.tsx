import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FixedToolBar from "./ToolBar";

const TextEditior = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "border h-[45vh] rounded-md p-2 border-border-color bg-white text-sm",
      },
    },
  });

  return (
    <div>
      <FixedToolBar />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditior;

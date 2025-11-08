"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  const setLink = useCallback(() => {
    if (!editor) {
      return;
    }

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const ToggleButton = ({
    icon: Icon,
    name,
    value,
  }: {
    icon: React.ElementType;
    name: string;
    value?: object;
  }) => (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => editor.chain().focus().toggleMark(name, value).run()}
      disabled={!editor.can().chain().focus().toggleMark(name, value).run()}
      className={
        editor.isActive(name, value)
          ? "bg-slate-700 text-white"
          : "bg-slate-800"
      }
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-t-lg border border-slate-700 bg-slate-900 p-2">
      <ToggleButton icon={Bold} name="bold" />
      <ToggleButton icon={Italic} name="italic" />
      <ToggleButton icon={Strikethrough} name="strike" />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={setLink}
        className={
          editor.isActive("link") ? "bg-slate-700 text-white" : "bg-slate-800"
        }
      >
        <LinkIcon className="h-4 w-4" />
      </Button>

      <div className="mx-1 h-6 w-px bg-slate-700" />

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-slate-700 text-white"
            : "bg-slate-800"
        }
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "bg-slate-700 text-white"
            : "bg-slate-800"
        }
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "bg-slate-700 text-white"
            : "bg-slate-800"
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? "bg-slate-700 text-white"
            : "bg-slate-800"
        }
      >
        <Quote className="h-4 w-4" />
      </Button>

      <div className="mx-1 h-6 w-px bg-slate-700" />

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="bg-slate-800"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="bg-slate-800"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
};

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-slate min-h-[300px] max-w-none rounded-b-lg border-x border-b border-slate-700 bg-slate-800 p-4 focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="text-white">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

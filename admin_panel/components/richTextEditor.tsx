
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const RichTextInput = ({ description, onChange }: any) => {
  const className = "min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: cn(
          'prose min-w-full text-white dark:prose-invert prose-h1:text-2xl prose-h1:my-0 prose-p:my-0 prose-ul:my-2 [&_ol]:list-decimal [&_ul]:list-disc',
          className
        ),
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    content: description,
    immediatelyRender: false,
  })

  return (
    <div className='space-y-2'>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
};

import { type Editor } from '@tiptap/react';
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2
} from 'lucide-react';
import { Toggle } from "./ui/toggle"
import { cn } from '@/lib/utils';

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='bg-transparent border rounded-md border-input'>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading2 className='w-4 h-4' />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() =>
          editor.chain().focus().toggleBold().run()
        }
      >
        <Bold className='w-4 h-4' />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() =>
          editor.chain().focus().toggleItalic().run()
        }
      >
        <Italic className='w-4 h-4' />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() =>
          editor.chain().focus().toggleStrike().run()
        }
      >
        <Strikethrough className='w-4 h-4' />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() =>
          editor.chain().focus().toggleBulletList().run()
        }
      >
        <List className='w-4 h-4' />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
      >
        <ListOrdered className='w-4 h-4' />
      </Toggle>
    </div>
  )
};


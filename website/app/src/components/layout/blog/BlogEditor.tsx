import { useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

type RichPostEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

type QuillRef = ReactQuill | null;

type QuillToolbarContainer = string | (string | object)[][];

type QuillModules = {
  toolbar?: {
    container: QuillToolbarContainer;
    handlers?: Record<string, () => void>;
  };
};

export default function BlogEditor({ value, onChange }: RichPostEditorProps) {
  const quillRef = useRef<QuillRef>(null);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file || !quillRef.current) return;

      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result as string;
        const editor = quillRef.current?.getEditor();
        if (!editor) return;
        const range = editor?.getSelection(true);
        if (range) {
          editor.insertEmbed(range.index, "image", imageBase64);
          editor.setSelection(range.index + 1);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  const modules: QuillModules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ header: [1, 2, 3, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
      ],
      handlers: { image: handleImageUpload },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Bạn đang nghĩ gì hôm nay?"
        className="
          [&_.ql-editor]:text-[16px]
          [&_.ql-editor]:leading-relaxed
          [&_.ql-editor]:min-h-[300px]
          [&_.ql-editor_img]:max-w-full
          [&_.ql-editor_img]:rounded-sm
          [&_.ql-editor_img]:my-3
        "
      />
    </div>
  );
}

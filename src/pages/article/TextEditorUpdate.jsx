import { useEffect, useRef } from "react";
import Quill from "quill";

const TextEditorUpdate = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  const handleImageInsert = (quill) => {
    const imageUrl = prompt("Enter the image URL:");
    if (imageUrl) {
      const range = quill.getSelection(); // Get the current cursor position
      quill.insertEmbed(range.index, "image", imageUrl); // Insert the image at the cursor position
    }
  };

  useEffect(() => {
    if (!quillInstance.current) {
      // Initialize Quill only once
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Type your content here...",
        modules: {
          toolbar: {
            container: [
              [{ font: [] }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ align: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              [{ color: [] }, { background: [] }],
            ],
            handlers: {
              image: () => handleImageInsert(quillInstance.current),
            },
          },
        },
      });

      // Listen for text changes
      quillInstance.current.on("text-change", () => {
        const content = quillInstance.current.root.innerHTML;
        onChange(content);
      });
    }
  }, [onChange]); // Initialize only once

  // Sync value with Quill editor
  useEffect(() => {
    if (quillInstance.current && value !== undefined) {
      const editorContent = quillInstance.current.root.innerHTML;
      if (editorContent !== value) {
        quillInstance.current.root.innerHTML = value; // Update the content if it differs
      }
    }
  }, [value]); // Runs whenever `value` changes

  return <div ref={editorRef} style={{ minHeight: "300px" }} />;
};

export default TextEditorUpdate;

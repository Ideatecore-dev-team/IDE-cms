import { useEffect, useRef } from "react";
import Quill from "quill";
import "../../assets/css/custom-fonts.css";
import "quill/dist/quill.snow.css"; // Ensure this is imported for toolbar styles

const TextEditor = ({ handleEditorChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Only initialize Quill if it hasn't been initialized yet
    if (editorRef.current && !editorRef.current.__quill__) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              // Toolbar options for formatting
              [{ font: [] }], // Font options (updated whitelist)
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header options
              [{ size: ["small", false, "large", "huge"] }], // Font size options
              [{ align: [] }], // Text alignment options (left, center, right)
              ["bold", "italic", "underline", "strike"], // Basic formatting options
              [{ list: "ordered" }, { list: "bullet" }], // Ordered and bulleted lists
              ["link", "image"], // Link and image insertion options
              [{ color: [] }, { background: [] }], // Text and background color options
              [{ indent: "-1" }, { indent: "+1" }], // Indentation options
              [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
              ["blockquote", "code-block"], // Blockquote and code block
            ],
            handlers: {
              image: () => {
                const imageUrl = prompt("Enter image URL");
                if (imageUrl) {
                  const range = quill.getSelection();
                  quill.insertEmbed(range.index, "image", imageUrl);
                }
              },
            },
          },
        },

        formats: [
          // Supported editor formats
          "font",
          "header",
          "size",
          "align",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "bullet",
          "link",
          "image",
          "color",
          "background",
          "indent",
          "script",
          "blockquote",
          "code-block",
        ],
      });

      // Store the instance in the DOM element to check if it's already initialized
      editorRef.current.__quill__ = quill;

      // Optional: handle editor content change
      quill.on("text-change", () => {
        console.log(quill.root.innerHTML); // You can capture the HTML content here
        const content = quill.root.innerHTML;
        handleEditorChange(content); // Send the content back to the parent
      });
    }
  }, [handleEditorChange]);

  return (
    <div>
      <div ref={editorRef} className="isQuillEditor" />
    </div>
  );
};

export default TextEditor;

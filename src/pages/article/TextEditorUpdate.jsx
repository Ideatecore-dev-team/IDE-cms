import { useEffect, useRef } from "react";
import Quill from "quill";

/**
 * A React component for a rich text editor using the Quill library.
 *
 * Props:
 *  - value (string): The initial or updated content of the editor.
 *  - onChange (function): A callback function that is called whenever the editor content changes.
 */
const TextEditorUpdate = ({ value, onChange }) => {
  const editorRef = useRef(null); // A reference to the DOM element where Quill will be initialized
  const quillInstance = useRef(null); // A reference to the Quill editor instance

  /**
   * Handles image insertion into the editor.
   *
   * Prompts the user for an image URL and inserts the image at the current cursor position
   * if a valid URL is provided.
   *
   * @param {object} quill - The Quill editor instance
   */
  const handleImageInsert = (quill) => {
    const imageUrl = prompt("Enter the image URL:");
    if (imageUrl) {
      const range = quill.getSelection(); // Get the current cursor position
      quill.insertEmbed(range.index, "image", imageUrl); // Insert the image at the cursor position
    }
  };

  // Initialize Quill editor and event listeners
  useEffect(() => {
    if (!quillInstance.current) {
      // Initialize Quill only once
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow", // Set the editor theme (snow for a clean look)
        placeholder: "Type your content here...", // Display a placeholder text

        modules: {
          toolbar: {
            container: [
              // Toolbar options for formatting
              // [{ font: [] }], // Font options (updated whitelist)
              // [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header options
              // [{ size: ["small", false, "large", "huge"] }], // Font size options
              // [{ align: [] }], // Text alignment options (left, center, right)
              ["bold", "italic", "underline", "strike"], // Basic formatting options
              [{ list: "ordered" }, { list: "bullet" }], // Ordered and bulleted lists
              ["link", "image"], // Link and image insertion options
              [{ color: [] }, { background: [] }], // Text and background color options
              // [{ indent: "-1" }, { indent: "+1" }], // Indentation options
              [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
              // ["blockquote", "code-block"], // Blockquote and code block
            ],
            handlers: {
              image: () => handleImageInsert(quillInstance.current), // Handle image insertion using the defined function
            },
          },
        },

        formats: [
          // Supported editor formats
          // "font",
          // "header",
          // "size",
          // "align",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "link",
          "image",
          "color",
          "background",
          // "indent",
          "script",
          // "blockquote",
          // "code-block",
        ],
      });

      // Set default styles for text and background
      //   const editor = quillInstance.current.root;
      //   editor.style.color = "#333"; // Default text color
      //   editor.style.backgroundColor = "#f9f9f9"; // Default background color

      // Listen for text changes and update the parent component
      quillInstance.current.on("text-change", () => {
        const content = quillInstance.current.root.innerHTML;
        onChange(content);
      });
    }
  }, [onChange]); // Initialize only once when `onChange` prop changes

  // Update editor content if the `value` prop changes
  useEffect(() => {
    if (quillInstance.current && value !== undefined) {
      const editorContent = quillInstance.current.root.innerHTML;
      if (editorContent !== value) {
        quillInstance.current.root.innerHTML = value; // Update the content if it differs
      }
    }
  }, [value]); // Runs whenever the `value` prop changes

  return <div ref={editorRef} className="isQuillEditor" />;
};

export default TextEditorUpdate;

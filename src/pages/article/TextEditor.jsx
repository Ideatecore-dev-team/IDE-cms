import { useEffect, useRef } from "react";
import Quill from "quill";

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
              [{ font: [] }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ align: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              // [{ header: [1, 2, 3, 4, 5, 6, false] }],
              // ["blockquote", "code-block"],
              // [{ script: "sub" }, { script: "super" }],
              // [{ indent: "-1" }, { indent: "+1" }],
              // [{ direction: "rtl" }],
              [{ color: [] }, { background: [] }],
            ],
            handlers: {
              image: () => {
                const imageUrl = prompt("Enter image URL");
                if (imageUrl) {
                  const range = quill.getSelection();
                  quill.insertEmbed(range.index, "image", imageUrl);
                }
              },
              // video: () => {
              //   const videoUrl = prompt("Enter video URL");
              //   if (videoUrl) {
              //     const range = quill.getSelection();
              //     quill.insertEmbed(range.index, "video", videoUrl);
              //   }
              // },
            },
          },
        },
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
      <div ref={editorRef} style={{ minHeight: "250px" }} />
    </div>
  );
};

export default TextEditor;

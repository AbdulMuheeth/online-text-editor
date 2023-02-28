import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor({value,handleValueChange}) {
  
  let modules = {
    toolbar: [
      [
        { header: "1" },
        { header: "2" },
        { header: [3, 4, 5, 6, false] },
        { font: [] },
      ],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { align: [] },
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["code-block"],
      ["clean"],
    ],
  };

  
  return (
    <ReactQuill
      theme="snow"
      value={value}
      modules={modules}
      onChange={handleValueChange}
      placeholder={"start writing..."}
    />
  );
}

export default Editor;

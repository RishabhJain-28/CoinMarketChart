import React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

// const placeholder = ,{buttonList}

const MyComponent = (props) => {
  const handleChange = (content) => {
    console.log(content);
  };
  //   console.log(buttonList);
  //   console.log(buttonList.default);
  return (
    <div>
      <p> My Other Contents </p>
      <SunEditor
        //   setContents={placeholder}
        setOptions={{
          height: 200,
          buttonList: buttonList.complex,
          // Other option
        }}
        onChange={handleChange}
      />
    </div>
  );
};
export default MyComponent;

import React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

// const placeholder = ,{buttonList}

const MyComponent = ({ content }) => {
  //   const handleChange = (content) => {
  // console.log(content);

  //   token.displayInfo = ;
  //     setDisplayInfo(content);
  //   };
  //   console.log(buttonList);
  //   console.log(buttonList.default);
  return (
    // <div dangerouslySetInnerHTML={{ __html: content }}>
    <div>
      {/* <p> My Other Contents </p> */}
      <SunEditor
        height="100%"
        //   setContents={placeholder}
        showToolbar={false}
        disable={true}
        // setOptions={
        //   {
        //     //   height: 200,
        //     //   buttonList: buttonList.complex,
        //     // Other option
        //   }
        // }
        setContents={content}
      />
    </div>
  );
};
export default MyComponent;

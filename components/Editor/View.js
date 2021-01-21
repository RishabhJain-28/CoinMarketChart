import React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// const placeholder = ,{buttonList}

const MyComponent = ({ content }) => {
  //   const handleChange = (content) => {
  // console.log(content);

  //   token.displayInfo = ;
  //     setDisplayInfo(content);
  //   };
  //   console.log(buttonList);
  //   console.log(buttonList.default);
  const theme = useTheme();
  console.log(theme.palette.background);
  return (
    // <div dangerouslySetInnerHTML={{ __html: content }}>
    <Paper className="display-info-viewer">
      {/* <p> My Other Contents </p> */}
      <SunEditor
        height="100%"
        //   setContents={placeholder}
        showToolbar={false}
        disable={true}
        // setDefaultStyle={`
        // background-color: ${theme.palette.background.paper};
        // color: ${theme.palette.text.primary};
        // `}
        // setOptions={
        //   {
        //     //   height: 200,
        //     //   buttonList: buttonList.complex,
        //     // Other option
        //   }
        // }
        setContents={content}
      />
    </Paper>
  );
};
export default MyComponent;

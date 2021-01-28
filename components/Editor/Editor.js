import React, { useCallback } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import axios from "../../util/axios";
// const placeholder = ,{buttonList}

const MyComponent = ({ setDisplayInfo }) => {
  // console.log("token", newToken);
  // const handleChange = useCallback(
  //   (content) => {
  //     console.log(content);
  //     console.log("content.length", content.length);
  //     console.log("token2", token);
  //     setDisplayInfo(content, token);
  //   },
  //   [token]
  // );
  const handleChange = (content) => {
    console.log(content);
    console.log("content.length", content.length);
    setDisplayInfo(content);
    // console.log("token2", newToken);
    // const t = { ...newTok/en };
    // t.displayInfo = content;
    // setNewToken(t);
  };

  const imageUploadHandler = (xmlHttpRequest, info, core) => {
    console.log(xmlHttpRequest, info, core);
    return `img`;
  };
  const uploadImage = async (files, uploadHandler) => {
    try {
      const [imageFile] = files;
      const formData = new FormData();
      formData.append("image", imageFile, imageFile.name);
      const { data } = await axios.post(
        "/tokens/newDisplayInfoImage",
        formData
      );
      // console.log(data);
      uploadHandler({
        // "errorMessage": "insert error message",
        result: [{ url: data.url, name: data.name, size: "999" }],
      });
      return false;
    } catch (err) {
      console.log(err); //! better error handling
      // uploadHandler({
      //   errorMessage: "insert error message",
      // });
    }
  };
  const handleImageUploadBefore = (files, info, uploadHandler) => {
    // uploadHandler is a function
    console.log("files", files);
    console.log("info", info);
    // uploadHandler();
    // return [];
    // return false;
    // const [imageFile] = files;
    // const formData = new FormData();
    // formData.append("image", imageFile, imageFile.name);
    uploadImage(files, uploadHandler);
    return false;
    // return { result: { url: "url", name: "myname.jpg", size: 27861 } };
    // console.log(uploadHandler);
  };
  const handleImageUpload = (
    targetImgElement,
    index,
    state,
    imageInfo,
    remainingFilesCount
  ) => {
    console.log("targetImgElement", targetImgElement);
    console.log("index", index);
    console.log("state", state);
    console.log("imageInfo", imageInfo);
    console.log("remainingFilesCount", remainingFilesCount);
  };
  //   console.log(buttonList);
  //   console.log(buttonList.default);
  return (
    <div>
      <p> My Other Contents </p>
      <SunEditor
        onImageUploadBefore={handleImageUploadBefore}
        onImageUpload={handleImageUpload}
        // imageUploadHandler={imageUploadHandler}
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

import "@toast-ui/editor/dist/toastui-editor.css";

import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import { postData } from "../components/http-request";
import classes from "./CreateNewChapter.module.css";
import React from "react";

const uploadImage = async (blob) => {
  const formData = new FormData();
  formData.append("image", blob);

  const responseData = await postData("img", formData);
  const responseDataUrl = await responseData.data.url;
  return responseDataUrl;
};

const CreateNewChapter = () => {
  const [chapterTitle, setChapterTitle] = useState("");
  const location = useLocation();
  const editorRef = useRef();
  const bearerToken = localStorage.getItem("tokenId");

  const handleChangeEditor = async () => {
    const currentContent = editorRef.current.getInstance().getMarkdown();
    const sumLength = currentContent.length;
    const getImageIndexArray = [];

    // 일러스트 위치 정보 꺼내기
    for (let idx = 0; idx < sumLength; idx++) {
      const findImageIndex = currentContent.indexOf("![alt text]", idx);
      if (findImageIndex === -1) break;
      getImageIndexArray.push(findImageIndex);
      idx = findImageIndex;
    }

    // 정보 보내기
    await postData(
      `upload/chapter`,
      {
        title: chapterTitle,
        novelId: location.state.novelId,
        price: 10000,
        content: currentContent,
      },
      bearerToken
    );
  };

  const submitHandler = async () => {};

  return (
    <div className={classes.chapter}>
      <h1>챕터 작성하기</h1>
      <form onSubmit={submitHandler}>
        <div style={{ margin: "10px", textAlign: "center" }}>
          <label
            htmlFor="chapterTitle"
            style={{ marginRight: "10px", fontSize: "20px" }}
          >
            챕터명
          </label>
          <input
            id="chapterTitle"
            type="text"
            onChange={(event) => setChapterTitle(event.target.value)}
          />
        </div>
        <Editor
          initialEditType="wysiwyg"
          usageStatistics={false}
          previewStyle="tab"
          height="600px"
          useCommandShortcut={true}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const img_url = await uploadImage(blob);
              callback(img_url, "alt text");
              return false;
            },
          }}
          ref={editorRef}
        />
        <div id="toastUIEditor">
          <div id="button" className={classes.chapterBtn}>
            <Link
              to={`/mypage`}
              state={{
                title: location.state.title,
                novelId: location.state.novelId,
              }}
            >
              <button
                type="submit"
                className={`btn-save ${classes.BtnRegister}`}
                onClick={handleChangeEditor}
              >
                챕터 등록하기
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewChapter;

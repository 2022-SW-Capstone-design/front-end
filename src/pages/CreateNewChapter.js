import { useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { postData } from "../components/http-request";
import classes from "./CreateNewChapter.module.css";
import axios from "axios";
import React from "react";

const uploadImage = async (blob) => {
  const formData = new FormData();
  formData.append("image", blob);

  const responseData = await postData("img", formData);
  const responseDataUrl = await responseData.data.url;
  return responseDataUrl;
};

const CreateNewChapter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [chapterTitle, setChapterTitle] = useState("");
  const [readTrue, setReadTrue] = useState(false);
  const [content, setContent] = useState("");
  const location = useLocation();
  const editorRef = useRef();
  const chapterNo = searchParams.get("chapterNo");

  const data = location.state;
  const bearerToken = localStorage.getItem("bearerToken");

  const handleChangeEditor = async () => {
    const regExp = /!\[alt text\]\((?:https?:\/\/([a-zA-Z0-9/.:]{2,256}))\)/g;
    const currentContent = editorRef.current.getInstance().getMarkdown();
    const sumLength = currentContent.length;
    const getImageIndexArray = [];

    // 정규표현식이 제대로 작동되고 있는 지 확인해보기

    // 일러스트 위치 정보 꺼내기
    for (let idx = 0; idx < sumLength; idx++) {
      const findImageIndex = currentContent.indexOf("![alt text]", idx);
      if (findImageIndex === -1) break;
      getImageIndexArray.push(findImageIndex);
      idx = findImageIndex;
    }
  };

  const submitHandler = async () => {};

  return (
    <div className={classes.chapter}>
      <h1>소설 작성하기</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="chapterTitle">챕터명</label>
          <input
            id="chapterTitle"
            type="text"
            onChange={(event) => setChapterTitle(event.target.value)}
          />
        </div>
        <Editor
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
          <div id="button">
            <Link
              to={`/novel-list/writer/novel/${location.state.title}`}
              state={{
                title: location.state.title,
                novelId: location.state.novelId,
              }}
            >
              <button
                type="submit"
                className="btn-save"
                onClick={handleChangeEditor}
              >
                챕터 등록하기
              </button>
            </Link>

            {/* {readTrue && <Viewer initialValue={content} />} */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewChapter;

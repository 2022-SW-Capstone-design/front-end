import { Editor } from "@toast-ui/react-editor";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  getData,
  postData,
  postDataByForm,
} from "../../components/http-request";
import classes from "./ToastUIEditor.module.css";

const ToastUIEditor = () => {
  const [initContent, setInitContent] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const location = useLocation();
  const bearerToken = localStorage.getItem("tokenId");
  const { novelId, chapterId } = location.state;
  const editorRef = useRef("");
  const imageURLData = [];
  const imageIdxData = [];

  const uploadImage = async (blob) => {
    const formData = new FormData();
    formData.append("image", blob);

    // 서버로부터 이미지 주소 받아옴
    const responseData = await postDataByForm(
      "upload/img",
      formData,
      bearerToken
    );
    const getImageURLData = await responseData.url;
    imageURLData.push(getImageURLData);

    return getImageURLData;
  };

  const handleChangeEditor = async () => {
    const currentContent = editorRef.current.getInstance().getMarkdown();
    const sumLength = currentContent.length;

    // 일러스트 위치 정보 꺼내기
    for (let idx = 0; idx < sumLength; idx++) {
      const findImageIndex = currentContent.indexOf("![alt text]", idx);
      if (findImageIndex === -1) break;
      imageIdxData.push(findImageIndex);
      idx = findImageIndex;
    }

    // 일러스트 데이터 넣기
    const imgURLs = imageURLData.map((urlValue, idxValue) => {
      return {
        url: urlValue,
        index: imageIdxData[idxValue],
      };
    });

    await postData(
      "upload/illust",
      {
        novelId,
        chapterId,
        imgURLs,
        price: 20000,
      },
      bearerToken
    );
  };

  useEffect(() => {
    const getNovelDataFromServer = async () => {
      const responseData = await getData(
        `content/novel/${novelId}/chapter/${chapterId}`,
        bearerToken
      );

      const content = await responseData.chapterContent;
      setInitContent(content);
    };

    getNovelDataFromServer();
  }, []);

  return (
    <>
      {!initContent && <h3>소설을 로딩하고 있는 중입니다...</h3>}
      {initContent && (
        <Editor
          usageStatistics={false}
          previewStyle="tab"
          height="600px"
          useCommandShortcut={true}
          initialValue={initContent}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              setLoadingImage(true);
              console.log("이미지 로딩중...");

              const img_url = await uploadImage(blob);
              callback(img_url, "alt text");

              setLoadingImage(false);
              console.log("이미지 로딩 완료!");

              return false;
            },
          }}
          ref={editorRef}
        />
      )}
      <Link to={`mypage`}>
        <button
          onClick={handleChangeEditor}
          className={classes.ToastUIEditorBtn}
        >
          챕터 등록하기
        </button>
      </Link>
    </>
  );
};

export default ToastUIEditor;

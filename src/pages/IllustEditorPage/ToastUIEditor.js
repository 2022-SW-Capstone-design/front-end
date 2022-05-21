import { Editor } from '@toast-ui/react-editor';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const ToastUIEditor = () => {
  const [initContent, setInitContent] = useState('');
  const location = useLocation();
  const bearerToken = localStorage.getItem('bearerToken');
  const { novelId, chapterId, title } = location.state;
  const editorRef = useRef('');

  const api = "http://localhost:8081/upload/img";
  const imageURLData = [];
  const imageIdxData = [];

  const uploadImage = async (blob) => {
    console.log(blob);
    const formData = new FormData();
    formData.append("image", blob);
  
    // 서버로부터 이미지 주소 받아옴
    const responseData = await axios.post(api, formData);
    const getImageURLData = await responseData.data.url;
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
      }
    })

    const finalIllustDataToSendServer = {
      novelId, 
      chapterId, 
      imgURLs, 
      price: 20000
    }

    // 데이터를 서버로 보내기  
    const responseData = await axios.post(`http://localhost:8081/upload/illust`, finalIllustDataToSendServer, {
      headers: {
        authorization: `Bearer ${bearerToken || ""}`,
      }
    }, {
      credentials: "same-origin",
    });

    console.log(responseData);
  };

  useEffect(() => {
    const getNovelDataFromServer = async () => {
      const responseData = await axios.get(`http://localhost:8081/content/novel/${novelId}/chapter/${chapterId}`, {
        headers: {
          authorization: `Bearer ${bearerToken || ""}`,
        }
      },{
        credentials: "same-origin",
      })
      const content = await responseData.data.chapterContent;
      setInitContent(content);
    };

    getNovelDataFromServer();
  }, []);

  return (
    <>
      {!initContent && <h3>소설을 로딩하고 있는 중입니다...</h3>}
      {initContent && <Editor
        usageStatistics={false}
        previewStyle="tab"
        height="600px"
        useCommandShortcut={true}
        initialValue={initContent}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const img_url = await uploadImage(blob);
            callback(img_url, "alt text");
            return false;
          },
        }}
        ref={editorRef}
      />}
      <Link to={`/mypage`}>
        <button className="btn-save" onClick={handleChangeEditor}>
          챕터 등록하기
        </button>
      </Link>
    </>

  )
}

export default ToastUIEditor;
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import NavigationBar from "../../components/NavigationBar";
import WriterChapterItem from './WriterChapterItem';


// /info/novel/:novelId

const WriterChapter = () => {
  const [novelData, setNovelData] = useState();
  const [chapterData, setChapterData] = useState();
  const [loadingData, setLoadingData] = useState("로딩중입니다");
  // 데이터를 가져오는 작업
  const location = useLocation();
  const data = location.state;
  const bearerToken = localStorage.getItem("bearerToken");

  useEffect(() => {
    const getNovelDataFromNovelId = async () => {
      const response = await axios.get(`http://localhost:8081/info/novel/${data.novelId}`, {
        credentials: "same-origin",
      });
      const responseData = await response.data;
      setNovelData(responseData);
    };

    const getChapterDataFromNovelId = async () => {
      const response = await axios.get(`http://localhost:8081/list/novel/${data.novelId}`, {
        headers: {
          authorization: `Bearer ${bearerToken || ""}`,
        }
      },{
        credentials: "same-origin",
      });
      const responseData = await response.data;
      setChapterData(responseData);
    };

    setTimeout(() => {
      getNovelDataFromNovelId();
      getChapterDataFromNovelId();
    }, 500);
  }, []);



  const state =
    location.state || JSON.parse(localStorage.getItem("currentNovel"));
  if (location.state)
    localStorage.setItem("currentNovel", JSON.stringify(location.state));

  return (
    <>
      <NavigationBar />
      {!chapterData && <h1>로딩중입니다</h1>}
      {
        (!!chapterData && !!chapterData.chapters.length) &&
        <>
          <div>
            <h1>
              챕터 목록
            </h1>
            <ul>
              {chapterData.chapters.map((chapterObj, idx) => <WriterChapterItem value={[chapterObj, idx, state.title]} key={idx}/>)}
            </ul>
          </div>
        </>
      }
      {
        (chapterData && !chapterData.chapters.length) && 
        <>        
          <h1>현재 챕터가 존재하지 않습니다 :(</h1>
          <p>챕터 작성을 진행해 주세요!</p>
        </>
      }
      <Link
        to={`/novel-list/writer/novel/editor/${state.title}`}
        state={{
          title: data.title,
          novelId: data.novelId,
        }}
      >
        <button>챕터 작성하기</button>
      </Link>
    </>
  );
};

export default WriterChapter;

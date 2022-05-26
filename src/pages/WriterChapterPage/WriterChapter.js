import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavigationBar from "../../components/NavigationBar";
import WriterChapterItem from "./WriterChapterItem";
import { getData } from "../../components/http-request";
import classes from "./WriterChapter.module.css";

// /info/novel/:novelId

const WriterChapter = () => {
  const [novelData, setNovelData] = useState();
  const [chapterData, setChapterData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  // 데이터를 가져오는 작업
  const location = useLocation();
  const data = location.state;
  const bearerToken = localStorage.getItem("tokenId");

  useEffect(() => {
    const getNovelDataFromNovelId = async () => {
      const response = await getData(`info/novel/${data.novelId}`, bearerToken);
      const responseData = await response.data;
      setNovelData(responseData);
    };

    const getChapterDataFromNovelId = async () => {
      const response = await getData(`list/novel/${data.novelId}`, bearerToken);
      const responseData = await response.data;
      setChapterData(responseData);
    };

    setLoadingData(true);

    setTimeout(() => {
      getNovelDataFromNovelId();
      getChapterDataFromNovelId();
      setLoadingData(false);
    }, 500);
  }, [data.novelId, bearerToken]);

  console.log(novelData, chapterData);

  const state =
    location.state || JSON.parse(localStorage.getItem("currentNovel"));
  if (location.state)
    localStorage.setItem("currentNovel", JSON.stringify(location.state));

  return (
    <>
      <NavigationBar />
      <div className={classes.WriterChapter}>
        {!chapterData && loadingData && <h1>로딩중입니다</h1>}
        {!!chapterData && (
          <>
            <div>
              <h1>챕터 목록</h1>
              <ul>
                {chapterData?.chapters?.map((chapterObj, idx) => (
                  <WriterChapterItem
                    value={[chapterObj, idx, state.title]}
                    key={idx}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
        {!chapterData && !chapterData?.chapters?.length && !loadingData && (
          <>
            <h1>현재 챕터가 존재하지 않습니다 :(</h1>
            <p>챕터 작성을 진행해 주세요!</p>
          </>
        )}
        <Link
          to={`/novel-list/writer/novel/editor/${state.title}`}
          state={{
            title: data.title,
            novelId: data.novelId,
          }}
        >
          <button>챕터 작성하기</button>
        </Link>
      </div>
    </>
  );
};

export default WriterChapter;

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
      setNovelData(response);
    };

    const getChapterDataFromNovelId = async () => {
      const response = await getData(`list/novel/${data.novelId}`, bearerToken);
      setChapterData(response);
    };

    setLoadingData(true);
    getNovelDataFromNovelId();
    getChapterDataFromNovelId();
    setLoadingData(false);
  }, [data.novelId, bearerToken]);

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
          <div className={classes.WriterChapter__contents}>
            <h1>챕터 목록</h1>
            <ul className={classes.WriterChapter__ul}>
              {chapterData?.chapters?.map((chapterObj, idx) => (
                <WriterChapterItem
                  value={[chapterObj, idx, state.title]}
                  key={idx}
                  purchased={chapterData.chapters[0].isPurchased}
                />
              ))}
            </ul>
          </div>
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
          <button className={classes["Btn--upload-chapter"]}>
            챕터 작성하기
          </button>
        </Link>
      </div>
    </>
  );
};

export default WriterChapter;

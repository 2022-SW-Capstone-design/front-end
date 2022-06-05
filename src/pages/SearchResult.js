import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDataWithUserID } from "../components/http-request";
import NovelContainer from "../components/NovelContainer";

const SearchResult = () => {
  const [novelList, setNovelList] = useState(null);
  const location = useLocation();
  const { searchData } = location.state;
  const userId = searchData?.User_id;

  useEffect(() => {
    const getSearchDataFromServer = async () => {
      const responseData = await getDataWithUserID(
        `search/novel?type=title&keyword=${searchData}`,
        userId
      );
      const responseDataNovels = await responseData.novels;
      setNovelList(responseDataNovels);
    };

    getSearchDataFromServer();
  }, []);

  return (
    <>
      {!novelList && <h1>로딩중입니다...</h1>}
      {!!novelList && (
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>검색 결과 페이지</h1>
          <NovelContainer novelListData={novelList} />
        </div>
      )}
    </>
  );
};

export default SearchResult;

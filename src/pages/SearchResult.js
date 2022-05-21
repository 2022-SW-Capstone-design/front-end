import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { getData } from "../components/http-request";
import NovelContainer from "../components/NovelContainer";

const SearchResult = () => {
  const [novelList, setNovelList] = useState(null);
  const location = useLocation();
  const { searchData } = location.state;

  useEffect(() => {
    const getSearchDataFromServer = async () => {
      const responseData = await getData(`search/novel?type=title&keyword=${searchData}`);
      const responseDataNovels = await responseData.novels;
      setNovelList(responseDataNovels);
    };

    getSearchDataFromServer();
  }, []);

  return <>
  {!novelList && <h1>로딩중입니다...</h1>}
  {!!novelList && <>
    <h1>검색 결과 페이지</h1>
    <NovelContainer novelListData={novelList} />
  </>
  }
  </>
  
};

export default SearchResult;

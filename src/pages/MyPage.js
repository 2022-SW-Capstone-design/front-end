import { useEffect, useState } from "react";
import { getData } from "../components/http-request";
import NavigationBar from "../components/NavigationBar";
import GlobalStyle from "../GlobalStyle";
import CurrentPoint from "../components/CurrentPoint";
import "./MyPage.css";
import NovelContainer from "../components/NovelContainer";

const MyPage = () => {
  const bearerToken = localStorage.getItem("tokenId");
  const [data, setData] = useState(null);

  useEffect(() => {
    const getWrittenNovelsData = async () => {
      const response = await getData("written/novel", bearerToken);
      setData(response);
    };

    setTimeout(() => {
      getWrittenNovelsData();
    }, 1000);
  }, []);

  return (
    <>
      <GlobalStyle />
      <NavigationBar />
      <h1>마이페이지</h1>
      <br />
      {/* <Card/> */}
      <br />
      {!data && <h1 className="loading">로딩중입니다...</h1>}
      {data && (
        <div>
          <CurrentPoint />
          <br />
          <br />
          <div className="novel_list">
            <h3>내가 쓴 소설 목록</h3>
            <NovelContainer title="내가 쓴 소설 목록" novelListData={data} />
          </div>
          {/* <table className="novel_table">
          <tbody>
            <tr>
              <td><div className="novel_box"><Link className="novel_title" to="/novel-list/novel/harrypotter">해리포터</Link></div></td>
              <td><div className="novel_box"><Link className="novel_title" to="/novel-list/novel/gameofthrones">왕좌의 게임</Link></div></td>
              <td><div className="novel_box"><Link className="novel_title" to="/novel-list/writer/novel">소설2</Link></div></td>
            </tr>
            <tr>
              <td><div className="novel_box"><Link className="novel_title"  to="/novel-list/novel/harrypotter">해리포터</Link></div></td>
              <td><div className="novel_box"><Link className="novel_title"  to="/novel-list/novel/gameofthrones">왕좌의 게임</Link></div></td>
              <td><div className="novel_box"><Link className="novel_title"  to="/novel-list/writer/novel">소설2</Link></div></td>
            </tr>
            <tr>
              <td><div className="novel_box"><Link className="novel_title"  to="/novel-list/novel/harrypotter">해리포터</Link></div></td>
              <td><div className="novel_box"><Link className="novel_title"  to="/novel-list/novel/gameofthrones">왕좌의 게임</Link></div></td>
              <td><div className="novel_box"><Link className="novel_title"  to="/novel-list/writer/novel">소설2</Link></div></td>
            </tr>
          </tbody>
        </table> */}
        </div>
      )}
    </>
  );
};

export default MyPage;

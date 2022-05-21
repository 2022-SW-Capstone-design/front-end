import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getData } from '../components/http-request';
import NavigationBar from "../components/NavigationBar";
import GlobalStyle from "../GlobalStyle";
import CurrentPoint from "../components/CurrentPoint";
import NovelList from "../components/NovelList";
import userAccount from "../components/userAccount";
import "./MyPage.css"
import Card from "../UI/Card"
import NovelContainer from "../components/NovelContainer";

const MyPage = () => {
  const bearerToken = localStorage.getItem('bearerToken');
  const [data, setData] = useState(null);

  useEffect(() => {
    const getWrittenNovelsData = async () => {
      const response = await axios.get(`http://localhost:8081/written/novel`, {
          headers: {
            Authorization: `Bearer ${bearerToken || ""}`,
          },
          credentials: "same-origin",
        });
      const resData = await response.data;     
      setData(resData);
    }

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
      {data && <div>
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
      }
      
    </>
  );
};

export default MyPage;

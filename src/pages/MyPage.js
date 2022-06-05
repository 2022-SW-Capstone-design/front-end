import { useEffect, useState } from "react";
import { getData } from "../components/http-request";
import NavigationBar from "../components/NavigationBar";
import GlobalStyle from "../GlobalStyle";
import "./MyPage.css";
import NovelContainer from "../components/NovelContainer";
import classes from "./MyPage.module.css";

const MyPage = () => {
  const bearerToken = localStorage.getItem("tokenId");
  const [myWrittenNoveldata, setMyWrittenNovelData] = useState(null);
  const [myPurchasedNovelData, setMyPurchasedNovelData] = useState(null);
  const [remainCoin, setRemainCoin] = useState(null);

  useEffect(() => {
    const getWrittenNovelsData = async () => {
      const response = await getData("written/novel", bearerToken);
      setMyWrittenNovelData(response);
    };

    const getPurchasedNovelData = async () => {
      const response = await getData("purchased/novel", bearerToken);
      setMyPurchasedNovelData(response);
    };

    const getUserData = async () => {
      const response = await getData("info/user", bearerToken);
      setRemainCoin(response.coin);
    };
    setTimeout(() => {
      getWrittenNovelsData();
      getPurchasedNovelData();
      getUserData();
    }, 1000);
  }, []);

  return (
    <>
      <GlobalStyle />
      <NavigationBar />
      <div className={classes.MyPage}>
        <h1 style={{ fontSize: "50px", color: "#0b2b22" }}>마이페이지</h1>
        <br />
        <br />
        {!myWrittenNoveldata && !myPurchasedNovelData && (
          <h1 className="loading">로딩중입니다</h1>
        )}
        {myWrittenNoveldata && (
          <div className={classes.MyPage__contents}>
            <h2>{`현재 코인: ${remainCoin}`}</h2>
            <br />
            <br />
            <div className="novel_list">
              <h3>내가 쓴 소설 목록</h3>
              <NovelContainer
                title="내가 쓴 소설 목록"
                novelListData={myWrittenNoveldata}
                state={{ written: true }}
              />
            </div>
          </div>
        )}
        {myPurchasedNovelData && (
          <div className={classes.MyPage__contents}>
            <div className="novel_list">
              <h3>구매한 소설 목록</h3>
              <NovelContainer
                novelListData={myPurchasedNovelData}
                isWritten={false}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyPage;

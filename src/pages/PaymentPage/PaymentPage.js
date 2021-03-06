import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getData, postData } from "../../components/http-request";
import classes from "./PaymentPage.module.css";
import { useNavigate } from "react-router-dom";

// '/purchasing'

const PaymentPage = () => {
  const [coinData, setCoinData] = useState();
  const location = useLocation();
  const state = location.state;
  const { novelId, chapterId, paymentPrice, contentType, contentId } = state;
  const paymentPoint = state.paymentPrice;
  const currentMyPoint = 20000;
  const remainPoint = currentMyPoint - paymentPrice;
  const bearerToken = localStorage.getItem("tokenId");
  const navigate = useNavigate();

  const paymentHandler = async () => {
    await postData(
      "purchasing",
      {
        purchasingSets: [
          {
            novelId,
            chapterId,
            contentType,
            contentId: contentId,
            price: paymentPrice,
          },
        ],
      },
      bearerToken
    );

    navigate.goBack();
  };

  useEffect(() => {
    const bearerToken = localStorage.getItem("tokenId");
    const getCoinDataFromServer = async () => {
      const response = await getData(`info/user`, bearerToken);
      const coin = response.coin;
      setCoinData(coin);
    };

    getCoinDataFromServer();
  }, []);

  return (
    <div className={classes.PaymentPage}>
      <h1 style={{ marginBottom: "50px" }}>결제하기</h1>
      <h3>현재 코인: {coinData}</h3>
      <h3>결제 코인: {paymentPoint}</h3>
      <div className={classes.PaymentPage__line}></div>
      <h3
        className={
          classes[
            `${remainPoint >= 0 ? "PaymentPage--pass" : "PaymentPage--alert"}`
          ]
        }
      >
        남은 코인: {coinData - paymentPoint}
      </h3>
      <div className={classes.PaymentPage__result}>
        {coinData - paymentPoint < 0 && (
          <p style={{ color: "red" }}>
            현재 코인 잔액이 부족합니다. 충전 후 다시 시도해주세요
          </p>
        )}
        {coinData - paymentPoint >= 0 && (
          <Link to="/mypage">
            <button className={classes.PaymentBtn} onClick={paymentHandler}>
              결제하기
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;

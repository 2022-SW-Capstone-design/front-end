import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { postData } from "../../components/http-request";
import classes from "./PaymentPage.module.css";

// '/purchasing'

const PaymentPage = () => {
  const location = useLocation();
  const state = location.state;
  const { novelId, chapterId, paymentPrice } = state;
  const paymentPoint = state.paymentPrice;
  const currentMyPoint = 20000;
  const remainPoint = currentMyPoint - paymentPrice;
  const bearerToken = localStorage.getItem("tokenId");

  const paymentHandler = async () => {
    const response = await postData(
      "purchasing",
      {
        purchasingSets: [
          {
            novelId,
            chapterId,
            contentType: "chapter",
            contentId: null,
            price: paymentPrice,
          },
        ],
      },
      bearerToken
    );
  };

  useEffect(() => {}, []);

  return (
    <div className={classes.PaymentPage}>
      <h1 style={{ marginBottom: "50px" }}>결제하기</h1>
      <h3>현재 포인트: {currentMyPoint}</h3>
      <h3>결제 포인트: {paymentPoint}</h3>
      <div className={classes.PaymentPage__line}></div>
      <h3
        className={
          classes[
            `${remainPoint >= 0 ? "PaymentPage--pass" : "PaymentPage--alert"}`
          ]
        }
      >
        남은 포인트: {remainPoint}
      </h3>
      <div className={classes.PaymentPage__result}>
        {currentMyPoint < paymentPoint && (
          <p style={{ color: "red" }}>
            현재 포인트 잔액이 부족합니다. 충전 후 다시 시도해주세요
          </p>
        )}
        {currentMyPoint >= paymentPoint && (
          <button className={classes.PaymentBtn} onClick={paymentHandler}>
            결제하기
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;

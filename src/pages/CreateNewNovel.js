import DefaultImageSelectModal from "../components/DefaultImageSelectModal";
import React, { useState, useReducer, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import { postData } from "../components/http-request";
import userAccount from "../components/userAccount";
import { Button } from "react-bootstrap";
import "./CreateNewNovel.css";
import classes from "./CreateNewNovel.module.css";

const reducer = (state, action) => {
  if (action.type === "TITLE") {
    return { ...state, title: action.value.trim() };
  }
  if (action.type === "GENRE") {
    return { ...state, genre: action.value };
  }
  if (action.type === "IMAGE") {
    return { ...state, coverImage: JSON.stringify(action.value) };
  }
  return {
    title: "",
    genre: "판타지",
    novelDescription: "",
  };
};

const CreateNewNovel = () => {
  const [imageModal, setImageModal] = useState(false);

  const descriptionValue = useRef(null);
  const navigate = useNavigate();
  const [currentData, changeCurrentData] = useReducer(reducer, {
    title: "",
    description: "",
    genre: "판타지",
    defaultPrice: 1000,
    coverImage: null,
  });

  const showImageModalHandler = (e) => {
    e.preventDefault();
    setImageModal(true);
  };

  const handleSubmit = async () => {
    const submitData = {
      ...currentData,
      description: descriptionValue.current.value,
    };

    const bearerToken = localStorage.getItem("tokenId");

    await postData("upload/novel", submitData, bearerToken);
    userAccount.writingNovelList.push(submitData);
    navigate("/mypage");
  };

  return (
    <div style={{ position: "relative" }}>
      {imageModal && <div className={classes.ModalBackground}></div>}
      <GlobalStyle />
      <div className={classes.Container}>
        <h1>소설 작성하기</h1>
        <br />
        <br />
        <form className="write_form" onSubmit={handleSubmit}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            onChange={(e) =>
              changeCurrentData({ type: "TITLE", value: e.target.value })
            }
          />
          <br />
          <br />
          <label htmlFor="genre">장르</label>
          <select
            id="genre"
            onChange={(e) =>
              changeCurrentData({ type: "GENRE", value: e.target.value })
            }
          >
            <option value="판타지">판타지</option>
            <option value="현대 판타지">현대 판타지</option>
            <option value="로맨스 판타지">로맨스 판타지</option>
            <option value="역사 판타지">역사 판타지</option>
            <option value="SF">SF</option>
            <option value="무협">무협</option>
            <option value="라이트 노벨">라이트 노벨</option>
            <option value="미스터리">미스터리</option>
          </select>
          <br />
          <br />
          <label className="novel_intro" htmlFor="description">
            작품 소개
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            cols="33"
            placeholder="여기에 작품 소개를 적어주세요"
            ref={descriptionValue}
          />
          <br />
          <br />

          <Button
            className={`img_regist ${classes["Btn-img"]}`}
            variant="Dark"
            type="button"
            onClick={showImageModalHandler}
            style={{ transition: "0.2s all" }}
          >
            이미지 업로드하기
          </Button>
          {imageModal && (
            <DefaultImageSelectModal
              modalOpen={setImageModal}
              selectNovelImg={changeCurrentData}
            />
          )}
          <div className="button_bundle">
            <Link to="/mypage">
              <Button
                className={`cancel ${classes["Btn"]}`}
                variant="secondary"
              >
                취소
              </Button>
            </Link>
            <Button
              className={`novel_regist ${classes["Btn"]} ${classes["Btn-upload"]}`}
              variant="Dark"
              type="submit"
              onClick={() => {
                handleSubmit();
                navigate("/mypage");
              }}
              disabled={
                !currentData.title || !currentData.coverImage ? true : false
              }
            >
              소설 올리기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewNovel;

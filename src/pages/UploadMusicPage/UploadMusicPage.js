import { useState } from "react";
import { postData } from "../../components/http-request";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./UploadMusicPage.module.css";

const UploadMusicPage = () => {
  const [uploadedMusic, setUploadedMusic] = useState(null);
  const [musicTitle, setMusicTitle] = useState(null);
  const bearerToken = localStorage.getItem("tokenId");
  const location = useLocation();
  const state = location.state;

  const onFileChange = (event) => {
    setUploadedMusic({
      selectedMusic: event.target.files[0],
    });
  };

  const musicTitleChangeHandler = (event) => {
    setMusicTitle(event.target.value);
  };

  const uploadMusicHandler = async () => {
    const formData = new FormData();
    formData.append(
      "musicFile",
      uploadedMusic?.selectedMusic,
      uploadedMusic?.selectedMusic.name
    );
    formData.append("novelId", state.novelId);
    formData.append("chapterId", state.chapterId);
    formData.append("price", 1000);
    formData.append("title", musicTitle);

    await postData("upload/music", formData, bearerToken);
  };

  return (
    <div className={classes.UploadMusicPage}>
      <h1>음악 업로드하기</h1>
      <h3>업로드하고자 하는 음악을 올려주세요!</h3>
      <form className={classes.UploadMusicPage__form}>
        <div className={classes.UploadMusicPageFormLabel}>
          <label htmlFor="music-title">음악 제목</label>
          <input
            id="music-title"
            type="text"
            name="name"
            onChange={musicTitleChangeHandler}
            required
          />
        </div>
        <div className={classes.UploadMusicPagePutImgBtn}>
          <input type="file" onChange={onFileChange} />
        </div>
      </form>
      <Link to="/mypage">
        <button
          className={classes["UploadMusicPage__uploadBtn"]}
          onClick={uploadMusicHandler}
        >
          음악 업로드
        </button>
      </Link>
    </div>
  );
};

export default UploadMusicPage;

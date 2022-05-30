import ReactDOM from "react-dom";
import { useState } from "react";
import Card from "../UI/Card";
import classes from "./DefaultImageSelectModal.module.css";
import "./DefaultImageSelectModal.css";

const DefaultImageSelectModal = ({ modalOpen, selectNovelImg }) => {
  const [imageSelected, setImageSelected] = useState(false);
  const [currentSelectedImageId, setCurrentSelectedImageId] = useState(null);

  const imgList = [
    {
      src: "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_960_720.jpg",
      id: 1,
    },
    {
      src: "https://i.pinimg.com/564x/4e/88/c9/4e88c9acde9a24c83bb6b70f73dc973e.jpg",
      id: 2,
    },
    {
      src: "https://cdn-magazine.notefolio.net/files/42/10842-6044-17_cont",
      id: 3,
    },
    {
      src: "https://inspirationhut.net/wp-content/uploads/2018/02/Kuri2.jpg",
      id: 4,
    },
  ];

  const imageSelectedHandler = (id) => {
    setCurrentSelectedImageId(id);
    setImageSelected(true);
  };

  const addImageDataInNovelData = (event) => {
    event.preventDefault();
    const selectedImageID = imgList.find(
      (img) => img.id === currentSelectedImageId
    );
    selectNovelImg({ type: "IMAGE", value: selectedImageID });

    modalOpen(false);
  };

  const removeImageDataInNovelData = (event) => {
    event.preventDefault();

    const imgList = document.querySelectorAll("li");
    imgList.forEach((el) => el.classList.remove("active"));

    selectNovelImg({
      type: "IMAGE",
      value: "",
    });

    setCurrentSelectedImageId(null);
    setImageSelected(false);
  };

  return ReactDOM.createPortal(
    <Card>
      <div className={classes.DefaultImageSelectModal}>
        <header className={classes.DefaultImageSelectModal__header}>
          <h1>이미지 선택하기</h1>
        </header>
        <main>
          <ul
            className={classes.DefaultImageSelectModal__image}
            style={{ listStyle: "none" }}
          >
            {imgList.map((image, idx) => {
              return (
                <li
                  key={idx}
                  className={`${
                    currentSelectedImageId === image.id ? "active" : ""
                  }`}
                >
                  <img
                    src={image.src}
                    alt={`default-img ${idx}`}
                    onClick={() => imageSelectedHandler(image.id)}
                    style={{
                      height: "160px",
                      width: "160px",
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </main>
        <footer style={{ marginTop: "30px" }}>
          <button
            disabled={!imageSelected}
            onClick={addImageDataInNovelData.bind(this)}
            className={`${classes.DefaultImageSelectModal__Btn} ${classes["DefaultImageSelectModal__Btn--select"]}`}
          >
            선택하기
          </button>
          <button
            onClick={removeImageDataInNovelData.bind(this)}
            className={`${classes.DefaultImageSelectModal__Btn} ${classes["DefaultImageSelectModal__Btn--cancel"]}`}
          >
            취소
          </button>
        </footer>
      </div>
      ,
    </Card>,
    document.getElementById("select-image-modal")
  );
};

export default DefaultImageSelectModal;

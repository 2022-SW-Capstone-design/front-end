import { useCallback } from "react";
import { Link } from "react-router-dom";
import classes from "./WriterChapter.module.css";
import { useNavigate } from "react-router-dom";

const WriterChapterItem = ({ value, purchased }) => {
  const navigate = useNavigate();
  const goToSelectIllustMusicPageHandler = useCallback(
    (event) => {
      const localName = event.target.localName;
      if (localName !== "button") {
        navigate(`/novel-list/novel/${value[0].id}/select`, {
          replace: true,
          state: {
            novelId: value[0].Novel_id,
            chapterId: value[0].id,
            title: value[0].title,
          },
        });
      }
    },
    [navigate, value]
  );

  console.log(value);

  return (
    <li
      className={classes.WriterChapterItem}
      onClick={goToSelectIllustMusicPageHandler}
    >
      <h3>{`${value[1] + 1}화 - ${value[0].title}`}</h3>
      {!!purchased && (
        <div className={classes.WriterChapterItem__Btns}>
          <Link
            to={`/novel-list/novel/${value[0].id}/add-illust`}
            state={{
              novelId: value[0].Novel_id,
              chapterId: value[0].id,
              title: value[2],
            }}
          >
            <button className={classes.Btn}>일러스트 추가</button>
          </Link>
          <Link
            to={`/novel-list/novel/${value[0].id}/add-music`}
            state={{
              novelId: value[0].Novel_id,
              chapterId: value[0].id,
              title: value[2],
            }}
          >
            <button className={classes.Btn}>음악 추가</button>
          </Link>
        </div>
      )}
      {!purchased && (
        <div className={classes.WriterChapterItem__Btns}>
          <Link
            to={`/novel-list/novel/${value[0].id}/payment`}
            state={{
              novelId: value[0].Novel_id,
              chapterId: value[0].id,
              paymentPrice: value[0].price,
            }}
          >
            <button className={classes.Btn}>챕터 구매</button>
          </Link>
        </div>
      )}
    </li>
  );
};

export default WriterChapterItem;

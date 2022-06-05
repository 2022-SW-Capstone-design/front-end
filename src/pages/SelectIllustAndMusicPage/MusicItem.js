import classes from "./MusicItem.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const MusicItem = ({
  data,
  onSelect,
  musicId,
  checked,
  isPurchased,
  novelId,
  chapterId,
  price,
  enableHandler,
  disableHandler,
}) => {
  useEffect(() => {
    checked && !!isPurchased && enableHandler();
    checked && !isPurchased && disableHandler();
  }, [checked, isPurchased, enableHandler, disableHandler]);

  console.log(novelId, chapterId);

  return (
    <div
      className={`${classes.MusicItem} ${
        checked ? `${classes["MusicItem--selected"]}` : ""
      } ${
        !isPurchased && checked
          ? `${classes["MusicItem--selected--alert"]}`
          : ""
      }`}
    >
      <h5 onClick={() => onSelect(musicId)}>{data.title}</h5>
      {!isPurchased && checked && (
        <Link
          to={`/novel-list/novel/${chapterId}/payment`}
          state={{
            novelId: novelId,
            chapterId: chapterId,
            paymentPrice: price,
            contentType: "music",
            contentId: musicId,
          }}
        >
          <button className={classes.MusicItem__btn}>구매</button>
        </Link>
      )}
    </div>
  );
};

export default MusicItem;

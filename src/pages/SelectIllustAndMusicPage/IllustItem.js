import classes from "./IllustItem.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const IllustItem = (props) => {
  const purchased = props.isPurchased;
  const enableHandler = props.enableHandler;
  const disableHandler = props.disableHandler;

  useEffect(() => {
    props.checked && !!purchased && enableHandler();
    props.checked && !purchased && disableHandler();
  }, [props.checked, purchased, enableHandler, disableHandler]);

  return (
    <div style={{ display: "relative" }}>
      <div
        className={`${classes.IllustItem} ${
          props.checked &&
          !!purchased &&
          `${classes["IllustItem--selected--purchased"]}`
        } ${
          props.checked &&
          !purchased &&
          `${classes["IllustItem--selected--not-purchased"]}`
        }`}
        onClick={() => props.onSelect(props.illustId)}
      >
        <li>
          <img src={props.url} alt={`sample-img-${props.illustId}`} />
          <h4 className="writer">작가: {props.artist}</h4>
          {!purchased && props.checked && (
            <Link
              to={`/novel-list/novel/${props.id}/payment`}
              state={{
                novelId: props.Novel_id,
                chapterId: props.id,
                paymentPrice: props.price,
                contentType: "illust",
              }}
            >
              <button
                style={{
                  padding: "5px",
                  margin: "5px",
                  backgroundColor: "orange",
                  border: "none",
                  borderRadius: "2px",
                  color: "white",
                }}
              >
                구매하기
              </button>
            </Link>
          )}
        </li>
      </div>
    </div>
  );
};

export default IllustItem;

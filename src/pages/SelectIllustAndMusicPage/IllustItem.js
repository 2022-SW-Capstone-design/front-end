import classes from "./IllustItem.module.css";

const IllustItem = (props) => {
  return (
    <div style={{ display: "relative" }}>
      <div
        className={`${classes.IllustItem} ${
          props.checked ? `${classes["IllustItem--selected"]}` : ""
        }`}
        onClick={() => props.onSelect(props.illustId)}
      >
        <li>
          <img src={props.url} alt={`sample-img-${props.illustId}`} />
          <h4 className="writer">작가: {props.artist}</h4>
        </li>
      </div>
    </div>
  );
};

export default IllustItem;

import classes from "./IllustItem.module.css";

const IllustItem = (props) => {
  return (
    <div style={{ display: "relative" }}>
      <div className={classes.IllustItem}>
        <li onClick={() => props.onSelect(props.illustId)}>
          <img src={props.url} alt={`sample-img-${props.illustId}`} />
          <h4 className="writer">작가: {props.artist}</h4>
        </li>
        {props.checked && "선택됨"}
      </div>
    </div>
  );
};

export default IllustItem;

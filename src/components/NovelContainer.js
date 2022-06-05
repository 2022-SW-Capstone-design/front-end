import classes from "./NovelContainer.module.css";
import NovelCard from "../components/NovelCard";
import "./NovelContainer.css";

const NovelContainer = ({ novelListData }) => {
  return (
    <div className="container">
      <ul
        className={classes.NovelContainer}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {novelListData.map((el, idx) => {
          return (
            <li key={idx}>
              <NovelCard data={el} />
            </li>
          );
        })}
      </ul>
      {!novelListData.length && (
        <h2 style={{ marginTop: "20px" }}>현재 소설이 존재하지 않습니다 :(</h2>
      )}
    </div>
  );
};

export default NovelContainer;

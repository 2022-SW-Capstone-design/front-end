import classes from "./NovelContainer.module.css";
import NovelCard from "../components/NovelCard";
import "./NovelContainer.css";

const NovelContainer = ({ novelListData }) => {
  return (
    <div className="container">
      <ul className={classes.NovelContainer}>
        {novelListData.map((el, idx) => {
          return (
            <li key={idx}>
              <NovelCard data={el} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NovelContainer;

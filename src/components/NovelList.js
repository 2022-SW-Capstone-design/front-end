import NovelItem from "./NovelItem";
import "./NovelList.css";

const NovelList = ({ title, value }) => {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {value.map((novelData, idx) => (
          <li key={idx}>
            <NovelItem data={novelData} ilstId={idx} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default NovelList;

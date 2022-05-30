import classes from "./MusicItem.module.css";

const MusicItem = ({ data, onSelect, musicId, checked }) => {
  return (
    <div
      className={`${classes.MusicItem} ${
        checked ? `${classes["MusicItem--selected"]}` : ""
      }`}
    >
      <h5 onClick={() => onSelect(musicId)}>{data.title}</h5>
    </div>
  );
};

export default MusicItem;

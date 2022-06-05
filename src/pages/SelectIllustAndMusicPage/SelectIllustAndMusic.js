import { Link, useLocation } from "react-router-dom";
import IllustList from "./IllustList";
import MusicList from "./MusicList";
import { useState, useReducer } from "react";
import classes from "./SelectIllustAndMusic.module.css";
import { Button } from "react-bootstrap";

const reducer = (_, action) => {
  switch (action.type) {
    case "ENABLED":
      return false;
    case "DISABLED":
      return true;
    default:
      return false;
  }
};

const SelectIllustAndMusic = () => {
  const [readButtonDisabled, dispatch] = useReducer(reducer, false);
  const location = useLocation();
  const [selectedIllustItem, setSelectedIllustItem] = useState(null);
  const [selectedIllustId, setSelectedIllustId] = useState(null);
  const [selectedMusicItem, setSelectedMusicItem] = useState(null);
  const [selectedMusicId, setSelectedMusicId] = useState(null);
  const novelId = location.state.novelId;
  const chapterId = location.state.chapterId;
  const title = location.state.title;

  const deleteSelectedHandler = () => {
    setSelectedIllustItem(null);
    setSelectedIllustId(null);
    setSelectedMusicItem(null);
    setSelectedMusicId(null);
    makeEnabled();
  };

  const makeEnabled = () => {
    dispatch({ type: "ENABLED" });
  };

  const makeDisabled = () => {
    dispatch({ type: "DISABLED" });
  };

  return (
    <div>
      <div className={classes["page-title"]}>
        <h1>일러스트/음악 선택</h1>
      </div>
      <div className={classes["illust-music-grid"]}>
        <IllustList
          state={{
            ...location.state,
            novelId,
          }}
          selectHandler={setSelectedIllustItem}
          selectIdHandler={setSelectedIllustId}
          enableHandler={makeEnabled}
          disableHandler={makeDisabled}
          select={selectedIllustItem}
        />
        <MusicList
          state={{
            ...location.state,
            novelId,
            chapterId,
          }}
          selectHandler={setSelectedMusicItem}
          selectIdHandler={setSelectedMusicId}
          enableHandler={makeEnabled}
          disableHandler={makeDisabled}
          select={selectedMusicItem}
        />
      </div>
      <Link
        to={`/novel-list/novel/${location.state.chapterId}/viewer`}
        state={{
          ...location.state,
          novelId,
          chapterId,
          title,
          selectedIllustId,
          selectedMusicId,
        }}
      >
        {!readButtonDisabled && (
          <div className={classes["chapter-read"]}>
            <Button variant="success">챕터 읽기</Button>
          </div>
        )}
      </Link>
      <div className={classes["choose-cancel"]}>
        <Button variant="secondary" onClick={deleteSelectedHandler}>
          선택 취소하기
        </Button>
      </div>
    </div>
  );
};

export default SelectIllustAndMusic;

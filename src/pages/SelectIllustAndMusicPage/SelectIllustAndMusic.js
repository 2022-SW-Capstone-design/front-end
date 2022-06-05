import { Link, useLocation } from "react-router-dom";
import IllustList from "./IllustList";
import MusicList from "./MusicList";
import { useState, useReducer } from "react";
import classes from "./SelectIllustAndMusic.module.css";
import { Button } from "react-bootstrap";

const musicReducer = (_, action) => {
  switch (action.type) {
    case "ENABLED":
      return false;
    case "DISABLED":
      return true;
    default:
      return false;
  }
};

const illustReducer = (_, action) => {
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
  const [musicDisable, musicDispatch] = useReducer(musicReducer, false);
  const [illustDisable, illustDispatch] = useReducer(illustReducer, false);
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
    musicEnabled();
  };

  const musicEnabled = () => {
    musicDispatch({ type: "ENABLED" });
  };

  const musicDisabled = () => {
    musicDispatch({ type: "DISABLED" });
  };

  const illustEnabled = () => {
    illustDispatch({ type: "ENABLED" });
  };

  const illustDisabled = () => {
    illustDispatch({ type: "DISABLED" });
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
          enableHandler={illustEnabled}
          disableHandler={illustDisabled}
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
          enableHandler={musicEnabled}
          disableHandler={musicDisabled}
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
        {!musicDisable && !illustDisable && (
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

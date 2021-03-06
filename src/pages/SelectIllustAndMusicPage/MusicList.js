import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getData } from "../../components/http-request";
import MusicItem from "./MusicItem";
import classes from "./MusicList.module.css";

const MusicList = ({
  selectHandler,
  selectIdHandler,
  enableHandler,
  disableHandler,
  select,
}) => {
  const location = useLocation();
  const [musicList, setMusicList] = useState(null);

  const novelId = location.state.novelId;
  const chapterId = location.state.chapterId;

  const bearerToken = localStorage.getItem("tokenId");

  useEffect(() => {
    const getMusicItemsDataFromServer = async () => {
      const getMusicDataFromServer = await getData(
        `list/music/${novelId}/${chapterId}`,
        bearerToken
      );

      const musicSets = getMusicDataFromServer.musicSets;
      console.log(musicSets);
      setMusicList(musicSets);
    };

    try {
      getMusicItemsDataFromServer();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      {!musicList && (
        <>
          <h3>음악 로딩중...</h3>
        </>
      )}
      {!!musicList && !!musicList.length && (
        <div className={classes["music-list"]}>
          <h3>음악 목록</h3>
          <ul>
            {musicList.map((musicData, idx) => (
              <li key={idx}>
                <MusicItem
                  novelId={novelId}
                  chapterId={chapterId}
                  data={musicData}
                  checked={idx === select}
                  musicId={musicList[idx].musicSetId}
                  isPurchased={musicList[idx].isPurchased}
                  price={musicList[idx].price}
                  onSelect={(id) => {
                    selectHandler(idx);
                    selectIdHandler(id);
                  }}
                  enableHandler={enableHandler}
                  disableHandler={disableHandler}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MusicList;

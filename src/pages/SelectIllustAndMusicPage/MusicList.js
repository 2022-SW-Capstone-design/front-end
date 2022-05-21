import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getData } from '../../components/http-request';
import MusicItem from './MusicItem';
import classes from './MusicList.module.css';

const MusicList = ({ selectHandler, selectIdHandler, select }) => {
  const location = useLocation();
  const [musicList, setMusicList] = useState(null);
  const novelId = location.state.novelId;
  const chapterId = location.state.chapterId;

  useEffect(() => {
    const getMusicItemsDataFromServer = async () => {
      const getMusicDataFromServer = await getData(`list/music/${novelId}/${chapterId}`);
      const musicSets = getMusicDataFromServer.musicSets;

      setMusicList(musicSets);
    };

    try { 
      getMusicItemsDataFromServer(); 
    } catch (err) { 
      console.error(err); 
    };
    
  }, []);

  return <div>
  {!musicList && <>
      <h3>음악 로딩중...</h3>
    </>}
    {!!musicList && !!musicList.length && <div className={classes["music-list"]}>
      <h3>음악 목록</h3>
      <ul>
        {musicList.map((musicData, idx) => <li key={idx} 
          ><MusicItem data={musicData}
            checked={idx === select}
            musicId={musicList[idx].musicSetId}
            onSelect={(id) => {
            selectHandler(idx); 
            selectIdHandler(id);
          }}/></li>)}
      </ul>
    </div>}
  </div>
}

export default MusicList;
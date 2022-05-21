import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import IllustList from './IllustList';
import MusicList from './MusicList';
import { useState } from 'react';
import classes from './SelectIllustAndMusic.module.css';
import { Button } from'react-bootstrap';


const SelectIllustAndMusic = () => {
  const location = useLocation();
  const [selectedIllustItem, setSelectedIllustItem] = useState(null);
  const [selectedIllustId, setSelectedIllustId] = useState(null);
  const [selectedMusicItem, setSelectedMusicItem] = useState(null);
  const [selectedMusicId, setSelectedMusicId] = useState(null);
  const novelId = location.state.novelId;
  const chapterId = location.state.chapterId;  

  const deleteSelectedHandler = () => {
    setSelectedIllustItem(null);
    setSelectedIllustId(null);
    setSelectedMusicItem(null);
    setSelectedMusicId(null);
  }

  return (
    <div>
      <div className={classes["page-title"]}><h1>일러스트/음악 선택</h1></div>
      <div className={classes["illust-music-grid"]}>
        <IllustList state={{
          ...location.state
        }} selectHandler={setSelectedIllustItem} selectIdHandler={setSelectedIllustId} select={selectedIllustItem}/>
        <MusicList state={{
          ...location.state
        }} selectHandler={setSelectedMusicItem} selectIdHandler={setSelectedMusicId} select={selectedMusicItem}/>
      </div>
      <Link to={`/novel-list/novel/${location.state.chapterId}/viewer`} state={{
        ...location.state,
        novelId, 
        chapterId, 
        selectedIllustId,
        selectedMusicId,
      }} >
        <div className={classes["chapter-read"]}><Button variant="success">챕터 읽기</Button></div>
      </Link>
      <div className={classes["choose-cancel"]}><Button variant="secondary" onClick={deleteSelectedHandler}>선택 취소하기</Button></div>
      

    </div>
  );
}

export default SelectIllustAndMusic
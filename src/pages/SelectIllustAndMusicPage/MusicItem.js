const MusicItem = ({ data, onSelect, musicId, checked }) => {
  return <>
      <h1 onClick={() => onSelect(musicId)}>{data.title}</h1>
      {checked && <h3>선택되었습니다!</h3>}
    </>;
  
}

export default MusicItem;
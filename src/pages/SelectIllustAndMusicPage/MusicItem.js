const MusicItem = ({ data, onSelect, musicId, checked }) => {
  return (
    <>
      <h5 onClick={() => onSelect(musicId)}>{data.title}</h5>
      {checked && <h5>선택되었습니다!</h5>}
    </>
  );
};

export default MusicItem;

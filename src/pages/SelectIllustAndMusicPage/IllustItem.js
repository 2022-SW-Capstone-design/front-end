import "./IllustItem.css"

const IllustItem = (props) => {

  return (<>
    <li onClick={() => props.onSelect(props.illustId)}>
      <img 
        src={props.url}
        width="300px"
      />
      <h4 className="writer">작가: {props.artist}</h4>
    </li>
    {props.checked && <h3>선택됨</h3>}
  </>)
};

export default IllustItem;
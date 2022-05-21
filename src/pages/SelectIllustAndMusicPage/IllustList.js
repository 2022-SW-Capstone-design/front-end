import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getData } from "../../components/http-request";
import  IllustItem from './IllustItem';
import classes from './IllustList.module.css'


const IllustList = ({ selectHandler, selectIdHandler, select }) => {
  const location = useLocation();
  const { chapterId, novelId } = location.state;
  const [urlData, setUrlData] = useState(null);
  const [artistData, setArtistData] = useState([]);
  const [idData, setIdData] = useState([]);

  useEffect(() => {
    const illustList = async () => {
      const getIllustListDataFromServer = await getData(`list/illust/${novelId}/${chapterId}`);
      const illustSetIdDataList = getIllustListDataFromServer.map(el => el.illustSetId);
      const urlDataList = getIllustListDataFromServer.map(el => el.coverURL);
      const artistDataList = getIllustListDataFromServer.map(el => el.nickname);

      setUrlData(urlDataList);
      setArtistData(artistDataList);
      setIdData(illustSetIdDataList);
    }

    
    illustList();
  }, []);


  return (
    <div>
      {!urlData && <h1>로딩중입니다...</h1>}
      {!!urlData && !!urlData.length && <div className={classes["illust-list"]}>
        <h3>일러스트 목록</h3>
        <ul>
          {urlData.map((url, idx) => <IllustItem 
            key={idx} 
            url={url}
            artist={artistData[idx]} 
            illustId={idData[idx]}
            checked={idx === select}
            onSelect={(id) => {
              selectHandler(idx);
              selectIdHandler(id);
            }}
          />)}
        </ul>
        {!!urlData && !urlData.length && <h2>일러스트가 존재하지 않습니다 :/</h2>}
      </div>}
    </div>
  )

  
};

export default IllustList;
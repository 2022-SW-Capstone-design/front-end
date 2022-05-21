import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getData } from '../../components/http-request';
import MusicPlayer from  './MusicPlayer';
import axios from 'axios';

const ToastUIViewer = ({ illustId, musicId }) => {
  const bearerToken = localStorage.getItem('bearerToken');
  const location = useLocation();
  const [viewerContent, setViewerContent] = useState('');
  const [musicTrack, setMusicTrack] = useState(null);
  const {novelId, chapterId} = location.state;

  useEffect(() => {
    const getNovelDataFromServer = async () => {
      const responseData = await axios.get(`http://localhost:8081/content/novel/${novelId}/chapter/${chapterId}`, {
        headers: {
          authorization: `Bearer ${bearerToken || ""}`,
        }
      },{
        credentials: "same-origin",
      })
      const content = await responseData.data.chapterContent;
      setViewerContent(content);
    };

    const getNovelDataFromServerWithIllustMusic = async () => {
      const responseData = await getData(`content/novel/${novelId}/chapter/${chapterId}?illustSet=${illustId}&musicSet=${musicId}`);
      if (responseData.musicTracks.length) {
        setMusicTrack(responseData.musicTracks);
      } 
      const novelContent = await responseData.chapterContent; 
      setViewerContent(novelContent);
    }

    (!illustId && !musicId) && getNovelDataFromServer();
    (illustId || musicId) && getNovelDataFromServerWithIllustMusic();
  }, []);

  return (
    <>
      {musicTrack && musicTrack.length && <MusicPlayer musicList={musicTrack} />}
      {viewerContent && <Viewer initialValue={viewerContent} />}
    </>
  )

};

export default ToastUIViewer;
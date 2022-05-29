import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getData } from "../../components/http-request";
import MusicPlayer from "./MusicPlayer";
import classes from "./Viewer.module.css";

const ToastUIViewer = ({ illustId, musicId }) => {
  const bearerToken = localStorage.getItem("tokenId");
  const location = useLocation();
  const [viewerContent, setViewerContent] = useState("");
  const [musicTrack, setMusicTrack] = useState(null);
  const { novelId, chapterId } = location.state;

  useEffect(() => {
    const getNovelDataFromServer = async () => {
      const responseData = await getData(
        `content/novel/${novelId}/chapter/${chapterId}`,
        bearerToken
      );
      const content = await responseData.chapterContent;
      setViewerContent(content);
    };

    const getNovelDataFromServerWithIllustMusic = async () => {
      const responseData = await getData(
        `content/novel/${novelId}/chapter/${chapterId}?illustSet=${illustId}&musicSet=${musicId}`
      );
      if (responseData.musicTracks.length) {
        setMusicTrack(responseData.musicTracks);
      }
      const novelContent = await responseData.chapterContent;
      setViewerContent(novelContent);
    };

    !illustId && !musicId && getNovelDataFromServer();
    (illustId || musicId) && getNovelDataFromServerWithIllustMusic();
  }, []);

  return (
    <div className={classes.ViewerAndMusicPlayer}>
      {musicTrack && musicTrack.length && (
        <MusicPlayer musicList={musicTrack} />
      )}
      {viewerContent && <Viewer initialValue={viewerContent} />}
    </div>
  );
};

export default ToastUIViewer;

import { useState, createContext } from "react";
import { Route, Routes, Router } from "react-router-dom";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import CreateNewNovel from "./pages/CreateNewNovel";
import SearchResult from "./pages/SearchResult";
import ReaderChapter from "./pages/ReaderChapter";
import WriterChapter from "./pages/WriterChapterPage/WriterChapter"
import CreateNewChapter from "./pages/CreateNewChapter";
import SelectIllustAndMusic from "./pages/SelectIllustAndMusicPage/SelectIllustAndMusic";
import IllustEditor from "./pages/IllustEditorPage/IllustEditor";
import UploadMusicPage from './pages/UploadMusicPage/UploadMusicPage';
import Viewer from "./pages/ViewerPage/Viewer";

export const BearerTokenContext = createContext();

const App = () => {
  const [currentToken, setCurrentToken] = useState();
  const setBearerToken = (changedValue) => {
    setCurrentToken(changedValue);
  };

  return (
      <BearerTokenContext.Provider value={{ currentToken: currentToken, setBearerToken }}>
        <Routes>
          <Route index element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/create/novel" element={<CreateNewNovel />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/novel-list/novel/:title" element={<ReaderChapter />} />
          <Route path="/novel-list/novel/:chapterId/select" element={<SelectIllustAndMusic />} />
          <Route path="/novel-list/novel/:chapterId/viewer" element={<Viewer />} />
          <Route path="/novel-list/novel/:chapterId/add-illust" element={<IllustEditor />}/>
          <Route path="/novel-list/novel/:chapterId/add-music" element={<UploadMusicPage />}/>
          <Route
            path="/novel-list/writer/novel/:title"
            element={<WriterChapter />}
          />
          <Route
            path="/novel-list/writer/novel/editor/:title"
            element={<CreateNewChapter />}
          />
        </Routes>
      </BearerTokenContext.Provider>
  );
};

export default App;

import ToastUIViewer from "./ToastUIViewer";
import { useLocation } from "react-router-dom";
import classes from "./Viewer.module.css";

const Viewer = () => {
  const location = useLocation();

  return (
    <div className={classes.Viewer}>
      <ToastUIViewer
        illustId={location.state.selectedIllustId}
        musicId={location.state.selectedMusicId}
      />
    </div>
  );
};

export default Viewer;

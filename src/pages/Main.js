import NavigationBar from "../components/NavigationBar";
import GlobalStyle from "../GlobalStyle";
import "./Main.css";
import NovelCard from "../components/NovelCard";

const Main = () => {
  return (
    <>
      <GlobalStyle />
      <NavigationBar />
      <div className="main_container">
        <img className="main_image" src="assets/intro.png" 
        alt=""/>
        {/* Card예시*/}
        {/*내용시작*/}
        <div className="section_one">
          <div className="section_one_text">
            <h1>안녕하세요 NOVELAND입니다.</h1>
            <img className="logoIcon"src="assets/logo.png"/>
            <br/><h1> 저희는 "  <u className="underline">뉴 미디어 융합 컨텐츠 플랫폼</u>  " 입니다.</h1>
            <ul className="section_box">
            <li><div className="section_first_box"><img className="section_box_img"src="assets/choice.png"/></div></li>
            <li><div className="section_second_box"><h1>취향대로 골라서<br/><br/>콘텐츠를 감상하세요</h1></div></li>
          </ul>
          </div>
        </div>
        <div className="step_section">
          <h1 className="step">Step 1.</h1>
          <ul className="section_box">
            <li><div className="section_first_box"><img className="section_box_img"src="assets/novel.gif"/></div></li>
            <li><div className="section_second_box"><h1>읽고 싶은 소설을<br/><br/>선택하세요</h1></div></li>
          </ul>
        </div>
        <div className="step_section">
          <h1 className="step">Step 2.</h1>
          <ul className="section_box">
            <li><div className="section_first_box"><img className="section_box_img"src="assets/illust.gif"/></div></li>
            <li><div className="section_second_box"><h1>취향에 맞는 그림을<br/><br/>추가하세요</h1></div></li>
          </ul>
        </div>
        <div className="step_section">
          <h1 className="step">Step 3.</h1>
          <ul className="section_box">
            <li><div className="section_first_box"><img className="section_box_img"src="assets/music.gif"/></div></li>
            <li><div className="section_second_box"><h1>소설에 맞는 음악도<br/><br/>즐겨보세요</h1></div></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Main;

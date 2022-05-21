import NovelCard from "../components/NovelCard"
import "./NovelContainer.css";

const NovelContainer = ({ novelListData }) => {
        console.log(novelListData);
           return <div className="container">
                <ul style={{ display: "flex", flexDirection: "row"}}>
                    {novelListData.map((el, idx) => {
                        return <li key={idx}>
                            <NovelCard data={el} />
                        </li>
                    })}
                </ul>
            </div>
};

export default NovelContainer;
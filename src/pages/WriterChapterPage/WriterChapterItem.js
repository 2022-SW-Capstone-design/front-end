import { Link } from 'react-router-dom';

const WriterChapterItem = ({ value }) => {
  return (
      <li>
        <Link to={`/novel-list/novel/${value[0].id}/select`} state={{
        novelId: value[0].Novel_id,
        chapterId: value[0].id,
        }}>
            {`${value[1] + 1}화 - ${value[0].title}`}
          </Link>
          <Link to={`/novel-list/novel/${value[0].id}/add-illust`} state={{
          novelId: value[0].Novel_id,
          chapterId: value[0].id,
          title: value[2],
        }}>
          <button>일러스트 추가</button>
        </Link>
        <Link to={`/novel-list/novel/${value[0].id}/add-music`} state={{
          novelId: value[0].Novel_id,
          chapterId: value[0].id,
          title: value[2],
        }}>
          <button>음악 추가</button>
        </Link>
      </li>
  )
};

export default WriterChapterItem;
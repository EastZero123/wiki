import { useParams } from "react-router-dom";

const DocumentHistoryPage = () => {
    const { title } = useParams();
    // 실제 구현: 백엔드에서 문서 제목(title)으로 버전 목록을 가져와 표시
    return <div><h2>문서 역사: {title}</h2><p>여기에 문서의 버전 이력 목록이 표시됩니다.</p><p><a href={`/${title}`}>[현재 문서 보기]</a></p></div>;
};

export default DocumentHistoryPage;
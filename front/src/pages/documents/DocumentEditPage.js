import { useParams } from "react-router-dom";

const DocumentEditPage = () => {
    const { title } = useParams();
    // 실제 구현: 백엔드에서 문서 내용을 가져와 편집 폼에 채우고, 수정 후 전송
    return <div><h2>문서 편집: {title}</h2><p>여기에 문서 편집 폼이 들어갑니다.</p></div>;
};

export default DocumentEditPage;
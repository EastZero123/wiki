import { useParams } from "react-router-dom";

const DocumentVersionViewPage = () => {
    const { title, versionNumber } = useParams();
    // 실제 구현: 백엔드에서 특정 버전의 내용을 가져와 렌더링
    return <div><h2>문서 버전 보기: {title} (버전 {versionNumber})</h2><p>여기에 해당 버전의 문서 내용이 렌더링됩니다.</p><p><a href={`/${title}/history`}>[역사로 돌아가기]</a></p></div>;
};

export default DocumentVersionViewPage;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';

// UI 컴포넌트는 이곳에 임포트한다고 가정합니다.
// 예시:
// import Header from './components/common/Header';
// import Footer from './components/common/Footer';
// import HomePage from './pages/HomePage';
// import DocumentViewPage from './pages/DocumentViewPage';
// import DocumentEditPage from './pages/DocumentEditPage';
// import DocumentCreatePage from './pages/DocumentCreatePage';
// import DocumentHistoryPage from './pages/DocumentHistoryPage';
// import DocumentVersionViewPage from './pages/DocumentVersionViewPage';
// import SearchPage from './pages/SearchPage';
// import NotFoundPage from './pages/NotFoundPage';

// 임시 컴포넌트 (실제 구현 시 삭제 후 위 주석처리된 컴포넌트들 사용)
const Header = () => (
    <header style={{ padding: '10px', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
        <h1>Wiki Service</h1>
        <nav>
            <a href="/">홈</a> | <a href="/create">새 문서</a>
        </nav>
    </header>
);
const Footer = () => (
    <footer style={{ padding: '10px', background: '#f0f0f0', borderTop: '1px solid #ccc', marginTop: '20px', textAlign: 'center' }}>
        <p>&copy; 2025 My Wiki Service</p>
    </footer>
);
const HomePage = () => <div><h2>홈 페이지</h2><p>최근 변경 문서, 인기 문서 등의 목록이 여기에 표시됩니다.</p></div>;
const DocumentViewPage = () => {
    const { title } = useParams();
    // 실제 구현: 백엔드에서 문서 제목(title)으로 문서 내용을 가져와 렌더링
    return <div><h2>문서 보기: {title}</h2><p>여기에 문서 내용이 렌더링됩니다.</p><p><a href={`/${title}/edit`}>[편집]</a> <a href={`/${title}/history`}>[역사]</a></p></div>;
};
const DocumentEditPage = () => {
    const { title } = useParams();
    // 실제 구현: 백엔드에서 문서 내용을 가져와 편집 폼에 채우고, 수정 후 전송
    return <div><h2>문서 편집: {title}</h2><p>여기에 문서 편집 폼이 들어갑니다.</p></div>;
};
const DocumentCreatePage = () => {
    // 실제 구현: 새 문서 생성 폼 제공
    return <div><h2>새 문서 만들기</h2><p>여기에 새 문서 생성 폼이 들어갑니다.</p></div>;
};
const DocumentHistoryPage = () => {
    const { title } = useParams();
    // 실제 구현: 백엔드에서 문서 제목(title)으로 버전 목록을 가져와 표시
    return <div><h2>문서 역사: {title}</h2><p>여기에 문서의 버전 이력 목록이 표시됩니다.</p><p><a href={`/${title}`}>[현재 문서 보기]</a></p></div>;
};
const DocumentVersionViewPage = () => {
    const { title, versionNumber } = useParams();
    // 실제 구현: 백엔드에서 특정 버전의 내용을 가져와 렌더링
    return <div><h2>문서 버전 보기: {title} (버전 {versionNumber})</h2><p>여기에 해당 버전의 문서 내용이 렌더링됩니다.</p><p><a href={`/${title}/history`}>[역사로 돌아가기]</a></p></div>;
};
const SearchPage = () => {
    // 실제 구현: 검색 쿼리를 받아 백엔드에 요청하고 결과 표시
    return <div><h2>검색 결과</h2><p>여기에 검색 결과 목록이 표시됩니다.</p></div>;
};
const NotFoundPage = () => <div><h2>404 - 페이지를 찾을 수 없습니다</h2><p>요청하신 페이지가 존재하지 않습니다.</p></div>;


function App() {
    return (
        <Router>
            <Header /> {/* 모든 페이지에 공통으로 표시될 헤더 */}
            <main style={{ padding: '20px' }}>
                <Routes>
                    {/* 홈 페이지 */}
                    <Route path="/" element={<HomePage />} />

                    {/* 문서 조회, 수정, 이력, 특정 버전 조회 */}
                    {/* :title은 URL 파라미터로 문서 제목을 나타냅니다. (URL 인코딩 고려) */}
                    <Route path="/:title" element={<DocumentViewPage />} />
                    <Route path="/:title/edit" element={<DocumentEditPage />} />
                    <Route path="/:title/history" element={<DocumentHistoryPage />} />
                    <Route path="/:title/versions/:versionNumber" element={<DocumentVersionViewPage />} />

                    {/* 새 문서 생성 페이지 */}
                    <Route path="/create" element={<DocumentCreatePage />} />

                    {/* 검색 페이지 */}
                    {/* 쿼리 파라미터 (예: /search?q=키워드)는 useParams 대신 useSearchParams 훅을 사용합니다. */}
                    <Route path="/search" element={<SearchPage />} />

                    {/* 404 Not Found 페이지 (모든 일치하지 않는 경로 처리) */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer /> {/* 모든 페이지에 공통으로 표시될 푸터 */}
        </Router>
    );
}

export default App;
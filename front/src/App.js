import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import DocumentViewPage from './pages/documents/DocumentViewPage';
import DocumentEditPage from './pages/documents/DocumentEditPage';
import DocumentHistoryPage from './pages/documents/DocumentHistoryPage';
import DocumentCreatePage from './pages/documents/DocumentCreatePage';
import DocumentVersionViewPage from './pages/documents/DocumentVersionViewPage';

// UI 컴포넌트는 이곳에 임포트한다고 가정합니다.
// 예시:
// import DocumentViewPage from './pages/DocumentViewPage';
// import DocumentEditPage from './pages/DocumentEditPage';
// import DocumentCreatePage from './pages/DocumentCreatePage';
// import DocumentHistoryPage from './pages/DocumentHistoryPage';
// import DocumentVersionViewPage from './pages/DocumentVersionViewPage';
// import SearchPage from './pages/SearchPage';
// import NotFoundPage from './pages/NotFoundPage';

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

                    {/* 새 문서 생성 페이지 */}
                    <Route path="/create" element={<DocumentCreatePage />} />

                    {/* 검색 페이지 */}
                    {/* 쿼리 파라미터 (예: /search?q=키워드)는 useParams 대신 useSearchParams 훅을 사용합니다. */}
                    <Route path="/search" element={<SearchPage />} />

                    {/* 문서 조회, 수정, 이력, 특정 버전 조회 */}
                    {/* :title은 URL 파라미터로 문서 제목을 나타냅니다. (URL 인코딩 고려) */}
                    <Route path="/:title/edit" element={<DocumentEditPage />} />
                    <Route path="/:title/history" element={<DocumentHistoryPage />} />
                    <Route path="/:title/:id" element={<DocumentViewPage />} />
                    <Route path="/:title/versions/:versionNumber" element={<DocumentVersionViewPage />} />

                    {/* 404 Not Found 페이지 (모든 일치하지 않는 경로 처리) */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer /> {/* 모든 페이지에 공통으로 표시될 푸터 */}
        </Router>
    );
}

export default App;
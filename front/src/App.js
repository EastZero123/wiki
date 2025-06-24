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
import DocumentDeletePage from './pages/documents/DocumentDeletePage';
import './App.css';
import DocumentGuide from './pages/documents/DocumentGuide';

const SearchPage = () => {
    return <div><h2>검색 결과</h2><p>여기에 검색 결과 목록이 표시됩니다.</p></div>;
};
const NotFoundPage = () => <div><h2>404 - 페이지를 찾을 수 없습니다</h2><p>요청하신 페이지가 존재하지 않습니다.</p></div>;


function App() {
    return (
        <Router>
            <Header /> {/* 모든 페이지에 공통으로 표시될 헤더 */}
            <main>
                <Routes>
                    {/* 홈 페이지 */}
                    <Route path="/" element={<HomePage />} />

                    {/* 새 문서 생성 페이지 */}
                    <Route path="/create" element={<DocumentCreatePage />} />

                    {/* 검색 페이지 */}
                    {/* 쿼리 파라미터 (예: /search?q=키워드)는 useParams 대신 useSearchParams 훅을 사용합니다. */}
                    <Route path="/search" element={<SearchPage />} />

                    {/* 입문자 가이드 */}
                    <Route path="/guide" element={<DocumentGuide />} />

                    {/* 문서 조회, 수정, 이력, 특정 버전 조회 */}
                    {/* :title은 URL 파라미터로 문서 제목을 나타냅니다. (URL 인코딩 고려) */}
                    <Route path="/:title/edit" element={<DocumentEditPage />} />
                    <Route path="/:title/history" element={<DocumentHistoryPage />} />
                    <Route path="/:title/:id" element={<DocumentViewPage />} />
                    <Route path="/:title/versions/:versionNumber" element={<DocumentVersionViewPage />} />
                    <Route path="/:title/delete" element={<DocumentDeletePage />} />

                    {/* 404 Not Found 페이지 (모든 일치하지 않는 경로 처리) */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer /> {/* 모든 페이지에 공통으로 표시될 푸터 */}
        </Router>
    );
}

export default App;
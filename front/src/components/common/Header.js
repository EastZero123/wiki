const Header = () => (
    <header style={{ padding: '10px', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
        <h1>Wiki Service</h1>
        <nav>
            <a href="/">홈</a> | <a href="/create">새 문서</a>
        </nav>
    </header>
);

export default Header;
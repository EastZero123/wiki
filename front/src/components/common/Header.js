import { Link } from "react-router-dom";

const Header = () => (
    <header>
        <h1>Wiki Service</h1>
        <nav>
            <Link to="/">홈</Link> | <Link to="/create">새 문서</Link>
        </nav>
    </header>
);

export default Header;
import { Link } from "react-router-dom";
import logoImage from '../../assets/images/logo.png'; // 로고 이미지 경로

const Header = () => (
    <header>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>
                <img src={logoImage} alt="We Write Wiki Logo" />
                <p>W</p>e <p>W</p>rite <p>W</p>iki
            </h1>
        </Link>
        <nav>
            <Link to="/">홈</Link> | <Link to="/create">새 문서</Link> | <Link to="/guide">도움말</Link>
        </nav>
    </header>
);

export default Header;
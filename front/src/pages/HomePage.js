import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const DEBUG_MODE = process.env.REACT_APP_DEBUG_MODE;

const HomePage = () => {
    const [data, setData] = useState()

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(json => {
                setData(json);
                console.log('Home data (inside .then):', data);
            })
            .catch(error => {
                console.error('Error fetching home data:', error);
            });
    }, [])

    return (
        <div>
            <h2>홈 페이지</h2>
            <p>인기 문서 목록이 여기에 표시됩니다.</p>
            {data ? data.map((item, index) => (
                <div key={index}>
                    <h3><Link to={`/${item.title}/${item.id}`} style={{
                        color: '#E69720',
                        textDecoration: 'none'
                    }}>{item.title}</Link></h3>
                    <p>{item.description}</p>
                </div>
            )) : ''}
        </div>
    )
};

export default HomePage;
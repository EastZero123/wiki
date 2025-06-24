import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from '../css/HomePage.module.css';

const API_URL = process.env.REACT_APP_API_URL;
const DEBUG_MODE = process.env.REACT_APP_DEBUG_MODE;

const HomePage = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(json => {
                setData(json);
                setLoading(false);
                console.log('Home data (inside .then):', data);
            })
            .catch(error => {
                console.error('Error fetching home data:', error);
            })
    }, [])

    return (
        <div className={styles['mainPageContainer']}>
            <h2 className={styles['pageTitle']}>인기 문서 랭킹</h2>
            <p className={styles['introText']}>현재 가장 많은 관심을 받고 있는 문서들입니다. 클릭하여 새로운 지식을 탐험해보세요!</p>

            {loading && (
                <p className={styles['loadingMessage']}>데이터를 불러오는 중입니다...</p>
            )}

            {!loading && !data && (
                <p className={styles['noDataMessage']}>현재 인기 문서가 없습니다. 새로운 문서를 작성해보세요!</p>
            )}

            {data && data.length > 0 && (
                <ol className={styles['hotDocumentsList']}>
                    {data.map((item, index) => (
                        <li key={item.id} className={styles['documentItem']}>
                            <h3 className={styles['documentTitle']}>
                                <span className={styles['documentRank']}>{index + 1}.</span>
                                <Link to={`/${item.title}/${item.id}`}>{item.title}</Link>
                            </h3>
                            <p className={styles['documentDescription']}>{item.description}</p>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    )
};

export default HomePage;
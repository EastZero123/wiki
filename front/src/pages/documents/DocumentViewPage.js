import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import styles from '../../css/DocumentViewPage.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const DocumentViewPage = () => {
    const { title: urlTitle, id: urlId } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/${urlTitle}/${urlId}`)
            .then(response => response.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching home data:', error);
            });
    }, [urlTitle, urlId])

    if (loading) {
        return (
            <div className={styles['documentViewContainer']}>
                <p className={styles['loadingMessage']}>문서 내용을 불러오는 중...</p>
            </div>
        );
    }

    // 실제 구현: 백엔드에서 문서 제목(title)으로 문서 내용을 가져와 렌더링
    return (
        <div className={styles['documentViewContainer']}>
            <h2 className={styles['documentTitle']}>{data[0].title || urlTitle}</h2>
            <div className={styles['documentContent']}>
                {/* ReactMarkdown을 사용하여 백엔드에서 가져온 content를 렌더링 */}
                <ReactMarkdown>{data[0].content || '문서 내용이 없습니다.'}</ReactMarkdown>
            </div>

            <p className={styles['actionLinks']}>
                {/* 편집 링크 */}
                <Link to={`/${data[0].title || urlTitle}/edit`} className={styles['actionLink']}>
                    [편집]
                </Link>
                {/* 역사 링크 */}
                <Link to={`/${data[0].title || urlTitle}/history`} className={styles['actionLink']}>
                    [역사]
                </Link>
            </p>
        </div>
    )
};

export default DocumentViewPage;
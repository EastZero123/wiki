import { useParams } from "react-router-dom";
import styles from '../../css/DocumentHistoryPage.module.css';
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const DocumentHistoryPage = () => {
    const { title } = useParams();

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/${title}/versions`)
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

    console.log('DocumentHistoryPage data:', data);

    const historyData = [
        {
            date: '2025-06-21 12:22:50',
            revision: 'r2447',
            changes: 26,
            contributor: 'Care',
            summary: '2025년 2분기 프로젝트 정리 종료'
        },
        {
            date: '2025-06-10 13:31:45',
            revision: 'r2446',
            changes: -18,
            contributor: 'Care',
            summary: '2025년 2분기 프로젝트 정리'
        },
        {
            date: '2025-06-07 05:15:20',
            revision: 'r2445',
            changes: 0,
            contributor: 'wikidadmin1',
            summary: '2443으로 되돌림'
        },
        {
            date: '2025-06-06 00:47:40',
            revision: 'r2444',
            changes: -184,
            contributor: 'Yor',
            summary: '제70회 현충일'
        },
        {
            date: '2025-04-17 01:13:59',
            revision: 'r2440',
            changes: -184,
            contributor: 'wikidadmin4',
            summary: '지난 10년간 나무위키를 아껴 주신 마음에 감사합니다. 앞으로 다가올 100년을 향한 여정에도 함께 해주세요! 🎂 2015년 4월 17일 태어난 나무위키가 10주년을 맞이했어요.지난 10년간 나무위키를 아껴 주신 마음에 감사합니다. 앞으로 다가올 100년을 향한 여정에도 함께 해주세요! 🎂 2015년 4월 17일 태어난 나무위키가 10주년을 맞이했어요.지난 10년간 나무위키를 아껴 주신 마음에 감사합니다. 앞으로 다가올 100년을 향한 여정에도 함께 해주세요! 🎂 2015년 4월 17일 태어난 나무위키가 10주년을 맞이했어요.'
        },
        // ... 더 많은 데이터 추가 가능
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.docTitle}>나무위키:대문 (문서 역사)</h1>
            </div>

            <ul className={styles.historyList}>
                {historyData.map((item, index) => (
                    <li key={index} className={styles.historyItem}>
                        <span className={styles.date}>{item.date}</span>
                        <span className={styles.links}>
                            [<a href="#">보기</a>]
                        </span>
                        <span className={styles.revisionInfo}>
                            {item.revision} (
                            <span className={`${styles.changes} ${item.changes > 0 ? styles.changesPositive : (item.changes < 0 ? styles.changesNegative : '')}`}>
                                {item.changes > 0 ? `+${item.changes}` : item.changes}
                            </span>
                            )
                        </span>
                        <span className={styles.contributor}>{item.contributor}</span>
                        <span className={styles.summary}>{item.summary}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentHistoryPage;
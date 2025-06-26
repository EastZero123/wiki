import { Link, useNavigate, useParams } from "react-router-dom";
import styles from '../../css/DocumentEditPage.module.css';
import { useEffect, useRef, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const DocumentEditPage = () => {
    const { title: urlTitle } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        summary: '',
    });

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/${urlTitle}`)
            .then(response => response.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching home data:', error);
            });
    }, [urlTitle])

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || '',
                content: data.content || '',
                summary: data.editSummary || '',
            });
        }
    }, [data])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsSubmitting(true);

        const title = formData.title;
        const content = formData.content;
        const editSummary = formData.summary;

        try {
            const response = await fetch(`${API_URL}/${title}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    editSummary
                }),
            })

            const result = await response.json();
            console.log('문서 수정 성공:', result);

            navigate('/')
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles['wiki-container']}>
            {/* H1에 .document-title 클래스를 부여하여 컴포넌트 스코프 스타일 적용 */}
            <h1 className={styles['document-title']}>문서 수정</h1>
            <p>문서 제목과 내용을 입력하고 '수정' 버튼을 누르면 문서가 수정됩니다.</p>

            <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    {/* label은 전역 CSS 또는 기본 브라우저 스타일을 따름 */}
                    <label htmlFor="document-title">문서 제목</label>
                    {/* input에 .text-input 클래스를 부여 */}
                    {data ?
                        <input type="text" id="document-title" name="title" value={formData.title} onChange={handleChange} required className={styles['text-input']} />
                        :
                        ''
                    }
                </div>

                <div className={styles['form-group']}>
                    <label htmlFor="document-content">문서 내용 (마크다운 형식)</label>
                    {/* textarea에 .text-input과 .content-textarea 클래스 부여 */}
                    {data ?
                        <textarea id="document-content" name="content" value={formData.content} onChange={handleChange} required className={`${styles['text-input']} ${styles['content-textarea']}`}></textarea>
                        :
                        ''
                    }
                </div>

                <div className={styles['form-group']}>
                    <label htmlFor="edit-summary">요약</label>
                    {data ?
                        <input type="text" id="edit-summary" name="summary" value={formData.summary} onChange={handleChange} className={styles['text-input']} />
                        :
                        ''
                    }
                </div>

                <div className={styles['form-actions']}>
                    {/* 각 버튼에 .base-button을 기본으로 적용하고, 취소 버튼에만 .cancel-button 추가 */}
                    <button type="button" className={`${styles['base-button']} ${styles['cancel-button']}`} onClick={() => window.history.back()}>취소</button>
                    <button type="submit" className={styles['base-button']} disabled={isSubmitting}>
                        {isSubmitting ? '수정 중...' : '문서 작성'}
                    </button>
                </div>

                <div className={styles.tip}>
                    <strong className={styles['tip-strong']}>팁:</strong> 문서 내용은 <Link to='/guide'>깃허브 문법</Link>에 따라 마크다운 형식으로 작성됩니다. 미리 학습하시면 더욱 멋진 문서를 만드실 수 있습니다!
                </div>
            </form>
        </div>
    )
};

export default DocumentEditPage;
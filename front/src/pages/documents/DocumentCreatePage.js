import { Link } from "react-router-dom";
import styles from '../../css/DocumentCreatePage.module.css';

const DocumentCreatePage = () => {
    return (
        <div className={styles['wiki-container']}>
            {/* H1에 .document-title 클래스를 부여하여 컴포넌트 스코프 스타일 적용 */}
            <h1 className={styles['document-title']}>새 문서 작성</h1>
            <p>새로운 문서를 작성하여 위키에 지식을 추가해주세요. 문서 제목과 내용을 입력하고 '작성' 버튼을 누르면 문서가 생성됩니다.</p>

            <form action="/create_document" method="POST">
                <div className={styles['form-group']}>
                    {/* label은 전역 CSS 또는 기본 브라우저 스타일을 따름 */}
                    <label htmlFor="document-title">문서 제목</label>
                    {/* input에 .text-input 클래스를 부여 */}
                    <input type="text" id="document-title" name="title" placeholder="새 문서의 제목을 입력하세요 (예: 위키 문서 작성법)" required className={styles['text-input']} />
                </div>

                <div className={styles['form-group']}>
                    <label htmlFor="document-content">문서 내용 (마크다운 형식)</label>
                    {/* textarea에 .text-input과 .content-textarea 클래스 부여 */}
                    <textarea id="document-content" name="content" placeholder="문서 내용을 마크다운 형식으로 작성해주세요. (예: ==개요== &#10; 문서 작성을 위한 페이지입니다.)" required className={`${styles['text-input']} ${styles['content-textarea']}`}></textarea>
                </div>

                <div className={styles['form-group']}>
                    <label htmlFor="edit-summary">요약</label>
                    <input type="text" id="edit-summary" name="summary" placeholder="어떤 내용을 작성/수정했는지 간략하게 요약해주세요. (예: 초기 문서 생성)" className={styles['text-input']} />
                </div>

                <div className={styles['form-actions']}>
                    {/* 각 버튼에 .base-button을 기본으로 적용하고, 취소 버튼에만 .cancel-button 추가 */}
                    <button type="button" className={`${styles['base-button']} ${styles['cancel-button']}`} onClick={() => window.history.back()}>취소</button>
                    <button type="submit" className={styles['base-button']}>문서 작성</button>
                </div>

                <div className={styles.tip}>
                    <strong className={styles['tip-strong']}>팁:</strong> 문서 내용은 <Link to='/guide'>깃허브 문법</Link>에 따라 마크다운 형식으로 작성됩니다. 미리 학습하시면 더욱 멋진 문서를 만드실 수 있습니다!
                </div>
            </form>
        </div>
    )
};

export default DocumentCreatePage;
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import styles from '../../css/DocumentGuide.module.css';

const part1 = `
# 마크다운 기본 문법 안내

이 가이드는 GitHub Flavored Markdown (GFM) 문법을 기준으로 정보를 효과적으로 기록하고 공유하는 데 필요한 마크다운 문법을 안내합니다.

---

## 1. 텍스트 강조 및 구조화

문서의 가독성을 높이고 핵심 내용을 부각하는 데 필수적인 요소들입니다.

### 1.1. 제목 (Headings)

문서의 목차를 만들고 내용을 계층적으로 구성합니다. 문서의 논리적인 흐름을 만듭니다.

\`\`\`markdown
# 프로젝트 명세 (최상위 제목)
## 기능 정의 (주요 섹션)
### 사용자 관리 기능 (하위 섹션)
#### 로그인 페이지 (세부 항목)
\`\`\`

# 프로젝트 명세 (최상위 제목)
## 기능 정의 (주요 섹션)
### 사용자 관리 기능 (하위 섹션)
#### 로그인 페이지 (세부 항목)
`; // part1 끝

const part2 = `
### 1.2. 강조 (Emphasis)

텍스트의 중요도를 조절하여 특정 단어나 문구를 눈에 띄게 합니다.

\`\`\`markdown
이 문서는 **필수적으로 숙지**해야 할 내용입니다.
*참고*: 마감일은 _2025년 7월 15일_ 입니다.
\`\`\`

이 문서는 **필수적으로 숙지**해야 할 내용입니다.
*참고*: 마감일은 _2025년 7월 15일_ 입니다.
`; // part2 끝

const part3 = `
### 1.3. 목록 (Lists)

정보를 체계적으로 나열하거나 단계별 프로세스를 설명할 때 유용합니다.

\`\`\`markdown
**오늘의 할 일:**
* 백엔드 API 개발 (회원가입)
* 프론트엔드 UI 구현 (로그인 페이지)
  * 아이디 입력 필드
  * 비밀번호 입력 필드
1. 개발 환경 설정
2. 의존성 설치
3. 프로젝트 실행
\`\`\`

**오늘의 할 일:**
* 백엔드 API 개발 (회원가입)
* 프론트엔드 UI 구현 (로그인 페이지)
  * 아이디 입력 필드
  * 비밀번호 입력 필드
1. 개발 환경 설정
2. 의존성 설치
3. 프로젝트 실행

---

## 2. 코드 및 자료 공유

기술적인 내용을 공유하거나 실제 코드, 외부 자료를 참조할 때 사용합니다.

### 2.1. 코드 블록 (Code Blocks)

소스 코드, 설정 파일, 터미널 명령어 등을 깔끔하게 보여줄 때 사용합니다. 언어 지정을 통해 문법 강조(Syntax Highlighting)가 가능합니다.

\`\`\`markdown
\`\`\`javascript
// 사용자 정보 가져오는 API 호출 예시
async function getUser(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
}
\`\`\`

\`\`\`markdown
\`\`\`bash
# 개발 서버 시작
npm run dev
\`\`\`
\`\`\`
`; // part3 끝

const part4 = `
### 2.2. 인라인 코드 (Inline Code)

문장 내에서 변수명, 함수명, 파일 경로, 작은 코드 조각 등을 강조할 때 사용합니다.

\`\`\`markdown
\`src/utils/auth.js\` 파일에서 \`verifyToken\` 함수를 확인해 주세요.
\`\`\`

\`src/utils/auth.js\` 파일에서 \`verifyToken\` 함수를 확인해 주세요.
`; // part4 끝

const part5 = `
### 2.3. 외부 링크 (Links)

참고 문서, 기획서, 디자인 시안, 외부 자료 등으로 바로 이동할 수 있게 연결합니다.

\`\`\`markdown
[피그마 디자인 원본 보기](https://www.figma.com/file/your-design-link)
자세한 내용은 [공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript)를 참조하세요.
\`\`\`

[피그마 디자인 원본 보기](https://www.figma.com/file/your-design-link)
자세한 내용은 [공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript)를 참조하세요.
`; // part5 끝

const part6 = `
### 2.4. 이미지 삽입 (Images)

스크린샷, 플로우차트, UI 시안, 다이어그램 등을 첨부하여 시각적으로 내용을 전달합니다.

\`\`\`markdown
![행복ICT 로고](https://www.happyict.co.kr/resources/img/common/logo_over.png "행복ICT 로고")
\`\`\`

![행복ICT 로고](https://www.happyict.co.kr/resources/img/common/logo_over.png "행복ICT 로고")

---

## 3. 정보 정리 및 관리

데이터를 구조화하거나 진행 상황을 추적하는 데 유용합니다.

### 3.1. 표 (Tables)

API 명세, 데이터베이스 스키마, 기능 목록, QA 테스트 결과 등을 깔끔하게 정리할 때 사용합니다.

\`\`\`markdown
| 필드명   | 타입   | 필수 | 설명             | 비고       |
| :------- | :----- | :--: | :--------------- | :--------- |
| userId   | string |  O   | 사용자 고유 식별자 | 최대 20자    |
| password | string |  O   | 비밀번호         | 암호화 저장 |
| email    | string |  X   | 이메일 주소      | 중복 불가  |
\`\`\`

| 필드명   | 타입   | 필수 | 설명             | 비고       |
| :------- | :----- | :--: | :--------------- | :--------- |
| userId   | string |  O   | 사용자 고유 식별자 | 최대 20자    |
| password | string |  O   | 비밀번호         | 암호화 저장 |
| email    | string |  X   | 이메일 주소      | 중복 불가  |
`; // part6 끝

const part7 = `
### 3.2. 체크박스 (Task Lists)

작업 진행 상황, 요구사항 이행 여부, 버그 수정 목록 등을 추적하는 데 효과적입니다.

\`\`\`markdown
- [x] 사용자 회원가입 기능 구현 완료
- [ ] 이메일 인증 시스템 연동
- [ ] 비밀번호 찾기 기능 개발
\`\`\`

- [x] 사용자 회원가입 기능 구현 완료
- [ ] 이메일 인증 시스템 연동
- [ ] 비밀번호 찾기 기능 개발
`; // part7 끝

const part8 = `
### 3.3. 인용문 (Blockquotes)

회의록에서 특정 발언을 인용하거나, 중요한 지시사항, 사용자 피드백 등을 강조할 때 사용합니다.

\`\`\`markdown
> "이번 스프린트의 최우선 목표는 성능 최적화입니다." - 팀 리더
>
> **주의**: 결제 모듈 변경 시 QA 테스트 필수 진행.
\`\`\`

> "이번 스프린트의 최우선 목표는 성능 최적화입니다." - 팀 리더
>
> **주의**: 결제 모듈 변경 시 QA 테스트 필수 진행.

---

## 4. 기타 유용한 문법

### 4.1. 구분선 (Horizontal Rules)

문서의 섹션을 시각적으로 명확하게 구분하여 가독성을 높입니다.

\`\`\`markdown
---
\`\`\`
`; // part8 끝

const part9 = `
---

### 4.2. 이모지 (Emojis)

텍스트에 감성이나 시각적인 재미를 더할 수 있습니다.

\`\`\`markdown
✨ 새로운 기능이 추가되었습니다!
⚠️ 경고: 배포 전 반드시 확인하세요.
\`\`\`

✨ 새로운 기능이 추가되었습니다!
⚠️ 경고: 배포 전 반드시 확인하세요.

---
`;

const DocumentGuide = () => {
    return (
        <div className={styles.documentGuide}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {part1}
            </ReactMarkdown>
            <hr className={styles.hrSubtle} /> {/* 첫 번째 얇은 구분선 */}

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {part2}
            </ReactMarkdown>
            <hr className={styles.hrSubtle} /> {/* 두 번째 얇은 구분선 */}

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {part3}
            </ReactMarkdown>
            <hr className={styles.hrSubtle} /> {/* 세 번째 얇은 구분선 */}

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {part4}
            </ReactMarkdown>
            <hr className={styles.hrSubtle} /> {/* 네 번째 얇은 구분선 */}

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {part5}
            </ReactMarkdown>
            <hr className={styles.hrSubtle} /> {/* 다섯 번째 얇은 구분선 */}

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {part6}
            </ReactMarkdown>
            <hr className={styles.hrSubtle} /> {/* 여섯 번째 얇은 구분선 */}

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {part7}
            </ReactMarkdown>
            <hr className={styles.hrSubtle} /> {/* 일곱 번째 얇은 구분선 */}

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {part8}
            </ReactMarkdown>

            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {part9}
            </ReactMarkdown>
        </div>
    );
}

export default DocumentGuide;
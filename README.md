# DoubleCheck · Frontend
미니 보험 코어 시스템 — 실제 우체국보험 데이터로, 가입부터 보험금 지급까지 **돈과 상태가 어긋나지 않는** 웹 서비스

TAVE 18기 연합 프로젝트

- 백엔드 레포: [double-check-backend](https://github.com/TAVE-DoubleCheck/double-check-backend)
- API 명세 (Swagger): https://doublecheck-server.onrender.com/swagger-ui/index.html
- 디자인: Figma `더블체크`

<br>

## 🛠 기술 스택

| 영역 | 기술 |
|---|---|
| 프레임워크 | React 19 · TypeScript · Vite |
| 라우팅 | React Router |
| 서버 상태 | TanStack React Query · Axios |
| 스타일 | Tailwind CSS v4 |
| 코드 품질 | ESLint · Prettier |
| CI | GitHub Actions (lint · build) |

<br>

## 🚀 시작하기

```bash
# 1. 의존성 설치 (Node 20 이상)
npm install

# 2. 환경변수 파일 만들기
cp .env.example .env

# 3. 개발 서버 실행 → http://localhost:5173
npm run dev
```

> 백엔드 인증 API가 나오기 전까지는 `.env`의 `VITE_USE_MOCK_AUTH=true`로 가짜 로그인을 사용합니다.
> 아이디에 `staff`가 들어가면 **직원**, 그 외는 **고객**으로 로그인됩니다. (비밀번호는 아무 값)

<br>

## 📁 폴더 구조

```
src/
├── api/            # axios 인스턴스(client.ts), 도메인별 API 함수
├── auth/           # 로그인 상태(AuthContext), 토큰 저장, useAuth
├── components/
│   ├── common/     # StatusBadge 등 공통 컴포넌트
│   └── layout/     # AppLayout, Header (역할별 메뉴)
├── constants/      # ROUTES (라우트 경로 ↔ Figma 번호)
├── hooks/          # React Query 커스텀 훅
├── pages/
│   ├── auth/       # ⓪ 로그인·회원가입
│   ├── customer/   # 가입자 화면
│   └── backoffice/ # 백오피스 화면
├── routes/         # router, RequireAuth, RequireRole, GuestOnly
├── types/          # API 타입, 계약·청구 상태
└── utils/          # 금액·날짜 포맷
```

<br>

## 🖥 화면 · 라우트 · 담당

고객과 직원은 **같은 로그인 화면**을 사용하고, 로그인 후 역할(`CUSTOMER` / `STAFF`)에 따라 첫 화면이 달라집니다.
회원가입은 고객 전용이며, 직원 계정은 백엔드에서 별도로 부여합니다.

| Figma | 화면 | 경로 | 권한 | 담당 |
|---|---|---|---|---|
| 02 · 02-1 | 로그인 · 로그인 오류 | `/login` | 비로그인 | FE B |
| 03 · 03-1 | 회원가입 | `/signup` | 비로그인 | FE B |
| 01 · 01-1 | 보험 상품 | `/products` | 누구나 | FE A |
| 04 · 12 | 가입하기 · 가입 불가 조합 | `/products/:productId/subscribe` | 고객 | FE A |
| 05 · 13 | 내 계약 · 계약 실효 | `/my/contracts` | 고객 | FE B |
| 06 | 보험금 청구 | `/my/claims/new` | 고객 | FE A |
| 07 | 청구 목록 | `/admin/claims` | 직원 | 미정 |
| 09 | 사망 청구 접수 | `/admin/claims/death/new` | 직원 | 미정 |
| 08 · 08-1 | 심사 상세 · 거절 사유 | `/admin/claims/:claimId` | 직원 | FE B |
| 10 · 14 | 지급 · 이미 지급된 건 | `/admin/payments` | 직원 | FE B |
| 11 | 시스템 관리 | `/admin/system` | 직원 | FE B |

> 백오피스 화면은 디자인이 확정되지 않았습니다. 확정 전에는 API 훅·타입·공통 컴포넌트 등 로직부터 작업합니다.

<br>

## 🌿 Git / Github

### 📌 브랜치 전략 (main, develop과 feat)
- `main`: 오직 **배포**를 위한 브랜치
- `develop`: 팀원끼리 **작업한 내용(feature)을** 합치는 곳
- `feat`: 우리가 **각 작업에 따라** 새로 파고 사용할 브랜치
> 하나의 feat 브랜치는 하나의 Issue와 연결된다!

<br>

### 📌 브랜치 네이밍 컨벤션
`커밋 컨벤션/#이슈번호/페이지 or 기능 이름`

❗여러 단어가 연결된다면 하이픈(-)으로 연결한다.❗

**예시**
> `setting/#1/router-setting` `feat/#5/login` `fix/#6/signup-form-bug-fix`

<br>

### 📌 커밋 컨벤션

`이모지 태그: 커밋 메시지 (#이슈번호)`

| 이모지 | 태그 | 설명 |
|---|---|---|
| ✨ | Feat | 새로운 기능 추가 |
| 🐛 | Fix | 버그 수정 |
| ♻️ | Refactor | 코드 리팩토링 |
| 💄 | Style | UI 스타일 수정 |
| 🔥 | Del | 코드 삭제 / 미사용 리소스 제거 |
| 📝 | Docs | 문서 작성/수정 |
| 🔧 | Chore | 설정, 패키지 설치 등 기타 작업 |
| 🚀 | Deploy | 배포 관련 작업 |
| ✅ | Test | 테스트 코드 추가/수정 |

**예시**
```bash
git commit -m "✨ Feat: 로그인 화면 구현 (#5)"
git commit -m "🐛 Fix: 로그인 시 500 오류 수정 (#6)"
git commit -m "💄 Style: 로그인 버튼 색상 변경 (#7)"
git commit -m "🔥 Del: 사용하지 않는 console.log 제거 (#8)"
git commit -m "♻️ Refactor: 보험료 계산 로직 커스텀 훅으로 분리 (#12)"
```

<br>

### 📌 브랜치 병합(merge) & 기본 규칙

- 메인 브랜치(main, develop)에서 직접적인 커밋은 하지 않는다.
- 무조건 작업 브랜치(feat)에서만 커밋을 찍어야 하고, 브랜치 병합(merge)은 PR(Pull Request)을 통해서만 가능하다.
- PR은 `develop` 브랜치를 대상으로 올린다.
- 작업 전에는 항상 `git pull origin develop`을 통해 각 feature 브랜치를 최신화해서 관리한다.
- 팀원의 리뷰 후 **1 Approve**를 받아야 merge 할 수 있다.

<br>

## ✍️ 코딩 컨벤션

### 📌 기본 (Default) 네이밍
1. 컴포넌트 / class
`PascalCase`
2. 폴더명
`camelCase`
3. 파일명 *(컴포넌트 제외)*
`camelCase`
4. 변수, 함수
`camelCase`
5. 파라미터
`camelCase`
6. 상수
`BIG_SNAKE_CASE`

<br>

### 📌 변수
1. 변수 선언 시 `var`는 사용하지 않는다.
   - 되도록 `const`를 사용하고, 필요한 경우에만 `let`을 사용한다.
2. 전역 변수는 최대한 지양한다.
3. 구조 분해 할당은 적극적으로 활용한다.

```tsx
const { name, age } = user;
```

4. 변수를 조합해서 문자열을 만들 때는 무조건 `템플릿 리터럴(백틱)`을 이용한다.
5. 변수와 함수는 의미를 잘 이해할 수 있도록 네이밍한다. **(줄임말 사용 금지)**
   - 추가적인 이해가 필요하다면 주석을 통해 이해를 돕는다.

<br>

### 📌 함수
- 함수는 기본적으로 화살표 함수를 사용한다.
- 변수와 함수는 의미를 잘 이해할 수 있도록 네이밍한다. **(줄임말 사용 금지)**
- 이벤트 핸들러 네이밍: `handle + 기능 + 이벤트`

```tsx
const handleButtonClick = () => {};
const handleTabChange = () => {};
```

- 값이 boolean일 경우는 `is + 상태` (default)

```tsx
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

> 추가적으로 `can / should / has` 정도를 상황에 맞게 사용한다.

- API 함수: `HTTP 메서드 + 명사`

```tsx
const getProducts = () => {};
const getProductDetail = () => {};
const postSignup = () => {};
```

<br>

### 📌 타입 (TS)
- 기본적으로 모든 타입에는 뒤에 `-Types`를 붙인다.
- 컴포넌트 인자에 대한 타입은 컴포넌트 바로 상단에 선언한다.
- Props 타입은 `컴포넌트명 + PropTypes`로 짓는다.

```tsx
interface IntroductionPropTypes {
  name: string;
  age: number;
}

const Introduction = ({ name, age }: IntroductionPropTypes) => {
  // ...
};
```

- object는 `interface`, 단일 변수는 `type`으로 선언한다.

<br>

## 👥 팀원

| 이름 | 역할 | 담당 |
|---|---|---|
|  | FE A | 가입자 화면 |
|  | FE B | 인증 · 공통 · 백오피스 |

# DoubleCheck · 미니 보험 코어 시스템 (Frontend)

실제 우체국보험 데이터로, 가입부터 보험금 지급까지 **돈과 상태가 어긋나지 않는** 웹 시스템의 프론트엔드입니다.
TAVE 18기 연합 프로젝트

- 백엔드: [double-check-backend](https://github.com/TAVE-DoubleCheck/double-check-backend)
- 디자인: Figma `더블체크`

## 기술 스택

| 영역 | 기술 |
|---|---|
| 프레임워크 | React 19 · TypeScript · Vite |
| 라우팅 | React Router |
| 서버 상태 | TanStack React Query · Axios |
| 스타일 | Tailwind CSS v4 |
| 코드 품질 | ESLint · Prettier |
| CI | GitHub Actions (lint · build) |

## 시작하기

```bash
# 1. 의존성 설치 (Node 20 이상)
npm install

# 2. 환경변수 파일 만들기
cp .env.example .env

# 3. 개발 서버 실행 → http://localhost:5173
npm run dev
```

### 가짜 로그인 (백엔드 인증 API 완성 전)

`.env`에서 `VITE_USE_MOCK_AUTH=true`이면 백엔드 없이 로그인할 수 있습니다.

- 아이디에 `staff`가 들어가면 **직원** → 백오피스(`/admin/claims`)로 이동
- 그 외 아이디는 **고객** → 보험 상품(`/products`)으로 이동
- 비밀번호는 아무 값이나 입력

백엔드 인증 API가 나오면 `false`로 바꾸세요.

### 스크립트

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 타입 검사 + 빌드 |
| `npm run lint` | ESLint 검사 |
| `npm run format` | Prettier 자동 정렬 |

## 폴더 구조

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
├── types/          # API 타입, 계약·청구 상태 enum
└── utils/          # 금액·날짜 포맷
```

## 화면 · 라우트 · 담당

고객과 직원은 **같은 로그인 화면**을 쓰고, 로그인 후 역할(`CUSTOMER` / `STAFF`)에 따라 첫 화면이 달라집니다.
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

## 협업 규칙

### 브랜치

백엔드와 동일하게 `타입/#이슈번호-설명` 형식을 사용합니다.

```
feat/#3-login-page
fix/#12-subscribe-premium
```

- `main`: 배포 브랜치, 직접 push 금지 (PR + 리뷰 1명 이상)

### 커밋 메시지

| 타입 | 용도 |
|---|---|
| `feat:` | 새 기능 / 화면 |
| `fix:` | 버그 수정 |
| `style:` | UI 스타일 변경 (로직 변화 없음) |
| `refactor:` | 리팩토링 |
| `chore:` | 설정, 패키지 |
| `docs:` | 문서 |
| `ci:` / `deploy:` | CI · 배포 |

예: `feat: 로그인 화면 및 로그인 오류 처리 추가 #3`

### 작업 흐름

1. GitHub Issue 생성 (Figma 번호 기재) → 담당자 지정
2. 이슈 번호로 브랜치 생성
3. 작업 후 PR → 리뷰 → merge

## 백엔드 확인 필요 (TODO)

- [ ] 로그인 응답에 `role` 포함 여부 / 역할 이름 (`CUSTOMER`, `STAFF`)
- [ ] access token 만료 시간, refresh token 사용 여부
- [ ] 로그인·회원가입 엔드포인트 경로 (`src/api/auth.ts`)
- [ ] 에러 응답 형식 (`{ code, message }`)
- [ ] 계약·청구 상태 enum 이름 (`src/types/status.ts`)
- [ ] 개발·시연용 직원 계정

## 팀원

| 이름 | 역할 | 담당 |
|---|---|---|
|  | FE A | 가입자 화면 |
|  | FE B | 인증 · 공통 · 백오피스 |

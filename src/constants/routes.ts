/**
 * 라우트 경로 모음. Figma 프레임 번호를 주석으로 표시.
 * 경로를 바꿀 때는 여기만 수정하세요.
 */
export const ROUTES = {
  // ⓪ 로그인·회원가입 (공통)
  LOGIN: '/login', // 02 로그인 · 02-1 로그인 오류
  SIGNUP: '/signup', // 03 회원가입 · 03-1 생년월일 선택

  // 가입자 (고객)
  PRODUCTS: '/products', // 01 보험 상품 · 01-1 프로필 메뉴
  SUBSCRIBE: '/products/:productId/subscribe', // 04 가입하기 · 04-1~4 · 12 가입 불가 조합
  MY_CONTRACTS: '/my/contracts', // 05 내 계약 · 13 계약 실효
  CLAIM_NEW: '/my/claims/new', // 06 보험금 청구 · 06-1 · 06-2

  // 백오피스 (직원) — 디자인 변경 가능성 있음
  ADMIN_CLAIMS: '/admin/claims', // 07 청구 목록 · 07-1 프로필 메뉴
  ADMIN_DEATH_CLAIM_NEW: '/admin/claims/death/new', // 09 사망 청구 접수 · 09-1 · 09-2
  ADMIN_CLAIM_DETAIL: '/admin/claims/:claimId', // 08 심사 상세 · 08-1 거절 사유
  ADMIN_PAYMENTS: '/admin/payments', // 10 지급 · 14 이미 지급된 건
  ADMIN_SYSTEM: '/admin/system', // 11 시스템 관리
} as const;

export const subscribePath = (productId: string | number) =>
  ROUTES.SUBSCRIBE.replace(':productId', String(productId));

export const claimDetailPath = (claimId: string | number) =>
  ROUTES.ADMIN_CLAIM_DETAIL.replace(':claimId', String(claimId));

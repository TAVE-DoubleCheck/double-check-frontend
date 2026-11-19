/**
 * 인증 관련 타입
 * TODO(백엔드 확인): 역할 이름, 로그인 응답 형식, refresh token 여부
 */

/** 고객은 회원가입으로 생성, 직원은 백엔드에서 별도 계정 부여 */
export type Role = 'CUSTOMER' | 'STAFF';

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  role: Role;
  name: string;
}

/** 회원가입은 고객 전용 */
export interface SignupRequest {
  loginId: string;
  password: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  gender: 'MALE' | 'FEMALE';
}

export interface AuthUser {
  name: string;
  role: Role;
}

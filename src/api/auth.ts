import { apiClient } from '@/api/client';
import type { LoginRequest, LoginResponse, SignupRequest } from '@/types/auth';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

/**
 * TODO(백엔드 확인): 엔드포인트 경로를 Swagger 명세에 맞춰 수정
 */
export const authApi = {
  async login(body: LoginRequest): Promise<LoginResponse> {
    if (USE_MOCK) return mockLogin(body);
    const { data } = await apiClient.post<LoginResponse>('/api/auth/login', body);
    return data;
  },

  async signup(body: SignupRequest): Promise<void> {
    if (USE_MOCK) return;
    await apiClient.post('/api/auth/signup', body);
  },
};

/** 백엔드 인증 API 완성 전 화면 개발용. 아이디에 'staff'가 포함되면 직원으로 로그인 */
async function mockLogin({ loginId, password }: LoginRequest): Promise<LoginResponse> {
  await new Promise((r) => setTimeout(r, 300));
  if (!password) throw new Error('비밀번호를 입력해주세요.');
  const isStaff = loginId.includes('staff');
  return {
    accessToken: `mock-token-${Date.now()}`,
    role: isStaff ? 'STAFF' : 'CUSTOMER',
    name: isStaff ? '심사 담당자' : '홍길동',
  };
}

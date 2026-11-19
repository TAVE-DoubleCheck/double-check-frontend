import axios, { AxiosError } from 'axios';
import { tokenStorage } from '@/auth/tokenStorage';

/** 모든 API 호출은 이 인스턴스를 사용하세요. */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// 요청마다 JWT 토큰 첨부
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401(토큰 만료·무효)이면 로그아웃 후 로그인 화면으로
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && tokenStorage.getToken()) {
      tokenStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

/**
 * 백엔드 에러 응답에서 사용자에게 보여줄 메시지를 꺼냅니다.
 * TODO(백엔드 확인): 에러 응답 형식 { code, message } 맞는지
 */
export function getErrorMessage(error: unknown, fallback = '요청 처리 중 문제가 발생했습니다.') {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}

import type { AuthUser } from '@/types/auth';

const TOKEN_KEY = 'dc_access_token';
const USER_KEY = 'dc_user';

/** 토큰·사용자 정보 저장소 (localStorage) */
export const tokenStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),

  getUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  },

  save(token: string, user: AuthUser) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

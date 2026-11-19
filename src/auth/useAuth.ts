import { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import { ROUTES } from '@/constants/routes';
import type { Role } from '@/types/auth';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.');
  return ctx;
}

/** 역할별 첫 화면 */
export const homePathByRole = (role: Role) =>
  role === 'STAFF' ? ROUTES.ADMIN_CLAIMS : ROUTES.PRODUCTS;

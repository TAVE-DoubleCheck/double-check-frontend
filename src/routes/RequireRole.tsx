import { Navigate, Outlet } from 'react-router-dom';
import { homePathByRole, useAuth } from '@/auth/useAuth';
import type { Role } from '@/types/auth';

/** 역할이 다르면 자기 역할의 첫 화면으로 보냄 (고객 → /admin 차단, 직원 → /my 차단) */
export function RequireRole({ role }: { role: Role }) {
  const { user } = useAuth();

  if (user && user.role !== role) {
    return <Navigate to={homePathByRole(user.role)} replace />;
  }
  return <Outlet />;
}

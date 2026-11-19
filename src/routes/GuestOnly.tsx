import { Navigate, Outlet } from 'react-router-dom';
import { homePathByRole, useAuth } from '@/auth/useAuth';

/** 이미 로그인한 사용자가 로그인·회원가입 화면에 들어오면 첫 화면으로 보냄 */
export function GuestOnly() {
  const { user } = useAuth();
  if (user) return <Navigate to={homePathByRole(user.role)} replace />;
  return <Outlet />;
}

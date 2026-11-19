import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';
import { ROUTES } from '@/constants/routes';

/** 로그인하지 않았으면 로그인 화면으로 보냄 (로그인 후 원래 페이지로 돌아오도록 from 전달) */
export function RequireAuth() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}

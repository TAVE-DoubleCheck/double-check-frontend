import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';
import { ROUTES } from '@/constants/routes';
import type { Role } from '@/types/auth';

const MENUS: Record<Role, { label: string; to: string }[]> = {
  CUSTOMER: [
    { label: '보험 상품', to: ROUTES.PRODUCTS },
    { label: '내 계약', to: ROUTES.MY_CONTRACTS },
    { label: '보험금 청구', to: ROUTES.CLAIM_NEW },
  ],
  STAFF: [
    { label: '청구 심사', to: ROUTES.ADMIN_CLAIMS },
    { label: '지급', to: ROUTES.ADMIN_PAYMENTS },
    { label: '시스템 관리', to: ROUTES.ADMIN_SYSTEM },
  ],
};

/**
 * 공통 헤더. 역할에 따라 메뉴가 바뀜.
 * TODO: 01-1 / 07-1 프로필 메뉴 드롭다운, 시스템 날짜(시계) 표시
 */
export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menus = user ? MENUS[user.role] : [];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-primary text-lg font-bold">
            DoubleCheck
          </Link>
          <nav className="flex gap-6">
            {menus.map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                className={({ isActive }) =>
                  isActive ? 'text-primary font-semibold' : 'text-gray-600 hover:text-gray-900'
                }
              >
                {m.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="text-gray-700">
                {user.name} {user.role === 'STAFF' && '(직원)'}
              </span>
              <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900">
                로그아웃
              </button>
            </>
          ) : (
            <Link to={ROUTES.LOGIN} className="text-gray-700 hover:text-gray-900">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

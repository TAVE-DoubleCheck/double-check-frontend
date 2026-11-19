import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ROUTES } from '@/constants/routes';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { ClaimDetailPage } from '@/pages/backoffice/ClaimDetailPage';
import { ClaimListPage } from '@/pages/backoffice/ClaimListPage';
import { DeathClaimNewPage } from '@/pages/backoffice/DeathClaimNewPage';
import { PaymentPage } from '@/pages/backoffice/PaymentPage';
import { SystemPage } from '@/pages/backoffice/SystemPage';
import { ClaimNewPage } from '@/pages/customer/ClaimNewPage';
import { MyContractsPage } from '@/pages/customer/MyContractsPage';
import { ProductListPage } from '@/pages/customer/ProductListPage';
import { SubscribePage } from '@/pages/customer/SubscribePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { GuestOnly } from '@/routes/GuestOnly';
import { RequireAuth } from '@/routes/RequireAuth';
import { RequireRole } from '@/routes/RequireRole';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.PRODUCTS} replace /> },

  // ⓪ 로그인·회원가입: 로그인 안 한 사람만
  {
    element: <GuestOnly />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.SIGNUP, element: <SignupPage /> },
    ],
  },

  {
    element: <AppLayout />,
    children: [
      // 01 상품 목록은 로그인 없이도 볼 수 있음 (TODO: 기획 확정 시 조정)
      { path: ROUTES.PRODUCTS, element: <ProductListPage /> },

      {
        element: <RequireAuth />,
        children: [
          // 가입자 (고객)
          {
            element: <RequireRole role="CUSTOMER" />,
            children: [
              { path: ROUTES.SUBSCRIBE, element: <SubscribePage /> },
              { path: ROUTES.MY_CONTRACTS, element: <MyContractsPage /> },
              { path: ROUTES.CLAIM_NEW, element: <ClaimNewPage /> },
            ],
          },
          // 백오피스 (직원)
          {
            element: <RequireRole role="STAFF" />,
            children: [
              { path: ROUTES.ADMIN_CLAIMS, element: <ClaimListPage /> },
              { path: ROUTES.ADMIN_DEATH_CLAIM_NEW, element: <DeathClaimNewPage /> },
              { path: ROUTES.ADMIN_CLAIM_DETAIL, element: <ClaimDetailPage /> },
              { path: ROUTES.ADMIN_PAYMENTS, element: <PaymentPage /> },
              { path: ROUTES.ADMIN_SYSTEM, element: <SystemPage /> },
            ],
          },
        ],
      },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
]);

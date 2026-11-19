import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';

/** 로그인 이후 화면 공통 레이아웃 (헤더 + 본문) */
export function AppLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@/api/client';
import { homePathByRole, useAuth } from '@/auth/useAuth';
import { ROUTES } from '@/constants/routes';

/**
 * Figma 02 로그인 · 02-1 로그인 오류 (담당 FE B)
 * 고객·직원 공통 로그인. 로그인 후 역할에 따라 첫 화면이 달라짐.
 * TODO: Figma 시안대로 스타일 적용
 */
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const user = await login({ loginId, password });
      navigate(from ?? homePathByRole(user.role), { replace: true });
    } catch (err) {
      // 02-1 로그인 오류
      setError(getErrorMessage(err, '아이디 또는 비밀번호가 올바르지 않습니다.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-sm"
      >
        <h1 className="text-primary text-center text-2xl font-bold">DoubleCheck</h1>

        <input
          className="focus:border-primary w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          className="focus:border-primary w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && <p className="text-danger text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !loginId || !password}
          className="bg-primary hover:bg-primary-dark w-full rounded-lg py-3 font-semibold text-white disabled:opacity-50"
        >
          {submitting ? '로그인 중...' : '로그인'}
        </button>

        <p className="text-center text-sm text-gray-500">
          아직 회원이 아니신가요?{' '}
          <Link to={ROUTES.SIGNUP} className="text-primary font-medium">
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
}

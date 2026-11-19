import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '@/api/auth';
import { getErrorMessage } from '@/api/client';
import { ROUTES } from '@/constants/routes';
import type { SignupRequest } from '@/types/auth';

/**
 * Figma 03 회원가입 · 03-1 생년월일 선택 (담당 FE B)
 * 고객 전용. 직원 계정은 백엔드에서 별도로 부여함.
 * 생년월일·성별은 가입 시 보험료 계산(나이·성별 요율)에 쓰임.
 * TODO: Figma 시안대로 스타일 적용, 03-1 생년월일 선택 UI(DatePicker)로 교체
 */
const initialForm: SignupRequest = {
  loginId: '',
  password: '',
  name: '',
  birthDate: '',
  gender: 'MALE',
};

export function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignupRequest>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof SignupRequest>(key: K, value: SignupRequest[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await authApi.signup(form);
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, '회원가입에 실패했습니다.'));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary';

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-sm"
      >
        <h1 className="text-center text-2xl font-bold">회원가입</h1>

        <input
          className={inputClass}
          placeholder="이름"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
        />
        <input
          className={inputClass}
          placeholder="아이디"
          value={form.loginId}
          onChange={(e) => update('loginId', e.target.value)}
        />
        <input
          type="password"
          className={inputClass}
          placeholder="비밀번호"
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
        />
        <input
          type="date"
          className={inputClass}
          value={form.birthDate}
          onChange={(e) => update('birthDate', e.target.value)}
        />
        <div className="flex gap-2">
          {(['MALE', 'FEMALE'] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => update('gender', g)}
              className={`flex-1 rounded-lg border py-3 ${
                form.gender === g ? 'border-primary text-primary font-semibold' : 'border-gray-300'
              }`}
            >
              {g === 'MALE' ? '남성' : '여성'}
            </button>
          ))}
        </div>

        {error && <p className="text-danger text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-primary hover:bg-primary-dark w-full rounded-lg py-3 font-semibold text-white disabled:opacity-50"
        >
          {submitting ? '가입 중...' : '가입하기'}
        </button>

        <p className="text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary font-medium">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}

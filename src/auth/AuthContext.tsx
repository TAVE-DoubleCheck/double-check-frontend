import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import { authApi } from '@/api/auth';
import { tokenStorage } from '@/auth/tokenStorage';
import type { AuthUser, LoginRequest } from '@/types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (body: LoginRequest) => Promise<AuthUser>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    tokenStorage.getToken() ? tokenStorage.getUser() : null,
  );

  const login = useCallback(async (body: LoginRequest) => {
    const res = await authApi.login(body);
    const nextUser: AuthUser = { name: res.name, role: res.role };
    tokenStorage.save(res.accessToken, nextUser);
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoggedIn: user !== null, login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

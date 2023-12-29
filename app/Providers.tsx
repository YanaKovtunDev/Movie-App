'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

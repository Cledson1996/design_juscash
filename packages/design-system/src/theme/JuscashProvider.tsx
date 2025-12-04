'use client';

import React from 'react';
import { ConfigProvider, type ThemeConfig } from 'antd';
import { juscashTokens } from './tokens';
import 'antd/dist/reset.css';

export interface JuscashProviderProps {
  themeOverride?: ThemeConfig;
  children: React.ReactNode;
}

const baseTheme: ThemeConfig = {
  token: {
    colorPrimary: juscashTokens.colorPrimary,
    colorSuccess: juscashTokens.colorSuccess,
    colorWarning: juscashTokens.colorWarning,
    colorError: juscashTokens.colorError,
    borderRadius: juscashTokens.borderRadius
  }
};

export const JuscashProvider: React.FC<JuscashProviderProps> = ({
  themeOverride,
  children
}) => {
  const mergedTheme: ThemeConfig = {
    ...baseTheme,
    ...themeOverride,
    token: {
      ...baseTheme.token,
      ...(themeOverride?.token ?? {})
    }
  };

  return <ConfigProvider theme={mergedTheme}>{children}</ConfigProvider>;
};



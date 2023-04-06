import '../styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalThemeProvider from '@/styles/GlobalThemeContext';
import { RecoilRoot } from 'recoil';
import GNB from '@/components/GNB';
import { css } from '@emotion/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalThemeProvider>
      <RecoilRoot>
        <div
          css={css`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 100;
          `}
        >
          <GNB />
        </div>
        <Component {...pageProps} />
      </RecoilRoot>
    </GlobalThemeProvider>
  );
}

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from '../redux/store';
import { Header } from '../components/Header';
import { setUserData } from '../redux/slices/user';
import { Api } from '../utils/api';
import { theme } from '../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

import '../styles/globals.scss';
import 'macro-css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RJournal</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps((store) =>
    async ({ ctx, Component }) => {
      try {
        const userData = await Api(ctx).user.getMe();

        store.dispatch(setUserData(userData));
      } catch (err) {
        if (ctx.asPath == '/write') {
          ctx.res?.writeHead(302, {
            Location: '/403',
          });
          ctx.res?.end();
        }

        console.log(err);
      }

      return {
        pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
      };
    }
);

export default wrapper.withRedux(App);

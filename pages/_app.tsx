import React from 'react';
import { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';
import ContextProvider from '../@gotrust/utility/ContextProvider';
import CremaThemeProvider from '../@gotrust/utility/CremaThemeProvider';
import CremaStyleProvider from '../@gotrust/utility/CremaStyleProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/index.css';
import '../@gotrust/services/index';
import AuthRoutes from '../@gotrust/utility/AuthRoutes';
import PageMeta from '../@gotrust/core/PageMeta';
import { LocaleProvider } from '../@gotrust';

const CremaApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <PageMeta />
      <ContextProvider>
        <Provider store={store}>
          <CremaThemeProvider>
            <CremaStyleProvider>
              <LocaleProvider>
                <AuthRoutes>
                  <CssBaseline />
                  <Component {...pageProps} />
                </AuthRoutes>
              </LocaleProvider>
            </CremaStyleProvider>
          </CremaThemeProvider>
        </Provider>
      </ContextProvider>
    </React.Fragment>
  );
};
export default CremaApp;

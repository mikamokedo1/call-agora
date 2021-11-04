import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from 'react-toastify';
import AppLayout from './@crema/core/AppLayout';
import AuthRoutes from './@crema/utility/AuthRoutes';
import LocaleProvider from './@crema/utility/LocaleProvider';
import CremaThemeProvider from './@crema/utility/CremaThemeProvider';
import CremaStyleProvider from './@crema/utility/CremaStyleProvider';
import ContextProvider from './@crema/utility/ContextProvider';
import 'react-toastify/dist/ReactToastify.css';

import configureStore, { history } from './redux/store';

const store = configureStore();

const App = () => (
  <ContextProvider>
    <ToastContainer />
    <Provider store={store}>
      <CremaThemeProvider>
        <CremaStyleProvider>
          <LocaleProvider>
            <ConnectedRouter history={history}>
              <AuthRoutes>
                <CssBaseline />
                <AppLayout />
              </AuthRoutes>
            </ConnectedRouter>
          </LocaleProvider>
        </CremaStyleProvider>
      </CremaThemeProvider>
    </Provider>
  </ContextProvider>
);

export default App;

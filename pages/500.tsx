import React from 'react';
import AppPage from '../@gotrust/hoc/AppPage';
import asyncComponent from '../@gotrust/utility/asyncComponent';

const Error500 = asyncComponent(() => import('../modules/errorPages/Error500'));
export default AppPage(() => <Error500 />);

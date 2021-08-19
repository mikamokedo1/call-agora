import React from 'react';
import AppPage from '../@gotrust/hoc/AppPage';
import asyncComponent from '../@gotrust/utility/asyncComponent';

const Error404 = asyncComponent(() => import('../modules/errorPages/Error404'));
export default AppPage(() => <Error404/>);

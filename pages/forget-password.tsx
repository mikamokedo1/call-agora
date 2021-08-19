import React from 'react';
import AppPage from '../@gotrust/hoc/DefaultPage';
import asyncComponent from '../@gotrust/utility/asyncComponent';

const ForgetPassword = asyncComponent(() => import('../modules/auth/ForgetPassword'));
export default AppPage(() => <ForgetPassword/>);

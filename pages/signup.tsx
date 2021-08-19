import React from 'react';
import AppPage from '../@gotrust/hoc/DefaultPage';
import asyncComponent from '../@gotrust/utility/asyncComponent';

const SignUP = asyncComponent(() => import('../modules/auth/Signup'));
export default AppPage(() => <SignUP/>);

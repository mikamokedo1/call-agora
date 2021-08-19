import React from 'react';
import AppPage from '../@gotrust/hoc/DefaultPage';
import asyncComponent from '../@gotrust/utility/asyncComponent';

const SignIn = asyncComponent(() => import('../modules/auth/Signin'));
export default AppPage(() => <SignIn/>);

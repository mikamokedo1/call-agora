import React from 'react';
import AppPage from '../../@gotrust/hoc/AppPage';
import asyncComponent from '../../@gotrust/utility/asyncComponent';

const Request = asyncComponent(() => import('../../modules/application/Pages/Request'));
export default AppPage(() => <Request />);

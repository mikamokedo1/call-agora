import React from 'react';
import AppPage from '../../@gotrust/hoc/AppPage';
import asyncComponent from '../../@gotrust/utility/asyncComponent';

const Customer = asyncComponent(() => import('../../modules/application/Pages/Customer'));
export default AppPage(() => <Customer />);

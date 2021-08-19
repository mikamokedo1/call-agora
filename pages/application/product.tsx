import React from 'react';
import AppPage from '../../@gotrust/hoc/AppPage';
import asyncComponent from '../../@gotrust/utility/asyncComponent';

const Product = asyncComponent(() => import('../../modules/application/Product'));
export default AppPage(() => <Product />);

import React from 'react';
import AppPage from '../../@gotrust/hoc/AppPage';
import asyncComponent from '../../@gotrust/utility/asyncComponent';

const Search = asyncComponent(() => import('../../modules/application/Pages/Search'));
export default AppPage(() => <Search />);

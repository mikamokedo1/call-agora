import React from 'react';
import AppPage from '../../@gotrust/hoc/AppPage';
import asyncComponent from '../../@gotrust/utility/asyncComponent';

const Message = asyncComponent(() => import('../../modules/application/Pages/Message'));
export default AppPage(() => <Message />);

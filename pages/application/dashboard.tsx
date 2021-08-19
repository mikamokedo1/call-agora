import React from 'react';
import AppPage from '../../@gotrust/hoc/AppPage';
import asyncComponent from '../../@gotrust/utility/asyncComponent';

const Dashboard = asyncComponent(() => import('../../modules/application/Pages/Dashboard'));
export default AppPage(() => <Dashboard />);

// import React from 'react';
// import AppPage from '../../@gotrust/hoc/AppPage'
// import asyncComponent from "../../@gotrust/utility/asyncComponent";
// import PageMeta from "../../@gotrust/core/PageMeta";

// const HealthCare = asyncComponent(() => import('../../modules/dashboard/HealthCare'));
// export default AppPage(() => <React.Fragment>
//   <PageMeta title="Health Care | Crema " />
//   <HealthCare/>
// </React.Fragment>);

import React from 'react';

export const dashboardPagesConfig = [
  {
    // auth: ['user'],
    routes: [
      {
        path: '/dashboards/ctv',
        component: React.lazy(() => import('./pages/index')),
      },
    ],
  },
];

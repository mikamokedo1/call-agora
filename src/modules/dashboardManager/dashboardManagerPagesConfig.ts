import React from 'react';

export const dashboardManagerPagesConfig = [
  {
    auth: ['manager'],
    routes: [
      {
        path: '/manager',
        component: React.lazy(() => import('./pages/index')),
      },
    ],
  },
];

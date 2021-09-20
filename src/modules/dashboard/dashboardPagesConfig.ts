import React from 'react';

export const dashboardPagesConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: '/partner',
        component: React.lazy(() => import('./pages/index')),
      },
    ],
  },
];

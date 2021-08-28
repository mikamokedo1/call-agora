import React from 'react';

export const settingRouterConfig = [
  {
    // auth: ['user'],
    routes: [
      {
        path: '/setting',
        component: React.lazy(() => import('./pages/index')),
      },
    ],
  },
];

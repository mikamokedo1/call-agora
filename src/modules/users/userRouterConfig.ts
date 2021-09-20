import React from 'react';

export const userRouterConfig = [
  {
    auth: ['manager'],
    routes: [
      {
        path: '/users',
        component: React.lazy(() => import('./pages/index')),
      },
    ],
  },
];

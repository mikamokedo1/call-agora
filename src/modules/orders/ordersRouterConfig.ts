import React from 'react';

export const ordersRouterConfig = [
  {
    auth: ['manager'],
    routes: [
      {
        path: '/orders',
        component: React.lazy(() => import('./pages/index')),
      },
    ],
  },
];

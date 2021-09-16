import React from 'react';

export const ticketRouterConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: '/ticket',
        component: React.lazy(() => import('./pages/index')),
      },
    ],
  },
];

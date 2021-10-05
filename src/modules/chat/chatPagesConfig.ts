import React from 'react';

export const chatPagesConfig = [
  {
    auth: ['user', 'manage'],
    routes: [
      {
        path: '/chat',
        component: React.lazy(() => import('./pages/index')),
      },
    ],
  },
];

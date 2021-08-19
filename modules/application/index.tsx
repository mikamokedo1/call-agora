import React from 'react';

export const applicationPagesConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: '/application/dashboard',
        component: React.lazy(() => import('./Pages/Dashboard')),
      },
    ],
  },
  {
    auth: ['user'],
    routes: [
      {
        path: '/application/search',
        component: React.lazy(() => import('./Pages/Search')),
      },
    ],
  },
  {
    auth: ['user'],
    routes: [
      {
        path: '/application/request',
        component: React.lazy(() => import('./Pages/Request')),
      },
    ],
  },
  {
    auth: ['user'],
    routes: [
      {
        path: '/application/customer',
        component: React.lazy(() => import('./Pages/Customer')),
      },
    ],
  },
  {
    auth: ['user'],
    routes: [
      {
        path: '/application/product',
        component: React.lazy(() => import('./Product')),
      },
    ],
  },
  {
    auth: ['user'],
    routes: [
      {
        path: '/application/message',
        component: React.lazy(() => import('./Pages/Message')),
      },
    ],
  },
];

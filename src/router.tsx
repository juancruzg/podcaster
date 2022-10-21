import React from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from './app/layout';
import { Home } from './app/pages/home';

export function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

import React from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from './app/pages/home';

export default function BasicExample() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
}

import React from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from './app/layout';
import { Home } from './app/pages/home';
import { PodcastDetail } from './app/pages/podcastDetail';

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
        {
          path: '/podcast/:id',
          element: <PodcastDetail />,
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

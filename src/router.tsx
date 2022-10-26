import React from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from './app/layout';
import { Home } from './app/pages/home';
import { PodcastDetail } from './app/pages/podcastDetail';
import { EpisodeDetail } from './app/pages/podcastDetail/components/episodeDetail';
import { EpisodesOverview } from './app/pages/podcastDetail/components/episodesOverview';

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
          path: '/podcast/:podcastId',
          element: <PodcastDetail />,
          children: [
            {
              path: '',
              element: <EpisodesOverview />,
            },
            {
              path: 'episode/:episodeId',
              element: <EpisodeDetail />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

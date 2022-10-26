import React, { useEffect, useState } from 'react';

import { Outlet, useParams } from 'react-router-dom';

import { Podcast } from '../../models/podcast';
import { getPodcast } from '../../services/podcastService';
import { PodcastSummary } from '../components/podcastSummaryCard';

export function PodcastDetail() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState<Podcast>();

  if (!podcastId) {
    throw new Error('podcastId is a required path param');
  }

  useEffect(() => {
    getPodcast(podcastId)
      .then((podcastResponse) => setPodcast(podcastResponse))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Something went wrong:', error);
      });
  }, [podcastId]);

  if (!podcast) {
    return <span>Loading...</span>;
  }

  return (
    <div className="podcast-detail">
      <div className="podcast-detail__summary">
        <PodcastSummary
          podcastId={podcast.id}
          author={podcast.author}
          description={podcast.description}
          image={{
            alt: 'podcast-avatar',
            src: podcast.imageURL,
          }}
          title={podcast.name}
        />
      </div>
      <div className="podcast-detail__content">
        <Outlet context={{ podcast }} />
      </div>
    </div>
  );
}

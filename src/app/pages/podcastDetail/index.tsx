import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Card } from '../../components/card';
import { Podcast } from '../../models/podcast';
import { getPodcast } from '../../services/podcastService';
import { PodcastSummary } from '../components/podcastSummaryCard';
import { EpisodesTable } from './components/episodesTable';

export function PodcastDetail() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState<Podcast>();

  if (!id) {
    throw new Error('ID is a required path param');
  }

  useEffect(() => {
    getPodcast(id)
      .then((podcastResponse) => setPodcast(podcastResponse))
      .catch(() => {
        // TODO: Handle error
      });
  }, [id]);

  if (!podcast) {
    return <span>Loading...</span>;
  }

  return (
    <div className="podcast-detail">
      <div className="podcast-detail__summary">
        <PodcastSummary
          author={podcast.author}
          description={podcast.description}
          image={{
            alt: 'podcast-avatar',
            src: podcast.imageURL,
          }}
          title={podcast.name}
        />
      </div>
      <div className="podcast-detail__episodes">
        <Card className="podcast-detail__episodes-title__card">Episodes: {podcast.episodes.length}</Card>
        <Card className="podcast-detail__episodes__card">
          <EpisodesTable episodes={podcast.episodes} />
        </Card>
      </div>
    </div>
  );
}

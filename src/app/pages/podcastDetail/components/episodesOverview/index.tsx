import React from 'react';

import { useOutletContext } from 'react-router-dom';

import { Card } from '../../../../components/card';
import { Podcast } from '../../../../models/podcast';
import { EpisodesTable } from './components/episodesTable';

export function EpisodesOverview() {
  const { podcast } = useOutletContext<{ podcast: Podcast }>();

  if (!podcast) {
    return null;
  }

  return (
    <div className="podcast-detail-episodes">
      <Card className="podcast-detail-episodes__title__card">Episodes: {podcast.episodes.length}</Card>
      <Card className="podcast-detail-episodes__card">
        <EpisodesTable episodes={podcast.episodes} />
      </Card>
    </div>
  );
}

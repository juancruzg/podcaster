import React from 'react';

import { useOutletContext, useParams } from 'react-router-dom';

import { Podcast } from '../../../../models/podcast';
import { EpisodeSummaryCard } from './components/episodeSummaryCard';

export function EpisodeDetail() {
  const { podcast } = useOutletContext<{ podcast: Podcast }>();
  const { episodeId } = useParams();

  if (!episodeId) {
    throw new Error('episodeId is a required path param');
  }

  const episode = podcast.episodes.find((findEpisode) => findEpisode.id.toString() === episodeId.toString());

  if (!episode) {
    throw new Error('episode could not be found');
  }

  return (
    <div className="episode-detail">
      <EpisodeSummaryCard title={episode.title} description={episode.description} previewURL={episode.previewURL} />
    </div>
  );
}

/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-danger */
import React from 'react';

import { sanitize } from 'dompurify';

import { Card } from '../../../../../../components/card';

export interface EpisodeSummaryCardProps {
  title: string;
  description: string | JSX.Element;
  previewURL: string;
}

export function EpisodeSummaryCard({ title, description, previewURL }: EpisodeSummaryCardProps) {
  const cleanDescription = sanitize(description, { USE_PROFILES: { html: true } });

  return (
    <Card className="episode-detail-card">
      <section className="episode-detail-card__section">
        <h2 className="episode-detail-card__section__title">{title}</h2>
        <span
          className="episode-detail-card__section__description"
          dangerouslySetInnerHTML={{ __html: cleanDescription }}
        />
        {/* I couldn't find track captions for the audios. Didn't have time to look them up. I would probably find them in the feed file */}
        <audio className="episode-detail-card__section__audio" controls src={previewURL}>
          <a href="/media/cc0-audio/t-rex-roar.mp3">Download audio</a>
        </audio>
      </section>
    </Card>
  );
}

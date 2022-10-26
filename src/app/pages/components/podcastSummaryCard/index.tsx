import React from 'react';

import { Card } from '../../../components/card';
import { ImageTypeEnum } from '../../../enums/ImageTypeEnum';

export interface PodcastSummaryProps {
  podcastId: string;
  image: {
    alt: string;
    src: string;
  };
  title: string;
  author: string;
  description: string;
}

export function PodcastSummary({ podcastId, author, description, image, title }: PodcastSummaryProps) {
  return (
    <Card
      smallPadding
      href={`/podcast/${podcastId}`}
      image={{
        alt: image.alt,
        src: image.src,
        type: ImageTypeEnum.SQUARE,
      }}
    >
      <hr className="podcast-summary__separator" />
      <section className="podcast-summary__primary-detail">
        <h2 className="podcast-summary__primary-detail__title">{title}</h2>
        <p className="podcast-summary__primary-detail__description">by {author}</p>
      </section>
      <hr className="podcast-summary__separator" />
      <div className="podcast-summary__secondary-detail">
        <h3 className="podcast-summary__secondary-detail__title">Description:</h3>
        <p className="podcast-summary__secondary-detail__description">{description}</p>
      </div>
    </Card>
  );
}

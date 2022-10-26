import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { PodcastSummary, PodcastSummaryProps } from '../../../../../app/pages/components/podcastSummaryCard';

describe('PodcastSummaryCard', () => {
  let props: PodcastSummaryProps;

  beforeEach(() => {
    props = {
      podcastId: '1',
      author: 'author',
      description: 'description',
      image: {
        alt: 'alt-img',
        src: 'https://image.com/test.png',
      },
      title: 'title',
    };
  });

  test('renders podcast summary card as default', () => {
    render(
      <PodcastSummary
        podcastId={props.podcastId}
        author={props.author}
        description={props.description}
        image={props.image}
        title={props.title}
      />,
      {
        wrapper: MemoryRouter,
      },
    );

    const image = screen.getByAltText('alt-img');

    expect(screen.getByText('by author')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveProperty('src', 'https://image.com/test.png');
    expect(screen.getByText('title')).toBeInTheDocument();
  });
});

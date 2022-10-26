import React from 'react';

import { render, screen } from '@testing-library/react';

import {
  EpisodeSummaryCard,
  EpisodeSummaryCardProps,
} from '../../../../../../../../app/pages/podcastDetail/components/episodeDetail/components/episodeSummaryCard';

describe('EpisodeSummaryCard', () => {
  let props: EpisodeSummaryCardProps;

  beforeEach(() => {
    props = {
      description: 'description',
      previewURL: 'https://preview.com/test',
      title: 'title',
    };
  });

  test('renders episode summary card component', async () => {
    render(<EpisodeSummaryCard description={props.description} previewURL={props.previewURL} title={props.title} />);

    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
  });

  test('renders episode summary card component with html description', async () => {
    props.description = '<p>description</p>';

    render(<EpisodeSummaryCard description={props.description} previewURL={props.previewURL} title={props.title} />);

    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
  });

  test('renders episode summary card component with impure html description', async () => {
    props.description = '<p>description<iframe//src=jAva&Tab;script:alert(3)>def</p>';

    render(<EpisodeSummaryCard description={props.description} previewURL={props.previewURL} title={props.title} />);

    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
  });
});

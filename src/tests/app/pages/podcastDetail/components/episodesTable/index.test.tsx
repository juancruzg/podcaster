import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { EpisodesTable, EpisodesTableProps } from '../../../../../../app/pages/podcastDetail/components/episodesTable';

describe('EpisodesTable', () => {
  let props: EpisodesTableProps;

  beforeEach(() => {
    props = {
      episodes: [
        {
          date: '2022-05-20 15:00:00.000',
          duration: 20000,
          id: '1',
          title: 'Episode 1',
        },
        {
          date: '2022-05-19 15:00:00.000',
          duration: 30000,
          id: '2',
          title: 'Episode 2',
        },
      ],
    };
  });

  test('renders podcast summary card as default', () => {
    render(<EpisodesTable episodes={props.episodes} />, { wrapper: MemoryRouter });

    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Episode 2')).toBeInTheDocument();
    expect(screen.getByText('00:20')).toBeInTheDocument();
    expect(screen.getByText('00:30')).toBeInTheDocument();
    expect(screen.getByText('20/05/2022')).toBeInTheDocument();
    expect(screen.getByText('19/05/2022')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
  });
});

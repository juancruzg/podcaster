import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter, useOutletContext } from 'react-router-dom';

import { EpisodesOverview } from '../../../../../../app/pages/podcastDetail/components/episodesOverview';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

describe('EpisodeOverview', () => {
  beforeEach(() => {
    (useOutletContext as jest.Mock).mockImplementation(() => ({
      podcast: {
        episodes: [
          {
            date: '2022-05-20',
            duration: 20000,
            id: '1',
            title: 'title',
            description: 'description',
            previewURL: 'https://preview.com/test.mp3',
          },
        ],
      },
    }));
  });

  test('renders episode overview component', async () => {
    render(<EpisodesOverview />, { wrapper: MemoryRouter });

    expect(screen.getByText('Episodes: 1')).toBeInTheDocument();
  });

  test('renders nothing if podcast is not defined', async () => {
    (useOutletContext as jest.Mock).mockImplementation(() => ({ podcast: null }));

    const { container } = render(<EpisodesOverview />, { wrapper: MemoryRouter });

    expect(container).toBeEmptyDOMElement();
  });
});

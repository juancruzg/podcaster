import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter, useOutletContext, useParams } from 'react-router-dom';

import { EpisodeDetail } from '../../../../../../app/pages/podcastDetail/components/episodeDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
  useParams: jest.fn(),
}));

describe('EpisodeDetail', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockImplementation(() => ({ podcastId: '1', episodeId: '1' }));
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

  test('renders episode detail component', async () => {
    const { container } = render(<EpisodeDetail />, { wrapper: MemoryRouter });

    expect(container).not.toBeEmptyDOMElement();
  });

  test('throws an error if episode id is not set', async () => {
    (useParams as jest.Mock).mockImplementation(() => ({ podcastId: '1' }));

    expect(() => render(<EpisodeDetail />, { wrapper: MemoryRouter })).toThrow('episodeId is a required path param');
  });

  test('throws an error if episode is not set', async () => {
    (useOutletContext as jest.Mock).mockImplementation(() => ({ podcast: { episodes: [] } }));

    expect(() => render(<EpisodeDetail />, { wrapper: MemoryRouter })).toThrow('episode could not be found');
  });
});

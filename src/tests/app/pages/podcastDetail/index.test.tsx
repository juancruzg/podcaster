import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';

import { Podcast } from '../../../../app/models/podcast';
import { PodcastDetail } from '../../../../app/pages/podcastDetail';
import { getPodcast } from '../../../../app/services/podcastService';

jest.mock('../../../../app/services/podcastService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('PodcastDetail', () => {
  beforeEach(() => {
    (getPodcast as jest.Mock).mockImplementation(
      jest.fn(() =>
        Promise.resolve<Podcast>({
          author: 'author',
          description: 'description',
          id: '1',
          imageURL: 'https://image.com/test.png',
          name: 'name',
          episodes: [
            {
              date: '2022-05-20',
              duration: 20000,
              id: '1',
              title: 'title',
            },
          ],
        }),
      ),
    );
  });

  test('renders podcastDetail component', async () => {
    (useParams as jest.Mock).mockImplementation(() => ({ id: '1' }));

    const { container } = render(<PodcastDetail />);

    expect(container).not.toBeEmptyDOMElement();

    await waitFor(() => {
      expect(getPodcast).toHaveBeenCalled();
    });
  });

  test('renders podcastDetail component without data', async () => {
    (useParams as jest.Mock).mockImplementation(() => ({ id: '1' }));
    (getPodcast as jest.Mock).mockImplementation(jest.fn(() => Promise.resolve<Podcast | null>(null)));

    render(<PodcastDetail />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  test('should not render if router param is not set', () => {
    (getPodcast as jest.Mock).mockImplementation(jest.fn(() => Promise.resolve<Podcast | null>(null)));
    (useParams as jest.Mock).mockImplementation(() => ({ id: null }));

    expect(() => render(<PodcastDetail />)).toThrow('ID is a required path param');
  });
});

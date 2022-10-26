import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';

import LoaderProvider from '../../../../app/contexts/loaderContext';
import { Podcast } from '../../../../app/models/podcast';
import { PodcastDetail } from '../../../../app/pages/podcastDetail';
import { getPodcast } from '../../../../app/services/podcastService';

jest.mock('../../../../app/services/podcastService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('PodcastDetail', () => {
  const originalConsoleError = global.console.error;

  beforeEach(() => {
    global.console = { ...global.console, error: jest.fn() };

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
              description: 'description',
              previewURL: 'https://preview.com/test.mp3',
            },
          ],
        }),
      ),
    );
  });

  afterAll(() => {
    global.console = { ...global.console, error: originalConsoleError };
  });

  test('renders podcastDetail component', async () => {
    (useParams as jest.Mock).mockImplementation(() => ({ podcastId: '1' }));

    const { container } = render(
      <LoaderProvider isLoading>
        <PodcastDetail />
      </LoaderProvider>,
      { wrapper: MemoryRouter },
    );

    expect(container).not.toBeEmptyDOMElement();

    await waitFor(() => {
      expect(getPodcast).toHaveBeenCalled();
    });
  });

  test('renders podcastDetail component without data', async () => {
    (useParams as jest.Mock).mockImplementation(() => ({ podcastId: '1' }));
    (getPodcast as jest.Mock).mockImplementation(jest.fn(() => Promise.resolve<null>(null)));

    render(
      <LoaderProvider isLoading>
        <PodcastDetail />
      </LoaderProvider>,
      { wrapper: MemoryRouter },
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  test('should not render if router param is not set', () => {
    (getPodcast as jest.Mock).mockImplementation(jest.fn(() => Promise.resolve<null>(null)));
    (useParams as jest.Mock).mockImplementation(() => ({ podcastId: null }));

    expect(() =>
      render(
        <LoaderProvider isLoading>
          <PodcastDetail />
        </LoaderProvider>,
        { wrapper: MemoryRouter },
      ),
    ).toThrow('podcastId is a required path param');
  });

  test('should not render when getPodcast throws an error', async () => {
    global.console = { ...global.console, error: jest.fn() };

    (getPodcast as jest.Mock).mockImplementation(jest.fn(() => Promise.reject(new Error('test error'))));
    (useParams as jest.Mock).mockImplementation(() => ({ podcastId: '1' }));

    render(
      <LoaderProvider isLoading>
        <PodcastDetail />
      </LoaderProvider>,
      { wrapper: MemoryRouter },
    );

    await waitFor(() => {
      expect(global.console.error).toHaveBeenCalled();
    });
  });
});

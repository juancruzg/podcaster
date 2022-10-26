import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { GetPodcastsResponse } from '../../../../app/models/getPodcastsResponse';
import { Home } from '../../../../app/pages/home';
import { getAllPodcasts } from '../../../../app/services/podcastService';

jest.mock('../../../../app/services/podcastService');

describe('Home', () => {
  const originalConsoleError = global.console.error;

  beforeEach(() => {
    global.console = { ...global.console, error: jest.fn() };

    (getAllPodcasts as jest.Mock).mockImplementation(
      jest.fn(() =>
        Promise.resolve<GetPodcastsResponse>({
          podcasts: [
            {
              author: 'test-author',
              id: 'test-id',
              imageURL: 'https://image.com/test.png',
              name: 'test-name',
            },
          ],
          count: 1,
        }),
      ),
    );
  });

  afterAll(() => {
    global.console = { ...global.console, error: originalConsoleError };
  });

  test('renders home component', async () => {
    const { container } = render(<Home />);

    expect(container).not.toBeEmptyDOMElement();

    await waitFor(() => {
      expect(getAllPodcasts).toHaveBeenCalled();
    });
  });

  test('renders home component with no podcasts', async () => {
    (getAllPodcasts as jest.Mock).mockImplementation(
      jest.fn(() =>
        Promise.resolve<GetPodcastsResponse>({
          podcasts: [],
          count: 0,
        }),
      ),
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  test('executes search', async () => {
    render(<Home />);

    const textBox = screen.getByPlaceholderText('Filter podcasts...');

    fireEvent.change(textBox, { target: { value: 'a' } });

    await waitFor(() => {
      expect(getAllPodcasts).toHaveBeenCalled();
    });
  });

  test('should not render when getAllPodcasts throws an error', async () => {
    (getAllPodcasts as jest.Mock).mockImplementation(jest.fn(() => Promise.reject(new Error('test error'))));

    render(<Home />);

    await waitFor(() => {
      expect(global.console.error).toHaveBeenCalled();
    });
  });
});
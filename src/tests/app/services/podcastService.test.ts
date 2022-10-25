import { cleanup } from '@testing-library/react';
import axios from 'axios';

import { EntityTypeEnum } from '../../../app/enums/EntityTypeEnum';
import { getAllPodcasts, getPodcast } from '../../../app/services/podcastService';
import { addToLocalStorage, getFromLocalStorage } from '../../../app/utils/sessionManager';

jest.mock('axios');
jest.mock('../../../app/utils/sessionManager', () => ({
  addToLocalStorage: jest.fn(),
  getFromLocalStorage: jest.fn(),
}));

describe('PodcastService', () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('GetAllPodcasts', () => {
    test('gets podcast using axios', async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        config: {},
        data: {
          feed: {
            entry: [
              {
                id: {
                  attributes: {
                    'im:id': '2',
                  },
                },
                'im:artist': {
                  label: 'author',
                },
                'im:image': [
                  {
                    attributes: {
                      height: '200',
                    },
                    label: 'https://image.com/test/200',
                  },
                  {
                    attributes: {
                      height: '100',
                    },
                    label: 'https://image.com/test/100',
                  },
                ],
                title: {
                  label: 'title',
                },
              },
            ],
          },
        },
        headers: {},
        status: 200,
        statusText: 'success',
      });

      const podcastResponse = await getAllPodcasts();

      expect(podcastResponse.count).toEqual(1);
      expect(podcastResponse.podcasts).toStrictEqual([
        { id: '2', author: 'author', imageURL: 'https://image.com/test/200', name: 'title' },
      ]);
      expect(axios.get).toHaveBeenCalled();
      expect(addToLocalStorage).toHaveBeenCalled();
    });

    test('gets podcast using localStorage', async () => {
      (getFromLocalStorage as jest.Mock).mockImplementation(() => [
        { id: '2', author: 'author', imageURL: 'https://image.com/test/200', name: 'title' },
      ]);
      const podcastResponse = await getAllPodcasts();

      expect(podcastResponse.count).toEqual(1);
      expect(podcastResponse.podcasts).toStrictEqual([
        { id: '2', author: 'author', imageURL: 'https://image.com/test/200', name: 'title' },
      ]);
      expect(axios.get).not.toHaveBeenCalled();
      expect(getFromLocalStorage).toHaveBeenCalled();
    });

    test('gets podcast with a search text', async () => {
      (getFromLocalStorage as jest.Mock).mockImplementation(() => [
        { id: '1', author: 'author', imageURL: 'https://image.com/test/200', name: 'title' },
        { id: '2', author: 'author', imageURL: 'https://image.com/test/200', name: 'search-test' },
        { id: '3', author: 'search-test', imageURL: 'https://image.com/test/200', name: 'title' },
      ]);
      const podcastResponse = await getAllPodcasts('search-test');

      expect(podcastResponse.count).toEqual(2);
      expect(podcastResponse.podcasts).toStrictEqual([
        { id: '2', author: 'author', imageURL: 'https://image.com/test/200', name: 'search-test' },
        { id: '3', author: 'search-test', imageURL: 'https://image.com/test/200', name: 'title' },
      ]);
      expect(axios.get).not.toHaveBeenCalled();
      expect(getFromLocalStorage).toHaveBeenCalled();
    });

    test('gets empty response', async () => {
      (getFromLocalStorage as jest.Mock).mockImplementation(() => []);
      const podcastResponse = await getAllPodcasts('search-test');

      expect(podcastResponse.count).toEqual(0);
      expect(podcastResponse.podcasts).toStrictEqual([]);
      expect(axios.get).not.toHaveBeenCalled();
      expect(getFromLocalStorage).toHaveBeenCalled();
    });
  });

  describe('GetPodcast', () => {
    let podcastId: string;

    beforeEach(() => {
      podcastId = 'test';
    });

    test('gets podcast using axios', async () => {
      (axios.get as jest.Mock)
        .mockResolvedValueOnce({
          config: {},
          data: {
            results: [
              {
                kind: EntityTypeEnum.PODCAST,
                feedUrl: 'https://feed.com/test',
                collectionId: 'test',
                artistName: 'author',
                collectionName: 'title',
                artworkUrl600: 'https://image.com/test',
              },
              {
                kind: EntityTypeEnum.PODCAST_EPISODE,
                trackId: '1',
                trackName: 'Episode 1',
                trackTimeMillis: 200000,
                releaseDate: '2022-10-24',
              },
              {
                kind: EntityTypeEnum.PODCAST_EPISODE,
                trackId: '1',
                trackName: 'Episode 2',
                trackTimeMillis: 200000,
                releaseDate: '2022-10-25',
              },
            ],
          },
          headers: {},
          status: 200,
          statusText: 'success',
        })
        .mockResolvedValueOnce({
          config: {},
          data: '<test xmlns:itunes="http://example.com/ns"><itunes:summary>description</itunes:summary><itunes:summary>description</itunes:summary></test>',
          headers: {},
          status: 200,
          statusText: 'success',
        });

      const podcastResponse = await getPodcast(podcastId);

      expect(podcastResponse).toStrictEqual({
        author: 'author',
        description: 'description',
        episodes: [
          {
            date: '2022-10-24',
            duration: 200000,
            id: '1',
            title: 'Episode 1',
          },
          {
            date: '2022-10-25',
            duration: 200000,
            id: '1',
            title: 'Episode 2',
          },
        ],
        id: 'test',
        imageURL: 'https://image.com/test',
        name: 'title',
      });
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(addToLocalStorage).toHaveBeenCalled();
    });

    test('gets podcast using localStorage', async () => {
      (getFromLocalStorage as jest.Mock).mockImplementation(() => ({
        author: 'author',
        description: 'description',
        episodes: [
          {
            date: '2022-10-24',
            duration: 200000,
            id: '1',
            title: 'Episode 1',
          },
          {
            date: '2022-10-25',
            duration: 200000,
            id: '1',
            title: 'Episode 2',
          },
        ],
        id: 'test',
        imageURL: 'https://image.com/test',
        name: 'title',
      }));

      const podcastResponse = await getPodcast(podcastId);

      expect(podcastResponse).toStrictEqual({
        author: 'author',
        description: 'description',
        episodes: [
          {
            date: '2022-10-24',
            duration: 200000,
            id: '1',
            title: 'Episode 1',
          },
          {
            date: '2022-10-25',
            duration: 200000,
            id: '1',
            title: 'Episode 2',
          },
        ],
        id: 'test',
        imageURL: 'https://image.com/test',
        name: 'title',
      });
      expect(axios.get).not.toHaveBeenCalled();
      expect(getFromLocalStorage).toHaveBeenCalled();
    });

    test('gets podcast without detail', async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        config: {},
        data: {
          results: [
            {
              kind: EntityTypeEnum.PODCAST_EPISODE,
              trackId: '1',
              trackName: 'Episode 1',
              trackTimeMillis: 200000,
              releaseDate: '2022-10-24',
            },
            {
              kind: EntityTypeEnum.PODCAST_EPISODE,
              trackId: '1',
              trackName: 'Episode 2',
              trackTimeMillis: 200000,
              releaseDate: '2022-10-25',
            },
          ],
        },
        headers: {},
        status: 200,
        statusText: 'success',
      });

      await expect(getPodcast(podcastId)).rejects.toThrow('Could not get podcast from query.');
    });
  });
});

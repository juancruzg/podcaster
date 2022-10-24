import axios from 'axios';

import { getAllPodcasts } from '../../../app/services/podcastService';
import { addToLocalStorage, getFromLocalStorage } from '../../../app/utils/sessionManager';

jest.mock('axios');
jest.mock('../../../app/utils/sessionManager', () => ({
  addToLocalStorage: jest.fn(),
  getFromLocalStorage: jest.fn(),
}));

describe('PodcastService', () => {
  test('gets podcast using axios', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      config: {},
      data: {
        feed: {
          entry: [
            {
              'im:artist': {
                label: 'author',
              },
              'im:image': [
                {
                  attributes: {
                    height: '200',
                  },
                  label: 'https://image.com/test',
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
      { author: 'author', imageURL: 'https://image.com/test', name: 'title' },
    ]);
    expect(axios.get).toHaveBeenCalled();
    expect(addToLocalStorage).toHaveBeenCalled();
  });

  test('gets podcast using localStorage', async () => {
    (getFromLocalStorage as jest.Mock).mockImplementation(() => [
      {
        'im:artist': {
          label: 'author',
        },
        'im:image': [
          {
            attributes: {
              height: '200',
            },
            label: 'https://image.com/test',
          },
        ],
        title: {
          label: 'title',
        },
      },
    ]);
    const podcastResponse = await getAllPodcasts();

    expect(podcastResponse.count).toEqual(1);
    expect(podcastResponse.podcasts).toStrictEqual([
      { author: 'author', imageURL: 'https://image.com/test', name: 'title' },
    ]);
    expect(axios.get).not.toHaveBeenCalled();
    expect(getFromLocalStorage).toHaveBeenCalled();
  });

  test('gets podcast with a search text', async () => {
    (getFromLocalStorage as jest.Mock).mockImplementation(() => [
      {
        'im:artist': {
          label: 'author',
        },
        'im:image': [
          {
            attributes: {
              height: '200',
            },
            label: 'https://image.com/test',
          },
        ],
        title: {
          label: 'title',
        },
      },
      {
        'im:artist': {
          label: 'author',
        },
        'im:image': [
          {
            attributes: {
              height: '200',
            },
            label: 'https://image.com/test',
          },
        ],
        title: {
          label: 'search-test',
        },
      },
      {
        'im:artist': {
          label: 'search-test',
        },
        'im:image': [
          {
            attributes: {
              height: '200',
            },
            label: 'https://image.com/test',
          },
        ],
        title: {
          label: 'title',
        },
      },
    ]);
    const podcastResponse = await getAllPodcasts('search-test');

    expect(podcastResponse.count).toEqual(2);
    expect(podcastResponse.podcasts).toStrictEqual([
      { author: 'author', imageURL: 'https://image.com/test', name: 'search-test' },
      { author: 'search-test', imageURL: 'https://image.com/test', name: 'title' },
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

import axios from 'axios';

import { PodcastDTO, PodcastsDTO } from '../models/dto/getPodcastsDTO';
import { GetPodcastsResponse } from '../models/getPodcastsResponse';
import { Podcast } from '../models/podcast';
import { addToLocalStorage, getFromLocalStorage } from '../utils/sessionManager';

const PODCASTS_TTL = 24 * 60 * 60;

const podcastDTOTransform = (podcast: PodcastDTO) => ({
  author: podcast?.['im:artist']?.label,
  name: podcast?.title?.label,
  imageURL: podcast?.['im:image'].reduce((previous, current) =>
    previous.attributes.height < current.attributes.height ? previous : current,
  )?.label,
});

export const getAllPodcasts = async (searchText?: string): Promise<GetPodcastsResponse> => {
  // First check if response is stored as cookie
  const podcasts = getFromLocalStorage<PodcastDTO[]>('apple_toppodcasts');

  let filteredPodcasts: PodcastDTO[];

  if (!podcasts) {
    const response = await axios.get<PodcastsDTO>('us/rss/toppodcasts/limit=100/genre=1310/json');

    filteredPodcasts = response.data.feed.entry;

    addToLocalStorage('apple_toppodcasts', filteredPodcasts, PODCASTS_TTL);
  } else {
    filteredPodcasts = podcasts;
  }

  if (searchText) {
    filteredPodcasts = filteredPodcasts.filter((podcast) => {
      const name = podcast.title.label.toLowerCase();
      const author = podcast['im:artist'].label.toLowerCase();
      const searchTextToLower = searchText.toLowerCase();

      return name.indexOf(searchTextToLower) > -1 || author.indexOf(searchTextToLower) > -1;
    });
  }

  return {
    podcasts: filteredPodcasts.map<Podcast>(podcastDTOTransform),
    count: filteredPodcasts.length,
  };
};

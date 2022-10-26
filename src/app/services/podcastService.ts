import axios from 'axios';

import { EntityTypeEnum } from '../enums/EntityTypeEnum';
import { EpisodeDetail, GetPodcastDTO, PodcastDetail } from '../models/dto/getPodcastDTO';
import { PodcastDTO, PodcastsDTO } from '../models/dto/getPodcastsDTO';
import { Episode } from '../models/episode';
import { GetPodcastsResponse } from '../models/getPodcastsResponse';
import { Podcast } from '../models/podcast';
import { PodcastItem } from '../models/podcastItem';
import { addToLocalStorage, getFromLocalStorage } from '../utils/sessionManager';

const PODCASTS_TTL = 24 * 60 * 60;

const podcastListDTOTransform = (podcast: PodcastDTO): PodcastItem => ({
  id: podcast?.id?.attributes?.['im:id'],
  author: podcast?.['im:artist']?.label,
  name: podcast?.title?.label,
  imageURL: podcast?.['im:image'].reduce((previous, current) =>
    parseInt(previous.attributes.height, 10) > parseInt(current.attributes.height, 10) ? previous : current,
  )?.label,
});

export const getAllPodcasts = async (searchText?: string): Promise<GetPodcastsResponse> => {
  // First check if response is stored
  const podcastsFromStorage = getFromLocalStorage<PodcastItem[]>('apple_toppodcasts');

  let podcasts: PodcastItem[];

  if (!podcastsFromStorage) {
    const response = await axios.get<PodcastsDTO>('/us/rss/toppodcasts/limit=100/genre=1310/json');

    podcasts = response.data.feed.entry.map<PodcastItem>(podcastListDTOTransform);

    addToLocalStorage('apple_toppodcasts', podcasts, PODCASTS_TTL);
  } else {
    podcasts = podcastsFromStorage;
  }

  if (searchText) {
    podcasts = podcasts.filter((podcast) => {
      const name = podcast.name.toLowerCase();
      const author = podcast.author.toLowerCase();
      const searchTextToLower = searchText.toLowerCase();

      return name.indexOf(searchTextToLower) > -1 || author.indexOf(searchTextToLower) > -1;
    });
  }

  return {
    podcasts,
    count: podcasts.length,
  };
};

const getDescriptionFromXML = (xml: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');

  const element = doc.getElementsByTagName('itunes:summary');

  return element[0].textContent || '';
};

const podcastDTOTransform = async (getPodcastDTO: GetPodcastDTO): Promise<Podcast> => {
  const podcastDetail = getPodcastDTO.results.find((entity) => entity.kind === EntityTypeEnum.PODCAST) as PodcastDetail;

  if (!podcastDetail) {
    throw new Error('Could not get podcast from query.');
  }

  // Get podcast feed (as XML).
  const feed = await axios.get(`/${podcastDetail.feedUrl}`, {
    baseURL: 'https://cors-anywhere.herokuapp.com/',
  });

  return {
    id: podcastDetail.collectionId,
    author: podcastDetail.artistName,
    name: podcastDetail.collectionName,
    imageURL: podcastDetail.artworkUrl600,
    description: getDescriptionFromXML(feed.data),
    episodes: (
      getPodcastDTO.results.filter((entity) => entity.kind === EntityTypeEnum.PODCAST_EPISODE) as EpisodeDetail[]
    ).map<Episode>((episode) => ({
      id: episode.trackId,
      date: episode.releaseDate,
      duration: episode.trackTimeMillis,
      title: episode.trackName,
      description: episode.description,
      previewURL: episode.previewUrl,
    })),
  };
};

export const getPodcast = async (id: string): Promise<Podcast> => {
  // First check if response is stored
  const podcastFromStorage = getFromLocalStorage<Podcast>(`apple_toppodcasts:${id}`);

  if (podcastFromStorage) {
    return podcastFromStorage;
  }

  // Execute the lookup to retrieve podcast details and episodes.
  const response = await axios.get('/lookup', {
    params: {
      id,
      media: 'podcast',
      entity: 'podcastEpisode',
      limit: 100,
    },
  });

  const podcast = await podcastDTOTransform(response.data);

  addToLocalStorage(`apple_toppodcasts:${id}`, podcast, PODCASTS_TTL);

  return podcast;
};

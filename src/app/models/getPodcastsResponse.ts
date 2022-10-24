import { Podcast } from './podcast';

export interface GetPodcastsResponse {
  podcasts: Podcast[];
  count: number;
}

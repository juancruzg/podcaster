import { PodcastItem } from './podcastItem';

export interface GetPodcastsResponse {
  podcasts: PodcastItem[];
  count: number;
}

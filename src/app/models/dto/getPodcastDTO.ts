import { EntityTypeEnum } from '../../enums/EntityTypeEnum';

export interface EntityDetail {
  kind: EntityTypeEnum;
}

export interface PodcastDetail extends EntityDetail {
  feedUrl: string;
  collectionId: string;
  artistName: string;
  collectionName: string;
  artworkUrl600: string;
}

export interface EpisodeDetail extends EntityDetail {
  trackId: string;
  trackName: string;
  trackTimeMillis: number;
  releaseDate: string;
  description: string;
  previewUrl: string;
}

export interface GetPodcastDTO {
  results: EntityDetail[];
}

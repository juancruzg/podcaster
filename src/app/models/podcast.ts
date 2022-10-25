import { Episode } from './episode';

export interface Podcast {
  id: string;
  name: string;
  author: string;
  imageURL: string;
  description: string;
  episodes: Episode[];
}

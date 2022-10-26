import React, { useEffect, useState } from 'react';

import { Card } from '../../components/card';
import { useLoaderContext } from '../../contexts/loaderContext';
import { ImageTypeEnum } from '../../enums/ImageTypeEnum';
import { LevelEnum } from '../../enums/LevelEnum';
import { PodcastItem } from '../../models/podcastItem';
import { getAllPodcasts } from '../../services/podcastService';
import { Badge } from './components/badge';
import { Searchbox } from './components/searchbox';

export function Home() {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>();
  const [count, setCount] = useState<number>(0);
  const { setIsLoading } = useLoaderContext();

  useEffect(() => {
    setIsLoading(true);

    getAllPodcasts()
      .then((podcastsResponse) => {
        setPodcasts(podcastsResponse.podcasts);
        setCount(podcastsResponse.count);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Something went wrong:', error);
      })
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  const handleSearch = (searchText: string) => {
    getAllPodcasts(searchText).then((podcastsResponse) => {
      setPodcasts(podcastsResponse.podcasts);
      setCount(podcastsResponse.count);
    });
  };

  return (
    <>
      <div className="home__search-bar">
        <Badge number={count} level={LevelEnum.PRIMARY} />
        <Searchbox onChange={handleSearch} placeholder="Filter podcasts..." />
      </div>
      <div className="home__podcast-list">
        {podcasts &&
          podcasts.map((podcast) => (
            <Card
              key={`${podcast.name}-${podcast.author}`}
              href={`/podcast/${podcast.id}`}
              image={{
                type: ImageTypeEnum.CIRCLE,
                src: podcast.imageURL,
                alt: 'podcast-avatar',
              }}
            >
              <div className="home__podcast-list__card">
                <h2 className="home__podcast-list__card__title">{podcast.name}</h2>
                <p className="home__podcast-list__card__subtitle">{podcast.author}</p>
              </div>
            </Card>
          ))}
      </div>
    </>
  );
}

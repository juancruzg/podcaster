import React, { useEffect, useState } from 'react';

import { Card } from '../../components/card';
import { LevelEnum } from '../../enums/LevelEnum';
import { Podcast } from '../../models/podcast';
import { getAllPodcasts } from '../../services/podcastService';
import { Badge } from './components/badge';
import { Searchbox } from './components/searchBox';

export function Home() {
  const [podcasts, setPodcasts] = useState<Podcast[]>();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    getAllPodcasts().then((podcastsResponse) => {
      setPodcasts(podcastsResponse.podcasts);
      setCount(podcastsResponse.count);
    });
  }, []);

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
              href="#"
              image={{
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

import React from 'react';

import { Card } from '../../components/card';
import { LevelEnum } from '../../enums/LevelEnum';
import { Badge } from './components/badge';
import { Searchbox } from './components/searchBox';

export function Home() {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <div className="home__search-bar">
        <Badge number={100} level={LevelEnum.PRIMARY} />
        <Searchbox onSearch={handleSearch} placeholder="Filter podcasts..." />
      </div>
      <div className="home__podcast-list">
        <Card
          image={{
            src: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg',
            alt: 'podcast-avatar',
          }}
        >
          <h2 className="home__podcast-list__card__title">All songs consider</h2>
          <p className="home__podcast-list__card__subtitle">Author: Firulais</p>
        </Card>
      </div>
    </>
  );
}

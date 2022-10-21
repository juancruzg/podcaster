import React from 'react';

import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="header">
      <h1 className="header__title">
        <Link to="/">Podcaster</Link>
      </h1>
    </header>
  );
}

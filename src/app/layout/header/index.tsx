import React from 'react';

import { Link } from 'react-router-dom';

export interface HeaderProps {
  loadingIcon?: JSX.Element | null;
}

export function Header({ loadingIcon }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title">
        <Link to="/">Podcaster</Link>
      </h1>
      {loadingIcon}
    </header>
  );
}

Header.defaultProps = {
  loadingIcon: null,
};

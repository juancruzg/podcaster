import React from 'react';

import { Link } from 'react-router-dom';

export interface CardProps {
  children: React.ReactNode;
  href?: string;
  image?: {
    alt: string;
    src: string;
  };
}

export function Card({ children, image, href }: CardProps) {
  const card = (
    <div className="card">
      {image && (
        <div className="card__image">
          <img src={image.src} alt={image.alt} />
        </div>
      )}
      <div className="card__content">{children}</div>
    </div>
  );

  if (!href) {
    return card;
  }

  return <Link to={href} className="card--link">{card}</Link>;
}

Card.defaultProps = {
  image: null,
  href: null,
};

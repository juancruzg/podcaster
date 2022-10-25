import React from 'react';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ImageTypeEnum } from '../../enums/ImageTypeEnum';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  href?: string;
  smallPadding?: boolean;
  image?: {
    type: ImageTypeEnum;
    alt: string;
    src: string;
  };
}

export function Card({ children, className, image, href, smallPadding }: CardProps) {
  const card = (
    <div className={classNames('card', className, { 'card--small-padding': smallPadding })}>
      {image && (
        <div className={classNames('card__image', `card__image--${image.type}`)} data-testid="card-image-container">
          <img src={image.src} alt={image.alt} />
        </div>
      )}
      <div className="card__content">{children}</div>
    </div>
  );

  if (!href) {
    return card;
  }

  return (
    <Link to={href} className="card--link">
      {card}
    </Link>
  );
}

Card.defaultProps = {
  className: null,
  image: null,
  smallPadding: false,
  href: null,
};

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  image?: {
    alt: string;
    src: string;
  };
}

export function Card({ children, image }: CardProps) {
  return (
    <div className="card">
      {image && (
        <div className="card__image">
          <img src={image.src} alt={image.alt} />
        </div>
      )}
      <div className="card__content">{children}</div>
    </div>
  );
}

Card.defaultProps = {
  image: null,
};

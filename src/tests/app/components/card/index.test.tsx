import React from 'react';

import { render, screen } from '@testing-library/react';

import { Card } from '../../../../app/components/card';

describe('Card', () => {
  let content: string;
  let imageURL: string;
  let imageAlt: string;

  beforeEach(() => {
    content = 'Test';
    imageURL = 'https://test.com/test.png';
    imageAlt = 'alt-test';
  });

  test('renders card as default', () => {
    render(<Card>{content}</Card>);

    expect(screen.queryByAltText('alt-test')).not.toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('renders with an image', () => {
    render(
      <Card
        image={{
          alt: imageAlt,
          src: imageURL,
        }}
      >
        {content}
      </Card>,
    );

    const image = screen.getByAltText('alt-test');

    expect(image).toBeInTheDocument();
    expect(image).toHaveProperty('src', 'https://test.com/test.png');
  });
});

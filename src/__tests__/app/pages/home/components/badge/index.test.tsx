import React from 'react';

import { render, screen } from '@testing-library/react';

import { Badge } from '../../../../../../app/pages/home/components/badge';

describe('Badge', () => {
  test('renders badge item', () => {
    render(<Badge number={100} />);

    expect(screen.getByText('100')).toBeInTheDocument();
  });
});

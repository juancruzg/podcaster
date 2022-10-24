import React from 'react';

import { render, screen } from '@testing-library/react';

import { Header } from '../../../../app/layout/header';
import { Router } from '../../../../router';

describe('Header', () => {
  test('renders header title', () => {
    render(<Header />, { wrapper: Router });

    const titleAnchor = screen.getByText('Podcaster');

    expect(titleAnchor).toBeInTheDocument();
    expect(titleAnchor).toHaveProperty('href', 'http://localhost/');
  });
});

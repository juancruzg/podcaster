import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Header } from '../../../../app/layout/header';

describe('Header', () => {
  test('renders header title', () => {
    render(<Header />, { wrapper: MemoryRouter });

    const titleAnchor = screen.getByText('Podcaster');

    expect(titleAnchor).toBeInTheDocument();
    expect(titleAnchor).toHaveProperty('href', 'http://localhost/');
  });
});

import React from 'react';

import { fireEvent, screen, render } from '@testing-library/react';

import { Searchbox } from '../../../../../../app/pages/home/components/searchbox';

describe('SearchBox', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('renders searchbox as default', () => {
    render(<Searchbox />);

    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  test('renders searchbox with a placeholder', () => {
    render(<Searchbox placeholder="useMeToSearch" />);

    expect(screen.getByPlaceholderText('useMeToSearch')).toBeInTheDocument();
  });

  test('executes onChange event', () => {
    const handleChange = jest.fn();

    render(<Searchbox onChange={handleChange} placeholder="useMeToSearch" />);

    const textBox = screen.getByPlaceholderText('useMeToSearch');

    fireEvent.change(textBox, { target: { value: 'a' } });

    expect(handleChange).toHaveBeenCalled();
  });

  test('executes onSearch event after executing onChange event', () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    render(<Searchbox onChange={handleChange} onSearch={handleSubmit} placeholder="useMeToSearch" />);

    const textBox = screen.getByPlaceholderText('useMeToSearch');

    fireEvent.change(textBox, { target: { value: 'a' } });

    expect(handleChange).toHaveBeenCalled();

    jest.advanceTimersByTime(650);

    expect(handleSubmit).toHaveBeenCalled();
  });

  test('executes onSearch event', () => {
    const handleSubmit = jest.fn();

    render(<Searchbox onSearch={handleSubmit} />);

    const form = screen.getByRole('search');

    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalled();
  });
});

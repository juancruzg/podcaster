import React, { useEffect, useState } from 'react';

export interface SearchboxProps {
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const DELAY_DEBOUNCE_TIMEOUT = 650;

export function Searchbox({ onChange, onSearch, placeholder }: SearchboxProps): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('');

  // Wait a short timeout before executing the search.
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (onSearch) {
        onSearch(searchValue);
      }
    }, DELAY_DEBOUNCE_TIMEOUT);

    return () => clearTimeout(delayDebounce);
  }, [onSearch, searchValue]);

  const handleSubmit = (event: React.FormEvent) => {
    // Execute submit event from props.
    if (onSearch) {
      onSearch(searchValue);
    }

    // Avoid default behavior from form element.
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // Execute change event from props.
    if (onChange) {
      onChange(event.target.value);
    }

    setSearchValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="On this page">
      <input
        className="search-input"
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
        name="search"
        spellCheck={false}
      />
    </form>
  );
}

Searchbox.defaultProps = {
  onSearch: null,
  onChange: null,
  placeholder: null,
};

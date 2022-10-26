import React from 'react';

import { cleanup, render } from '@testing-library/react';

import LoaderProvider, { LoaderProviderProps, useLoaderContext } from '../../../app/contexts/loaderContext';

describe('Loader context', () => {
  let propsMock: LoaderProviderProps;

  beforeEach(() => {
    propsMock = {
      isLoading: true,
    } as LoaderProviderProps;
  });

  afterEach(() => {
    cleanup();
  });

  test('Should get isLoading boolean', () => {
    propsMock.isLoading = true;

    function View() {
      const loader = useLoaderContext();
      expect(loader.isLoading).toBeTruthy();

      return null;
    }

    render(
      <LoaderProvider isLoading>
        <View />
      </LoaderProvider>,
    );
  });
});

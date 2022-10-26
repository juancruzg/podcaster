import React from 'react';

import LoaderProvider from './app/contexts/loaderContext';
import { Router } from './router';

export default function App() {
  return (
    <LoaderProvider isLoading={false}>
      <Router />
    </LoaderProvider>
  );
}

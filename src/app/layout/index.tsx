import React from 'react';

import { Outlet } from 'react-router-dom';

import { LoadingAim } from '../assets/svg/loadingAim';
import { useLoaderContext } from '../contexts/loaderContext';
import { Header } from './header';

export function Layout(): JSX.Element {
  const { isLoading } = useLoaderContext();

  return (
    <>
      <Header loadingIcon={isLoading ? <LoadingAim className="loading-aim-icon" /> : null} />
      <section className="main-content">
        <Outlet />
      </section>
    </>
  );
}

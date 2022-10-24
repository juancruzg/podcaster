import React from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from './header';

export function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <section className="main-content">
        <Outlet />
      </section>
    </>
  );
}

import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { Spin } from 'antd';
import { IStoreState } from '../store/types';
import './index.less';
import Sidebar from '../components/LayoutSideBar/index';
import { Settings } from '../store/module/settings';
import Header from '../components/LayoutHeader';
import LayoutSettings from '../components/LayoutSettings';
import { getPageTitle } from '../router/utils';
import MainRoutes from './MainRoutes';

interface LayoutProps {
  layout: Settings['layout'];

  colorWeak: boolean;
}

function Layout(props: LayoutProps) {
  const title = getPageTitle();

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <section
        className={classnames({
          layout: true,
          'layout--side-bar': props.layout === 'side',
          'layout--weak': props.colorWeak,
        })}
      >
        {props.layout === 'side' && <Sidebar />}
        <section className={classnames('layout__main')}>
          <Header />
          <Suspense fallback={<Spin />}>
            <MainRoutes />
          </Suspense>
        </section>
        <LayoutSettings />
      </section>
    </>
  );
}

export default connect(({ settings: { layout, colorWeak } }: IStoreState) => ({
  layout,
  colorWeak,
}))(Layout);

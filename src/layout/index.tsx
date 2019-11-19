import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { IStoreState } from '../store/types';
import './index.less';
import Sidebar from '../components/LayoutSideBar/index';
import { Settings } from '../store/module/settings';
import Header from '../components/LayoutHeader';

interface LayoutProps {
  layout: Settings['layout'];
}

function Layout(props: LayoutProps) {
  // const closeSideBar = () => {
  //   props.updateSideBar({
  //     ...props.sidebar,
  //     opened: false
  //   })
  // }

  return (
    <section
      className={classnames({
        layout: true,
        'layout--side-bar': props.layout === 'side',
      })}
    >
      {props.layout === 'side' && <Sidebar />}
      <section className={classnames('layout__main')}>
        <Header />
      </section>
    </section>
  );
}

export default connect(({ settings: { layout } }: IStoreState) => ({ layout }))(Layout);

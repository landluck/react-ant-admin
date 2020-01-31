import React, { memo } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { AppState } from '../../store/module/app';
import { IStoreState } from '../../store/types';
import { Settings } from '../../store/module/settings';
import LayoutNavBar from '../LayoutNavBar';
import LayoutSideBar from '../LayoutSideBar';
import './index.less';

interface LayoutHeaderProps {
  fixedHeader: boolean;
  contentWidth: Settings['contentWidth'];
  layout: Settings['layout'];
  sidebar: AppState['sidebar'];
  theme: Settings['theme'];
}

function LayoutHeader(props: LayoutHeaderProps) {
  return (
    <header
      className={classnames(
        'layout__header',
        `layout__header--${props.layout}`,
        `layout__header--${props.theme}`,
        {
          'layout__header--fix': props.fixedHeader,
          // close 情况只有在 layout 为 side 的时候存在
          'layout__header--close': !props.sidebar.opened && props.layout === 'side',
        },
      )}
    >
      <div
        className={classnames('layout__header__inner', {
          [`layout__header__inner--${props.contentWidth}`]: props.layout === 'top',
        })}
      >
        {props.layout === 'top' && (
          <div className="layout__header--top-side-bar">
            <LayoutSideBar />
          </div>
        )}
        <LayoutNavBar />
      </div>

      {/* <tags-view v-if="needTagsView" /> */}
    </header>
  );
}

export default connect(({ settings, app: { sidebar } }: IStoreState) => ({ ...settings, sidebar }))(
  memo(LayoutHeader),
);

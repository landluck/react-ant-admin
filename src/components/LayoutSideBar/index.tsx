import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Menu } from 'antd';
import Logo from '../SidebarLogo';
import { IStoreState } from '../../store/types';
import { AppState } from '../../store/module/app';
import { IRoute } from '../../router/config';
import renderMenu from '../SideMenu';
import './index.less';
import { Settings } from '../../store/module/settings';

interface LayoutSideBarProps extends Settings {
  sidebar: AppState['sidebar'];
  routes: AppState['routes'];
}

function LayoutSideBar({ theme, layout, sidebar, routes }: LayoutSideBarProps) {
  const inlineCollapsed: {
    inlineCollapsed?: boolean;
  } = {};

  if (layout === 'side') {
    inlineCollapsed.inlineCollapsed = !sidebar.opened;
  }

  return (
    <aside
      className={classnames(
        'layout__side-bar',
        `layout__side-bar--${theme}`,
        `layout__side-bar--${layout}`,
        {
          'layout__side-bar--close': !sidebar.opened,
        },
      )}
    >
      <div className={`layout__side-bar__logo--${layout}`}>
        <Logo opened={!sidebar.opened} />
      </div>
      <div className="layout__side-bar__menu">
        <Menu
          defaultSelectedKeys={[window.location.pathname]}
          defaultOpenKeys={window.location.pathname
            .split('/')
            .filter(Boolean)
            .map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')))}
          mode={layout === 'side' ? 'inline' : 'horizontal'}
          theme={theme}
          {...inlineCollapsed}
        >
          {routes.map((menu: IRoute) => renderMenu(menu))}
        </Menu>
      </div>
    </aside>
  );
}

export default connect(({ settings, app: { sidebar, routes } }: IStoreState) => ({
  ...settings,
  sidebar,
  routes,
}))(LayoutSideBar);

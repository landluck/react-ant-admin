import React, { useCallback, memo } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/types';
import { AppState, updateSideBar } from '../../store/module/app';
import { Settings } from '../../store/module/settings';
import './index.less';
import Hamburger from '../Hamburger';
import Breadcrumb from '../Breadcrumb';
import NavBarItem from './NavBarItem';
import NoticeIcon from '../NoticeIcon';
import AvatarDropdown from './AvatarDropdown';

interface LayoutNavBarProps extends AppState {
  avatar: string | undefined;

  layout: Settings['layout'];

  theme: Settings['theme'];

  ActionUpdateSideBar: (sidebar: AppState['sidebar']) => void;
}

function LayoutNavBar({ sidebar, ActionUpdateSideBar, layout, theme }: LayoutNavBarProps) {
  const onTrigger = useCallback(() => {
    ActionUpdateSideBar({
      ...sidebar,
      opened: !sidebar.opened,
    });
  }, [sidebar, ActionUpdateSideBar]);

  const onHelpItemClick = useCallback(() => {
    window.open('https://github.com/landluck/react-ant-admin');
  }, []);

  return (
    <div className="layout__navbar">
      {layout === 'side' && (
        <div className="layout__navbar__nav">
          <Hamburger isActive={sidebar.opened} onTrigger={onTrigger} />
          <Breadcrumb />
        </div>
      )}

      <div className="layout__navbar__menu">
        {/* 搜索暂时不做 */}
        {/* <Search></Search> */}
        <NavBarItem
          className={classNames('layout__navbar__menu-item', `layout__navbar__menu-item--${theme}`)}
          onClick={onHelpItemClick}
          icon="github"
          count={0}
        ></NavBarItem>
        <NoticeIcon />
        <AvatarDropdown
          classNames={classNames(
            'layout__navbar__menu-item',
            `layout__navbar__menu-item--${theme}`,
          )}
        />
      </div>
    </div>
  );
}

export default connect(
  ({ app, user: { avatar }, settings: { layout, theme } }: IStoreState) => ({
    ...app,
    avatar,
    layout,
    theme,
  }),
  {
    ActionUpdateSideBar: updateSideBar,
  },
)(memo(LayoutNavBar));

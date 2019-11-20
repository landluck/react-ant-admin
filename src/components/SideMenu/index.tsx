import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { IRoute, IRouteMeta } from '../../router/config';
import './index.less';

function renderTitle(meta: IRouteMeta) {
  /* eslint-disable no-confusing-arrow */
  return (
    <span className="menu-item-inner">
      {meta.icon && <Icon type={meta.icon} className="menu-icon" />}
      <span className="menu-title"> {meta.title} </span>
    </span>
  );
}

function renderMenuRoute(menu: IRoute) {
  return (
    <Menu.Item key={menu.path}>
      <Link to={menu.path}>{renderTitle(menu.meta)}</Link>
    </Menu.Item>
  );
}

function renderSubMenu(menu: IRoute) {
  return (
    <Menu.SubMenu title={renderTitle(menu.meta)} key={menu.path}>
      {menu.children!.map((item: IRoute) =>
        item.children ? renderSubMenu(item) : renderMenuRoute(item),
      )}
    </Menu.SubMenu>
  );
}

function renderMenu(menu: IRoute) {
  if (menu.children) {
    return renderSubMenu(menu);
  }

  return renderMenuRoute(menu);
}

export default renderMenu;

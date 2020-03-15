import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  DashboardOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { IRoute, IRouteMeta } from '../../router/config';
import './index.less';
import config from '../../config';

const iconMap: { [prop: string]: any } = {
  MenuUnfoldOutlined: <MenuUnfoldOutlined />,
  MenuOutlined: <MenuOutlined />,
  UserOutlined: <UserOutlined />,
  TeamOutlined: <TeamOutlined />,
  DashboardOutlined: <DashboardOutlined />,
  ReadOutlined: <ReadOutlined />,
};

function renderTitle(meta: IRouteMeta) {
  /* eslint-disable no-confusing-arrow */
  return (
    <span className="menu-item-inner">
      {meta.icon && iconMap[meta.icon]}
      <span className="menu-title"> {meta.title} </span>
    </span>
  );
}

function renderMenuRoute(menu: IRoute) {
  return (
    <Menu.Item key={config.BASENAME + menu.path}>
      <Link to={menu.path}>{renderTitle(menu.meta)}</Link>
    </Menu.Item>
  );
}

function renderSubMenu(menu: IRoute) {
  return (
    <Menu.SubMenu title={renderTitle(menu.meta)} key={config.BASENAME + menu.path}>
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

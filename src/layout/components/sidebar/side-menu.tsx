import React from "react";
import { Menu, Icon } from "antd";
import { IMenu, IMenuMeta } from "../../../router/config";
import { Link } from "react-router-dom";
import './side-menu.less'

function renderTitle(meta: IMenuMeta) {
  return (
    <span className="menu-item-inner">
      {meta.icon && <Icon type={meta.icon} className='menu-icon' />}
      <span className="menu-title"> {meta.title} </span>
    </span>
  );
}

function renderMenuRoute(menu: IMenu) {
  return (
    <Menu.Item key={menu.path}>
      <Link to={menu.path}>{renderTitle(menu.meta)}</Link>
    </Menu.Item>
  );
}

function renderSubMenu(menu: IMenu) {
  return (
    <Menu.SubMenu title={renderTitle(menu.meta)} key={menu.path}>
      {
        menu.children!.map((item: IMenu) => (
          item.children ? renderSubMenu(item) : renderMenuRoute(item)
        ))
      }
    </Menu.SubMenu>
  );
}

function renderMenu(menu: IMenu) {
  if (menu.children) {
    return renderSubMenu(menu)
  }
  
  return renderMenuRoute(menu)
}

export default renderMenu;

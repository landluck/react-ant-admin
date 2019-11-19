import React, { memo, useCallback } from 'react';
import { Avatar, Menu, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { ClickParam } from 'antd/lib/menu';
import NavDropdown from './NavDropdown';
import { IStoreState } from '../../store/types';

interface AvatarDropdownProps {
  avatar?: string;
  account: string;
  classNames: string;
}

function renderManageUser(onMenuClick: (params: ClickParam) => void) {
  return (
    <Menu selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <Icon type="user" />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <Icon type="setting" />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );
}

function AvatarDropdown({ account, avatar, classNames }: AvatarDropdownProps) {
  const onMenuClick = useCallback(({ key }: ClickParam) => {
    // console.log(key);
    message.success(key);
  }, []);

  return (
    <NavDropdown overlay={renderManageUser(onMenuClick)} trigger={['hover']}>
      <div className={classNames}>
        <Avatar size="small" className="layout__navbar__avatar" src={avatar} alt="avatar" />
        <span className="layout__navbar__account">{account}</span>
      </div>
    </NavDropdown>
  );
}

export default connect(({ user: { avatar, account } }: IStoreState) => ({ avatar, account }))(
  memo(AvatarDropdown),
);

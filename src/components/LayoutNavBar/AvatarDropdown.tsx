import React, { memo, useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, message } from 'antd';
import { connect } from 'react-redux';
import { ClickParam } from 'antd/lib/menu';
import { useHistory } from 'react-router-dom';
import NavDropdown from './NavDropdown';
import { IStoreState } from '../../store/types';
import { clearSideBarRoutes } from '../../store/module/app';
import { setUserInfo, UserState } from '../../store/module/user';
import { removeToken } from '../../utils/cookie';

interface AvatarDropdownProps {
  avatar?: string;
  account: string;
  classNames: string;
  clearSideBarRoutes: () => void;
  setUserInfo: (user: UserState) => void;
}

function renderManageUser(onMenuClick: (params: ClickParam) => void) {
  return (
    <Menu selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
}

function AvatarDropdown(props: AvatarDropdownProps) {
  const history = useHistory();

  const onMenuClick = useCallback(({ key }: ClickParam) => {
    // console.log(key);
    message.success(key);
    if (key === 'logout') {
      removeToken();
      props.setUserInfo({ token: '', account: '', avatar: '', mobile: '', id: 0, role: 0 });
      props.clearSideBarRoutes();
      history.replace('/system/login');
    }
  }, []);

  return (
    <NavDropdown overlay={renderManageUser(onMenuClick)} trigger={['hover']}>
      <div className={props.classNames}>
        <Avatar size="small" className="layout__navbar__avatar" src={props.avatar} alt="avatar" />
        <span className="layout__navbar__account">{props.account}</span>
      </div>
    </NavDropdown>
  );
}

export default connect(({ user: { avatar, account } }: IStoreState) => ({ avatar, account }), {
  clearSideBarRoutes,
  setUserInfo,
})(memo(AvatarDropdown));

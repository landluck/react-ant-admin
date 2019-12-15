import React, { memo, useCallback } from 'react';
import { Avatar, Menu, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { ClickParam } from 'antd/lib/menu';
import { useHistory } from 'react-router-dom';
import NavDropdown from './NavDropdown';
import { IStoreState } from '../../store/types';
import { setSideBarRoutes } from '../../store/module/app';
import { setUserInfo, UserState } from '../../store/module/user';
import { IRoute } from '../../router/config';
import { removeToken } from '../../utils/cookie';

interface AvatarDropdownProps {
  avatar?: string;
  account: string;
  classNames: string;
  setSideBarRoutes: (routes: IRoute[]) => void;
  setUserInfo: (user: UserState) => void;
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

function AvatarDropdown(props: AvatarDropdownProps) {
  const history = useHistory();

  const onMenuClick = useCallback(({ key }: ClickParam) => {
    // console.log(key);
    message.success(key);
    if (key === 'logout') {
      removeToken();
      props.setUserInfo({ token: '', account: '', avatar: '', mobile: '', id: 0, role: 0 });
      props.setSideBarRoutes([]);
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
  setSideBarRoutes,
  setUserInfo,
})(memo(AvatarDropdown));

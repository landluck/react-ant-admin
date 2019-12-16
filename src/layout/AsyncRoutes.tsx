import React, { memo } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { apiGetMenuList } from '../views/auth/user/service';
import { Menu } from '../views/auth/menu/service';
import { IRoute } from '../router/config';
import { IStoreState } from '../store/types';
import TransitionMain from '../components/TransitionMain';
import { setSideBarRoutes } from '../store/module/app';

interface AsyncRoutesProps {
  children: React.ReactNode;
  init: boolean;
  setSideBarRoutes: (routes: IRoute[]) => void;
}

function formatMenuToRoute(menus: Menu[]): IRoute[] {
  const result: IRoute[] = [];

  menus.forEach(menu => {
    const route: IRoute = {
      path: menu.url,
      meta: {
        title: menu.name,
        icon: menu.icon,
      },
    };
    if (menu.children) {
      route.children = formatMenuToRoute(menu.children);
    }
    result.push(route);
  });

  return result;
}

function AsyncRoutes(props: AsyncRoutesProps) {
  if (!props.init) {
    apiGetMenuList()
      .then(({ data }) => {
        props.setSideBarRoutes(formatMenuToRoute(data.list));
      })
      .catch(() => {});

    return <Spin className="layout__loading" />;
  }

  return <TransitionMain>{props.children}</TransitionMain>;
}

export default connect(({ app }: IStoreState) => ({ init: app.init }), { setSideBarRoutes })(
  memo(AsyncRoutes),
);

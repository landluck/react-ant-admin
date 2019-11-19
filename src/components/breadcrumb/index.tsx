import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';
import { IStoreState } from '../../store/types';
import { TagState } from '../../store/module/tags';
import { IRoute } from '../../router/config';
import './index.less';

interface BreadcrumbProps {
  breadcrumbs: TagState['breadcrumbs'];
}

function Breadcrumbs({ breadcrumbs }: BreadcrumbProps) {
  return (
    <div className="breadcrumb-container">
      <Breadcrumb>
        {breadcrumbs.map((route: IRoute) => (
          <Breadcrumb.Item key={route.path}>{route.meta.title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default connect(({ tags: { breadcrumbs } }: IStoreState) => ({ breadcrumbs }))(
  memo(Breadcrumbs),
);

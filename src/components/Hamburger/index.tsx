import React, { memo } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './index.less';

interface HamburgerProps {
  isActive: boolean;
  onTrigger: () => void;
}

function Hamburger({ isActive, onTrigger }: HamburgerProps) {
  return (
    <div className="layout__nav-bar__hamburger" onClick={onTrigger}>
      {isActive ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
    </div>
  );
}

export default memo(Hamburger);

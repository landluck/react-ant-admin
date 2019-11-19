import React, { memo } from 'react';
import { Icon, Badge } from 'antd';

interface NavBarItemProps {
  onClick: () => void;
  className: string;
  icon: string;
  count: number;
  overflowCount?: number;
}

function NavBarItem({ className, onClick, icon, ...badge }: NavBarItemProps) {
  return (
    <div className={className} onClick={onClick}>
      <Badge {...badge} style={{ boxShadow: 'none' }}>
        <Icon style={{ padding: '5px', fontSize: '16px' }} type={icon} />
      </Badge>
    </div>
  );
}

export default memo(NavBarItem);

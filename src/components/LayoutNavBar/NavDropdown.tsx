import React, { memo } from 'react';
import { DropDownProps } from 'antd/es/dropdown';
import { Dropdown } from 'antd';

interface NavDropDownProps extends DropDownProps {
  children: React.ReactNode;
}

function NavDropDown(props: NavDropDownProps) {
  return <Dropdown {...props}>{props.children}</Dropdown>;
}

export default memo(NavDropDown);

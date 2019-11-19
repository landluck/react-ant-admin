import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './index.less';

interface LogoProps {
  opened: boolean;
}

const config = {
  title: 'Ant design Pro',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
};

function Logo({ opened }: LogoProps) {
  return (
    <div
      className={classnames('layout__side-bar-logo-wrap', {
        'layout__side-bar-logo-wrap--close': !opened,
      })}
    >
      <Link to="/" className="layout__side-bar-link">
        {config.logo && <img src={config.logo} className="layout__side-bar-logo" alt="logo"></img>}
        {!opened && <h1 className="layout__side-bar-title">{config.title}</h1>}
      </Link>
    </div>
  );
}

export default memo(Logo);

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import AdminConfig from '../../config/index';
import './index.less';

interface LogoProps {
  opened: boolean;
}

function Logo({ opened }: LogoProps) {
  return (
    <div
      className={classnames('layout__side-bar-logo-wrap', {
        'layout__side-bar-logo-wrap--close': !opened,
      })}
    >
      <Link to="/" className="layout__side-bar-link">
        {AdminConfig.logo && (
          <img src={AdminConfig.logo} className="layout__side-bar-logo" alt="logo"></img>
        )}
        {!opened && <h1 className="layout__side-bar-title">{AdminConfig.title}</h1>}
      </Link>
    </div>
  );
}

export default memo(Logo);

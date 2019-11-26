import React, { memo } from 'react';
import { RouteComponentProps, useParams, Link } from 'react-router-dom';
import { Result, Button } from 'antd';

interface RegisterResultProps extends RouteComponentProps {}

interface RegisterResultParams {
  id: string;
}

function RegisterResult() {
  const params = useParams<RegisterResultParams>();

  return (
    <Result
      status="success"
      title="注册成功！请返回登陆页面登录"
      subTitle={`恭喜您，你是我们的第${params.id}位用户，赶快去登录体验功能吧`}
      extra={[
        <Link to="/system/login" key="/system/login">
          <Button type="primary" key="console">
            去 登 录
          </Button>
        </Link>,
      ]}
    />
  );
}

export default memo(RegisterResult);

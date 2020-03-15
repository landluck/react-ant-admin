import React, { useState, useCallback } from 'react';
import { GithubOutlined, ZhihuOutlined } from '@ant-design/icons';
import { Tabs, Checkbox, Button, Form } from 'antd';
import './index.less';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiUserLogin, apiUserLoginByMobile } from './service';
import { setUserInfo, UserState } from '../../../store/module/user';
import FormWrap from '../component/FormWrap';
import LoginItem from '../component/LoginItem';

interface LoginProps extends RouteComponentProps {
  setUserInfo: (userInfo: UserState) => void;
}

interface FormProp {
  account?: string;
  mobile?: string;
  password?: string;
  code?: number;
}

function Login(props: LoginProps) {
  const [activeTab, setActiveTab] = useState('account');
  const [form] = Form.useForm();

  const next = () => {
    const params = new URLSearchParams(window.location.search);
    const redirectURL = params.get('redirectURL');
    if (redirectURL) {
      window.location.href = redirectURL;
      return;
    }
    props.history.push('/');
  };

  const onSubmit = useCallback(() => {
    form.validateFields().then(res => {
      const values = res as FormProp;
      if (values.account && values.password) {
        apiUserLogin({
          account: values.account,
          password: values.password,
        })
          .then(({ data }: { data: UserState }) => {
            props.setUserInfo(data);
            next();
          })
          .catch(() => {});

        return;
      }

      if (values.mobile && values.code) {
        apiUserLoginByMobile({ mobile: values.mobile, code: values.code })
          .then(({ data }: { data: UserState }) => {
            props.setUserInfo(data);

            next();
          })
          .catch(() => {});
      }
    });
  }, []);

  return (
    <FormWrap className="page-login">
      <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="账号密码登录" key="account"></Tabs.TabPane>
        <Tabs.TabPane tab="手机号登录" key="mobile"></Tabs.TabPane>
      </Tabs>

      <Form onFinish={onSubmit} form={form}>
        {activeTab === 'account' ? (
          <>
            <LoginItem.Account form={form} />
            <LoginItem.Password form={form} />
          </>
        ) : (
          <>
            <LoginItem.Mobile form={form} />
            <LoginItem.Code form={form} />
          </>
        )}

        <Form.Item>
          <div className="align--between">
            <Checkbox defaultChecked>自动登录</Checkbox>
            <Link to="/system/recovery-pwd">忘记密码</Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button block htmlType="submit" type="primary">
            登录
          </Button>
        </Form.Item>

        <Form.Item>
          <div className="align--between">
            <div className="page-login__others">
              其他登录方式
              <GithubOutlined className="page-login__icon"></GithubOutlined>
              <ZhihuOutlined className="page-login__icon"></ZhihuOutlined>
            </div>
            <Link to="/system/register">注册账号</Link>
          </div>
        </Form.Item>
      </Form>
    </FormWrap>
  );
}

export default connect(() => ({}), {
  setUserInfo,
})(Login);

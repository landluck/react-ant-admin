import React, { useState, useCallback } from 'react';
import { Tabs, Checkbox, Button, Icon, Form, message } from 'antd';
import './index.less';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'react-redux';
import renderAccount from '../component/account';
import renderPassword from '../component/password';
import renderMobile from '../component/mobile';
import VerifyUtils from '../../../utils/verifty';
import { apiUserLogin, apiGetVerifyCode, apiUserLoginByMobile } from './service';
import { setUserInfo, UserState } from '../../../store/module/user';
import FormWrap from '../component/FormWrap';
import useCount from '../../../hooks/count';

interface LoginProps extends FormComponentProps, RouteComponentProps {
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

  const [count, beginTimer] = useCount();

  const { getFieldDecorator } = props.form;

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields((err, values: FormProp) => {
      if (!err) {
        if (values.account && values.password) {
          apiUserLogin({
            account: values.account,
            password: values.password,
          })
            .then(({ data }: { data: UserState }) => {
              props.setUserInfo(data);

              props.history.push('/');
            })
            .catch(() => {});

          return;
        }

        if (values.mobile && values.code) {
          apiUserLoginByMobile({ mobile: values.mobile, code: values.code })
            .then(({ data }: { data: UserState }) => {
              props.setUserInfo(data);

              props.history.push('/');
            })
            .catch(() => {});
        }
      }
    });
  }, []);

  const onTimeClick = useCallback(() => {
    const value = props.form.getFieldValue('mobile');

    if (!value || !VerifyUtils.verifyMobile(value)) {
      message.error('请输入合法手机号');
      return;
    }

    apiGetVerifyCode({ mobile: value })
      .then(() => {
        beginTimer();
      })
      .catch(() => {});
  }, []);

  return (
    <FormWrap className="page-login">
      <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="账号密码登录" key="account"></Tabs.TabPane>
        <Tabs.TabPane tab="手机号登录" key="mobile"></Tabs.TabPane>
      </Tabs>

      <Form onSubmit={onSubmit}>
        {activeTab === 'account' ? (
          <>
            {renderAccount(getFieldDecorator)}
            {renderPassword(getFieldDecorator)}
          </>
        ) : (
          renderMobile(getFieldDecorator, count, onTimeClick)
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
              <Icon className="page-login__icon" type="github"></Icon>
              <Icon className="page-login__icon" type="zhihu"></Icon>
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
})(Form.create({ name: 'login' })(Login));

import React, { memo, useCallback } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Form } from 'antd';
import FormWrap from '../component/FormWrap';
import { apiCreateUser } from './service';
import LoginItem from '../component/LoginItem';

interface RegisterProps extends RouteComponentProps {}

interface FormProp {
  account: string;
  password: string;
  mobile: string;
  code: string;
}

function Register(props: RegisterProps) {
  const [form] = Form.useForm();

  const onSubmit = useCallback(() => {
    form.validateFields().then(res => {
      const values = res as FormProp;
      apiCreateUser(values)
        .then(({ data }) => {
          props.history.push(`/system/register-result/${data.id}`);
        })
        .catch(() => {});
    });
  }, []);

  return (
    <FormWrap>
      <Form onFinish={onSubmit} form={form}>
        <LoginItem.Account form={form} />
        <LoginItem.Password form={form} />
        <LoginItem.Confirm form={form} />
        <LoginItem.Mobile form={form} />
        <LoginItem.Code form={form} />

        <Form.Item>
          <div className="align--between vertical-middle">
            <Button htmlType="submit" type="primary" style={{ width: '150px' }}>
              注册
            </Button>
            <Link to="/system/login">使用已有账号登录</Link>
          </div>
        </Form.Item>
      </Form>
    </FormWrap>
  );
}

export default memo(Register);

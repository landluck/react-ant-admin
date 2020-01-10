import React, { memo, useCallback } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Form, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormWrap from '../component/FormWrap';
import { apiCreateUser } from './service';
import LoginItem from '../component/LoginItem';

interface RegisterProps extends FormComponentProps, RouteComponentProps {}

interface FormProp {
  name: string;
  account: string;
  password: string;
  mobile: string;
  code: string;
}

function Register(props: RegisterProps) {
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields((err, values: FormProp) => {
      if (!err) {
        apiCreateUser(values)
          .then(({ data }) => {
            props.history.push(`/system/register-result/${data.id}`);
          })
          .catch(() => {});
      }
    });
  }, []);

  return (
    <FormWrap>
      <Form onSubmit={onSubmit}>
        <LoginItem.UserName form={props.form} />
        <LoginItem.Account form={props.form} />
        <LoginItem.Password form={props.form} />
        <LoginItem.Confirm form={props.form} />
        <LoginItem.Mobile form={props.form} />
        <LoginItem.Code form={props.form} />

        <Form.Item>
          <div className="align--between">
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

export default memo(Form.create({ name: 'register' })(Register));

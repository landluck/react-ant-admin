import React, { memo, useCallback } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Form, Input, Button, message, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormWrap from '../component/FormWrap';
import renderAccount from '../component/account';
import renderMobile from '../component/mobile';
import useCount from '../../../hooks/count';
import VerifyUtils from '../../../utils/verifty';
import { apiGetVerifyCode } from '../login/service';
import { apiCreateUser } from './service';
import { renderPasswordAndConfirm } from '../component/password';

interface RegisterProps extends FormComponentProps, RouteComponentProps {}

interface FormProp {
  name: string;
  account: string;
  password: string;
  mobile: string;
  code: string;
}

function Register(props: RegisterProps) {
  const [count, beginTimer] = useCount();

  const { getFieldDecorator } = props.form;

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
        <Form.Item hasFeedback>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入用户名称' }],
          })(
            <Input size="large" prefix={<Icon type="user" />} type="text" placeholder="用户名称" />,
          )}
        </Form.Item>

        {renderAccount(getFieldDecorator)}
        {renderPasswordAndConfirm(getFieldDecorator, props.form.getFieldValue('password'))}

        {renderMobile(getFieldDecorator, count, onTimeClick)}

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

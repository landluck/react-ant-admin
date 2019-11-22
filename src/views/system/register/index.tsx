import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormWrap from '../component/FormWrap';
import renderAccount from '../component/account';
import renderMobile from '../component/mobile';

interface RegisterProps extends FormComponentProps {}

function Register({ form }: RegisterProps) {
  const { getFieldDecorator } = form;

  return (
    <FormWrap>
      <Form>
        {renderAccount(getFieldDecorator)}
        <Form.Item>
          {getFieldDecorator('confirmPassword', {
            rules: [{ required: true, message: '请输入合法密码' }],
          })(<Input type="password" placeholder="确认密码" />)}
        </Form.Item>
        {renderMobile(getFieldDecorator, 1, () => {})}

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

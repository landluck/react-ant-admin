import React from 'react';
import { Form, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';

function renderPassword(getFieldDecorator: FormComponentProps['form']['getFieldDecorator']) {
  return (
    <>
      <Form.Item hasFeedback>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入合法密码', min: 5 }],
        })(
          <Input
            size="large"
            prefix={<Icon type="lock" />}
            type="password"
            placeholder="大于6位的密码"
          />,
        )}
      </Form.Item>
    </>
  );
}

export function renderPasswordAndConfirm(
  getFieldDecorator: FormComponentProps['form']['getFieldDecorator'],
  password: string,
) {
  return (
    <>
      <Form.Item hasFeedback>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入合法密码', min: 5 }],
        })(
          <Input
            size="large"
            prefix={<Icon type="lock" />}
            type="password"
            placeholder="大于6位的密码"
          />,
        )}
      </Form.Item>
      <Form.Item hasFeedback>
        {getFieldDecorator('confirm', {
          rules: [
            { required: true, message: '请输入合法密码' },
            {
              validator: (rules: any, value: string, callback: (message?: string) => void) => {
                if (value && value !== password) {
                  callback('两次输入的密码不一致，请重新输入');
                }

                callback();
              },
            },
          ],
        })(
          <Input
            size="large"
            prefix={<Icon type="lock" />}
            type="password"
            placeholder="确认密码"
          />,
        )}
      </Form.Item>
    </>
  );
}

export default renderPassword;

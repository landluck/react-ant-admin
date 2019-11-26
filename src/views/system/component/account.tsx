import React from 'react';
import { Form, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';

function renderAccount(getFieldDecorator: FormComponentProps['form']['getFieldDecorator']) {
  return (
    <>
      <Form.Item hasFeedback>
        {getFieldDecorator('account', {
          rules: [{ required: true, message: '请输入合法账号', min: 6, max: 18 }],
        })(<Input size="large" prefix={<Icon type="user" />} placeholder="6-18位账号" />)}
      </Form.Item>
    </>
  );
}

export default renderAccount;

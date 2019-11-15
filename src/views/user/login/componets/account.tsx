import React from 'react'
import { Form, Input, Icon } from 'antd'
import { FormComponentProps } from 'antd/es/form';


function renderAccount (getFieldDecorator: FormComponentProps['form']['getFieldDecorator']) {

  return (
    <>
      <Form.Item>
        {
          getFieldDecorator('account', 
            {
              rules: [{ required: true, message: '请输入合法账号', min: 6, max: 18 }],
            }
          )(
            <Input
              size='large'
              prefix={<Icon type="user" />}
              placeholder="6-18位账号"
            />,
          )
        }
      </Form.Item>

      <Form.Item>
        {
          getFieldDecorator('password',
            {
              rules: [{ required: true, message: '请输入合法密码', min: 5 }],
            }
          )(
            <Input
              size='large'
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="大于6位的密码"
            />
          )
        }
      </Form.Item>
    </>
  )
}

export default renderAccount
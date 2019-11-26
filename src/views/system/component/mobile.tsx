import React from 'react';
import { Form, Input, Icon, Button, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/es/form';

function renderMobile(
  getFieldDecorator: FormComponentProps['form']['getFieldDecorator'],
  count: number,
  onTimeClick: () => void,
) {
  return (
    <>
      <Form.Item hasFeedback>
        {getFieldDecorator('mobile', {
          rules: [{ required: true, message: '请输入合法手机号', len: 11 }],
        })(
          <Input
            size="large"
            type="text"
            prefix={<Icon type="user" />}
            placeholder="11位合法手机号"
          />,
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('code', {
          rules: [{ required: true, message: '请输入验证码', len: 6 }],
        })(
          <Row gutter={8}>
            <Col span={16}>
              <Input
                size="large"
                prefix={<Icon type="lock" />}
                type="number"
                placeholder="6位验证码"
              />
            </Col>
            <Col span={8}>
              <Button disabled={count !== 60} block onClick={onTimeClick}>
                {count === 60 ? '验证码' : `${count}S`}
              </Button>
            </Col>
          </Row>,
        )}
      </Form.Item>
    </>
  );
}

export default renderMobile;

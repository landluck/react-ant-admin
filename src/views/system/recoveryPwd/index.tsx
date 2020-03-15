import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Steps, Row, Col, Result, Form } from 'antd';
import FormWrap from '../component/FormWrap';
import { apiUpdateUserPwd } from './service';
import LoginItem from '../component/LoginItem';

interface FormProp {
  password: string;
  mobile: string;
  code: string;
}

function RecoveryPwd() {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  const [mobile, setMobile] = useState('');

  const [code, setCode] = useState('');

  const onSubmit = () => {
    form.validateFields().then(res => {
      const values = res as FormProp;
      if (values.code) {
        setCode(values.code);
      }
      if (values.mobile) {
        setMobile(values.mobile);
      }

      if (values.password) {
        apiUpdateUserPwd({ code, mobile, ...values })
          .then(() => {
            setCurrent(current + 1);
          })
          .catch(() => {});
      }

      if (current === 0) {
        setCurrent(current + 1);
      }
    });
  };

  return (
    <>
      <Row justify="center">
        <Col span={8}>
          <Steps progressDot current={current} style={{ marginTop: '100px' }}>
            <Steps.Step title="验证手机号" />
            <Steps.Step title="填写新密码" />
            <Steps.Step title="完成修改" />
          </Steps>
        </Col>
      </Row>
      <FormWrap>
        <Form onFinish={onSubmit} form={form}>
          {(() => {
            switch (current) {
              case 0:
                return (
                  <React.Fragment>
                    <LoginItem.Mobile form={form}></LoginItem.Mobile>
                    <LoginItem.Code form={form}></LoginItem.Code>
                  </React.Fragment>
                );
              case 1:
                return (
                  <React.Fragment>
                    <LoginItem.Password form={form}></LoginItem.Password>
                    <LoginItem.Confirm form={form}></LoginItem.Confirm>
                  </React.Fragment>
                );
              case 2:
                return (
                  <Result
                    status="success"
                    title="修改成功!"
                    extra={[
                      <Link to="/system/login" key="/system/login">
                        <Button type="primary" key="console">
                          去 登 录
                        </Button>
                      </Link>,
                    ]}
                  />
                );
              default:
                return null;
            }
          })()}

          {current < 2 && (
            <Form.Item style={{ paddingTop: '30px' }}>
              <Button htmlType="submit" block type="primary">
                {current === 1 ? '提交' : '下一步'}
              </Button>
            </Form.Item>
          )}
        </Form>
      </FormWrap>
    </>
  );
}

export default memo(RecoveryPwd);

import React, { memo, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Form, Button, Steps, Row, Col, Result } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormWrap from '../component/FormWrap';
import { apiUpdateUserPwd } from './service';
import LoginItem from '../component/LoginItem';

interface RecoveryPwdProps extends FormComponentProps, RouteComponentProps {}

interface FormProp {
  password: string;
  mobile: string;
  code: string;
}

function RecoveryPwd(props: RecoveryPwdProps) {
  const [current, setCurrent] = useState(0);

  const [mobile, setMobile] = useState('');

  const [code, setCode] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields((err, values: FormProp) => {
      if (!err) {
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
      }
    });
  };

  return (
    <>
      <Row type="flex" justify="center">
        <Col span={8}>
          <Steps progressDot current={current} style={{ marginTop: '100px' }}>
            <Steps.Step title="验证手机号" />
            <Steps.Step title="填写新密码" />
            <Steps.Step title="完成修改" />
          </Steps>
        </Col>
      </Row>
      <FormWrap>
        <Form onSubmit={onSubmit}>
          {(() => {
            switch (current) {
              case 0:
                return (
                  <React.Fragment>
                    <LoginItem.Mobile form={props.form}></LoginItem.Mobile>
                    <LoginItem.Code form={props.form}></LoginItem.Code>
                  </React.Fragment>
                );
              case 1:
                return (
                  <React.Fragment>
                    <LoginItem.Password form={props.form}></LoginItem.Password>
                    <LoginItem.Confirm form={props.form}></LoginItem.Confirm>
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

export default memo(Form.create({ name: 'recovery-pwd' })(RecoveryPwd));

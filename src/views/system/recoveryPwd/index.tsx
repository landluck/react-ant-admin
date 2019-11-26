import React, { memo, useCallback, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Form, Button, message, Steps, Row, Col, Result } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormWrap from '../component/FormWrap';
import renderMobile from '../component/mobile';
import useCount from '../../../hooks/count';
import VerifyUtils from '../../../utils/verifty';
import { apiGetVerifyCode } from '../login/service';
import { renderPasswordAndConfirm } from '../component/password';
import { apiUpdateUserPwd } from './service';

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
                return renderMobile(getFieldDecorator, count, onTimeClick);
              case 1:
                return renderPasswordAndConfirm(
                  getFieldDecorator,
                  props.form.getFieldValue('password'),
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

export default memo(Form.create({ name: 'register' })(RecoveryPwd));

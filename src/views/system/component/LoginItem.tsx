import React, { memo, useCallback } from 'react';
import { Icon } from 'antd';
import { InputProps } from 'antd/lib/input';
import { FormItemProps, FormComponentProps } from 'antd/lib/form';
import FormInputItem from './FormItem';
import { apiGetVerifyCode } from '../login/service';

export interface LoginItemType {
  UserName: React.FC<LoginItemProps>;
  Account: React.FC<LoginItemProps>;
  Password: React.FC<LoginItemProps>;
  Confirm: React.FC<LoginItemProps>;
  Mobile: React.FC<LoginItemProps>;
  Code: React.FC<LoginItemProps>;
}

interface LoginItemConfig {
  name: string;
  rules: any[];
  inputProps: InputProps & { visibilityToggle?: boolean };
}

interface LoginItemProps {
  form: FormComponentProps['form'];
  countStatic?: number;
  onGetMobileCode?: (cb: () => void) => void;
}

const config: { [key in keyof LoginItemType]: LoginItemConfig } = {
  UserName: {
    name: 'name',
    inputProps: {
      size: 'large',
      prefix: <Icon type="user" />,
      placeholder: '用户昵称',
      type: 'text',
    },
    rules: [{ required: true, message: '请输入用户名称', min: 6, max: 18 }],
  },
  Account: {
    name: 'account',
    inputProps: {
      size: 'large',
      prefix: <Icon type="user" />,
      placeholder: '6-18位账号',
      type: 'text',
    },
    rules: [{ required: true, message: '请输入合法账号', min: 6, max: 18 }],
  },
  Mobile: {
    name: 'mobile',
    inputProps: {
      size: 'large',
      prefix: <Icon type="user" />,
      placeholder: '11位合法手机号',
      type: 'mobile',
    },
    rules: [{ required: true, message: '请输入合法手机号', len: 11 }],
  },
  Password: {
    name: 'password',
    inputProps: {
      size: 'large',
      prefix: <Icon type="lock" />,
      placeholder: '大于6位的密码',
      type: 'password',
      visibilityToggle: true,
    },
    rules: [{ required: true, message: '请输入合法密码', min: 5 }],
  },
  Confirm: {
    name: 'password',
    inputProps: {
      size: 'large',
      id: 'confirm',
      prefix: <Icon type="lock" />,
      placeholder: '确认密码',
      type: 'password',
      visibilityToggle: true,
    },
    rules: [],
  },

  Code: {
    name: 'code',
    inputProps: {
      size: 'large',
      placeholder: '大于6位的密码',
      prefix: <Icon type="lock" />,
      type: 'code',
    },
    rules: [{ required: true, message: '请输入验证码', len: 6 }],
  },
};

const formProps: FormItemProps = {
  hasFeedback: true,
};

function Account(props: LoginItemProps) {
  return <FormInputItem formProps={formProps} {...config.Account} {...props} />;
}
function UserName(props: LoginItemProps) {
  return <FormInputItem formProps={formProps} {...config.UserName} {...props} />;
}

function Password(props: LoginItemProps) {
  return <FormInputItem formProps={formProps} {...config.Password} {...props} />;
}

function Confirm(props: LoginItemProps) {
  return (
    <FormInputItem
      formProps={formProps}
      {...config.Confirm}
      {...props}
      rules={[
        { required: true, message: '请输入合法密码' },
        {
          validator: (rules: any, value: string, callback: (message?: string) => void) => {
            if (value && value !== props.form.getFieldValue('password')) {
              callback('两次输入的密码不一致，请重新输入');
            }

            callback();
          },
        },
      ]}
    />
  );
}

function Mobile(props: LoginItemProps) {
  return <FormInputItem formProps={formProps} {...config.Mobile} {...props} />;
}

function Code(props: LoginItemProps) {
  // 在测试环境下，接口会直接跑错，显示验证码,所以需要在catch的情况下 也回调
  const onGetMobileCode = useCallback((cb: () => void) => {
    props.form.validateFields(['mobile'], (err, values) => {
      if (!err) {
        apiGetVerifyCode({ mobile: values.mobile })
          .then(() => {
            cb();
          })
          .catch(() => {
            cb();
          });
      }
    });
  }, []);

  return (
    <FormInputItem formProps={{}} {...config.Code} {...props} onGetMobileCode={onGetMobileCode} />
  );
}

const LoginItem: LoginItemType = {
  Account: memo(Account),
  UserName: memo(UserName),
  Password: memo(Password),
  Confirm: memo(Confirm),
  Mobile: memo(Mobile),
  Code: memo(Code),
};

export default LoginItem;

import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Input, message, Switch, Select, Upload, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { User, apiUpdateUser, apiCreateUser } from './service';
import { Role, apiGetRoleList } from '../role/service';
import { IStoreState } from '../../../store/types';

export interface AddOrEditUserProps extends FormComponentProps {
  visible: boolean;
  user: User | null;
  token: string;
  onClose: () => void;
  onConfirm: () => void;
}

interface AddOrEditUserFormProps {
  id?: number;
  name: string;

  account: string;

  password: string;

  avatar?: string | null;

  mobile: string;

  roleId: number;

  status: number;
}

function AddOrEditUser(props: AddOrEditUserProps) {
  const { user, visible } = props;
  const { getFieldDecorator } = props.form;

  const [roleList, setRoleList] = useState<Role[]>([]);

  const initRoleList = async () => {
    try {
      const { data } = await apiGetRoleList({ page: 1, size: 999 });

      setRoleList(data.list);
    } catch (error) {
      // do
    }
  };

  useEffect(() => {
    initRoleList();
  }, []);

  const onOk = useCallback(() => {
    props.form.validateFields((err, values: AddOrEditUserFormProps) => {
      if (!err) {
        const info: User = {
          ...user,
          ...values,
        };

        if (info.id) {
          apiUpdateUser(info)
            .then(() => {
              message.success('修改成功');
              props.onConfirm();
            })
            .catch(() => {});
        } else {
          apiCreateUser(info)
            .then(() => {
              message.success('创建成功');
              props.onConfirm();
            })
            .catch(() => {});
        }
      }
    });
  }, []);

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      title={`${user && user.id ? '编辑' : '新增'}用户`}
      onCancel={props.onClose}
      onOk={onOk}
    >
      <Form
        labelCol={{
          sm: { span: 5 },
        }}
        wrapperCol={{
          sm: { span: 16 },
        }}
      >
        {user && user.id ? (
          <Form.Item label="用户ID">
            {getFieldDecorator('id', { initialValue: user.id })(<Input disabled />)}
          </Form.Item>
        ) : null}
        <Form.Item label="用户名称">
          {getFieldDecorator('name', {
            initialValue: user && user.name,
            rules: [{ required: true, message: '请输入用户名称' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="用户账号">
          {getFieldDecorator('account', {
            initialValue: user && user.account,
            rules: [{ required: true, message: '请输入用户账号' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="手机号码">
          {getFieldDecorator('mobile', {
            initialValue: user && user.account,
            rules: [{ required: true, message: '请输入用户手机号' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="用户角色">
          {getFieldDecorator('roleId', {
            initialValue: user && user.roleId,
            rules: [{ required: true, message: '请选择用户角色' }],
          })(
            <Select placeholder="请选择用户角色">
              {roleList.map((role: Role) => (
                <Select.Option key={role.id} value={role.id}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="用户状态">
          {getFieldDecorator('status', {
            initialValue: user && user.status === 1,
            valuePropName: 'checked',
            rules: [{ required: true, message: '请选择用户角色' }],
          })(<Switch />)}
        </Form.Item>
        <Form.Item label="用户头像">
          <Upload
            name="file"
            accept="image/*"
            listType="picture-card"
            headers={{ token: props.token }}
            showUploadList={false}
            action="/upload/image"
          >
            {user && user.avatar ? (
              <img src={user.avatar} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default connect(({ user }: IStoreState) => ({ token: user.token }))(
  Form.create<AddOrEditUserProps>()(AddOrEditUser),
);

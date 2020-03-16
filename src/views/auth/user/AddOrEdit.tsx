import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Input, message, Switch, Select, Upload, Form } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { User, apiUpdateUser, apiCreateUser } from './service';
import { Role, apiGetRoleList } from '../role/service';
import { IStoreState } from '../../../store/types';

export interface AddOrEditUserProps {
  visible: boolean;
  user: User | null;
  token: string;
  onClose: () => void;
  onConfirm: () => void;
}

interface AddOrEditUserFormProps {
  id?: number;

  account: string;

  password: string;

  avatar?: string | null;

  mobile: string;

  roleId: number;

  status: number;
}

function AddOrEditUser(props: AddOrEditUserProps) {
  const { user, visible } = props;
  const [form] = Form.useForm();

  const [roleList, setRoleList] = useState<Role[]>([]);
  const [avatar, setAvatar] = useState<string>(() => (user && user.avatar ? user.avatar : ''));

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
    form.validateFields().then(res => {
      const values = res as AddOrEditUserFormProps;
      const info: User = {
        ...user,
        ...values,
        avatar,
        status: values.status ? 1 : 0,
      };

      if (info.role) {
        delete info.role;
      }

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
    });
  }, [avatar]);

  const onChange = useCallback(({ file }: UploadChangeParam<UploadFile<any>>) => {
    if (file.response && file.response.code === 200) {
      setAvatar(file.response.data[0].url);
    }
  }, []);

  // const reset = form.getFieldValue('reset');

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      title={`${user && user.id ? '编辑' : '新增'}用户`}
      onCancel={props.onClose}
      onOk={onOk}
    >
      <Form
        form={form}
        initialValues={user || {}}
        labelCol={{
          sm: { span: 5 },
        }}
        wrapperCol={{
          sm: { span: 16 },
        }}
      >
        {user && user.id ? (
          <Form.Item label="用户ID" name="id">
            <Input disabled />
          </Form.Item>
        ) : null}
        <Form.Item
          label="用户账号"
          name="account"
          rules={[{ required: true, message: '请输入用户账号' }]}
        >
          <Input />
        </Form.Item>
        {/* {user && (
          <Form.Item
            label="重置密码"
            name="reset"
          >
            <Switch />
          </Form.Item>
        )}
        {(!user || reset) && (
          <Form.Item
            label={reset ? '重置密码' : '初始密码'}
            name="password"
            rules={[{ required: true, message: '请输入用户密码' }]}
          >
            <Input.Password visibilityToggle />
          </Form.Item>
        )} */}
        <Form.Item
          label="手机号码"
          name="mobile"
          rules={[{ required: true, message: '请输入用户手机号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户角色"
          name="roleId"
          rules={[{ required: true, message: '请选择用户角色' }]}
        >
          <Select placeholder="请选择用户角色">
            {roleList.map((role: Role) => (
              <Select.Option key={role.id} value={role.id!}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="用户状态"
          name="status"
          rules={[{ required: true, message: '请选择用户角色' }]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item label="用户头像">
          <Upload
            name="file"
            accept="image/*"
            listType="picture-card"
            headers={{ token: props.token }}
            showUploadList={false}
            action="/upload/image"
            onChange={onChange}
          >
            {avatar ? (
              <img src={avatar} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div>
                <PlusOutlined />
                <div className="ant-upload-text">上传</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default connect(({ user }: IStoreState) => ({ token: user.token }))(AddOrEditUser);

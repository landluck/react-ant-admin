import React, { useCallback } from 'react';
import { Form, Modal, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Role, apiUpdateRole, apiCreateRole } from './service';

export interface AddOrEditRoleProps extends FormComponentProps {
  visible: boolean;
  role: Role | null;
  onClose: () => void;
  onConfirm: () => void;
}

interface AddOrEditRoleFormProps {
  id?: number;
  name: string;
  url: string;
  icon: string;
  sort: number;
  desc?: string;
  parentIds: number[];
}

function AddOrEditRole(props: AddOrEditRoleProps) {
  const { role, visible } = props;
  const { getFieldDecorator } = props.form;

  const onOk = useCallback(() => {
    props.form.validateFields((err, values: AddOrEditRoleFormProps) => {
      if (!err) {
        const info: Role = {
          ...role,
          ...values,
        };

        if (info.id) {
          apiUpdateRole(info)
            .then(() => {
              message.success('修改成功');
              props.onConfirm();
            })
            .catch(() => {});
        } else {
          apiCreateRole(info)
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
      title={`${role && role.id ? '编辑' : '新增'}角色`}
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
        {role && role.id ? (
          <Form.Item label="角色Id">
            {getFieldDecorator('id', { initialValue: role.id })(<Input disabled />)}
          </Form.Item>
        ) : null}
        <Form.Item label="角色名称">
          {getFieldDecorator('name', {
            initialValue: role && role.name,
            rules: [{ required: true, message: '请输入角色名称' }],
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Form.create<AddOrEditRoleProps>()(AddOrEditRole);

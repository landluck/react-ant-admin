import React, { useState, useEffect, useCallback } from 'react';
import { Form, Modal, Input, Cascader, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Menu, apiGetMenuCascader, apiUpdateMenu, apiCreateMenu } from './service';

export interface AddOrEditMenuProps extends FormComponentProps {
  visible: boolean;
  menu: Menu | null;
  onClose: () => void;
  onConfirm: () => void;
}

interface AddOrEditMenuFormProps {
  id?: number;
  name: string;
  url: string;
  icon: string;
  sort: number;
  desc?: string;
  parentIds: number[];
}

function AddOrEditMenu(props: AddOrEditMenuProps) {
  const { menu, visible } = props;
  const { getFieldDecorator } = props.form;

  const onOk = useCallback(() => {
    props.form.validateFields((err, values: AddOrEditMenuFormProps) => {
      if (!err) {
        const len = values.parentIds.length;

        const info: Menu = {
          ...menu,
          ...values,
          sort: values.sort * 1,
          level: len + 1,
          parentId: len > 0 ? values.parentIds[len - 1] : 0,
        };

        if (info.id) {
          apiUpdateMenu(info)
            .then(() => {
              message.success('修改成功');
              props.onConfirm();
            })
            .catch(() => {});
        } else {
          apiCreateMenu(info)
            .then(() => {
              message.success('创建成功');
              props.onConfirm();
            })
            .catch(() => {});
        }
      }
    });
  }, []);

  const [menuList, setMenuList] = useState<Menu[]>([]);

  const initMenuList = async () => {
    try {
      const { data } = await apiGetMenuCascader();

      setMenuList(data);
    } catch (error) {
      // do
    }
  };

  useEffect(() => {
    initMenuList();
  }, []);

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      title={`${menu && menu.id ? '编辑' : '新增'}菜单`}
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
        {menu && menu.id ? (
          <Form.Item label="菜单Id">
            {getFieldDecorator('id', { initialValue: menu.id })(<Input disabled />)}
          </Form.Item>
        ) : null}
        <Form.Item label="菜单名称">
          {getFieldDecorator('name', {
            initialValue: menu && menu.name,
            rules: [{ required: true, message: '请输入菜单名称' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="菜单URL">
          {getFieldDecorator('url', {
            initialValue: menu && menu.url,
            rules: [{ required: true, message: '请输入菜单url' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="菜单图标">
          {getFieldDecorator('icon', {
            initialValue: menu && menu.icon,
            rules: [{ required: true, message: '请输入菜单图标' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="菜单排序">
          {getFieldDecorator('sort', {
            initialValue: menu && menu.sort,
            rules: [{ required: true, message: '请输入菜单排序' }],
          })(<Input type="number" />)}
        </Form.Item>
        <Form.Item label="菜单描述">
          {getFieldDecorator('desc', { initialValue: menu && menu.desc })(<Input />)}
        </Form.Item>
        <Form.Item label="父级菜单">
          {getFieldDecorator('parentIds', {
            initialValue: menu && menu.parent ? [menu.parent.id] : [],
          })(
            <Cascader
              options={menuList}
              fieldNames={{ label: 'name', value: 'id' }}
              changeOnSelect
            />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Form.create<AddOrEditMenuProps>()(AddOrEditMenu);

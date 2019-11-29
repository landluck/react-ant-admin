import React, { useState, useEffect } from 'react';
import { Form, Modal, Input, Cascader } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Menu, apiGetMenuCascader } from './service';

export interface AddOrEditMenuProps extends FormComponentProps {
  visible: boolean;
  menu: Menu | null;
  onClose: () => void;
  onConfirm: () => void;
}

function AddOrEditMenu(props: AddOrEditMenuProps) {
  const { menu, visible } = props;
  const { getFieldDecorator } = props.form;

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
    <Modal visible={visible} title={`${menu && menu.id ? '编辑' : '新增'}菜单`}>
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
        <Form.Item label="菜单描述">
          {getFieldDecorator('desc', { initialValue: menu && menu.desc })(<Input />)}
        </Form.Item>
        <Form.Item label="父级菜单">
          {getFieldDecorator('parentId', {
            initialValue: menu && menu.parentId ? [menu.parentId] : [],
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

import React, { useState, useEffect, useCallback, memo } from 'react';
import { Modal, Input, Cascader, message, Form } from 'antd';
import { Menu, apiGetMenuCascader, apiUpdateMenu, apiCreateMenu } from './service';

export interface AddOrEditMenuProps {
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
  const [form] = Form.useForm();

  if (menu && menu.parent) {
    menu.parentIds = [menu.parent.id!];
  }
  const onOk = useCallback(() => {
    form.validateFields().then(res => {
      const values = res as AddOrEditMenuFormProps;

      if (!values.parentIds) {
        values.parentIds = [];
      }

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
        name="menu"
        form={form}
        initialValues={menu || {}}
        labelCol={{
          sm: { span: 5 },
        }}
        wrapperCol={{
          sm: { span: 16 },
        }}
      >
        {menu && menu.id ? (
          <Form.Item label="菜单Id" name="id">
            <Input disabled />
          </Form.Item>
        ) : null}
        <Form.Item
          label="菜单名称"
          name="name"
          rules={[{ required: true, message: '请输入菜单名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label="菜单URL"
          rules={[{ required: true, message: '请输入菜单url' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="菜单图标"
          name="icon"
          rules={[{ required: true, message: '请输入菜单图标' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="菜单排序"
          name="sort"
          rules={[{ required: true, message: '请输入菜单排序' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="菜单描述"
          name="desc"
          rules={[{ required: true, message: '请输入菜单描述' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="父级菜单" name="parentIds">
          <Cascader options={menuList} fieldNames={{ label: 'name', value: 'id' }} changeOnSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default memo(AddOrEditMenu);

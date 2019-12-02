import React, { useCallback, useState, useEffect } from 'react';
import { Form, Modal, Input, Tree } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Role, apiGetMenuListByRoleId } from './service';
import { apiGetMenuCascader, Menu } from '../menu/service';

function renderTree(menu: Menu) {
  if (menu.children) {
    return (
      <Tree.TreeNode title={menu.name} key={`key-${menu.id}`}>
        {menu.children!.map((item: Menu) => renderTree(item))}
      </Tree.TreeNode>
    );
  }

  return <Tree.TreeNode title={menu.name} key={`key-${menu.id}`}></Tree.TreeNode>;
}

export interface EditMenuProps extends FormComponentProps {
  visible: boolean;
  role: Role;
  onClose: () => void;
  onConfirm: () => void;
}

function EditMenu(props: EditMenuProps) {
  const { role, visible } = props;
  const { getFieldDecorator } = props.form;

  const [menuList, setMeunList] = useState<Menu[]>([]);
  const [roleMenuIds, setRoleMenuIds] = useState<string[]>([]);

  const initMenuList = async () => {
    try {
      const { data } = await apiGetMenuCascader();
      setMeunList(data);
    } catch (error) {
      // do
    }
  };
  const initMenuListByRoleId = async () => {
    try {
      const { data } = await apiGetMenuListByRoleId(role.id!);
      setRoleMenuIds(data.ids.map((id: any) => `key-${id}`));
    } catch (error) {
      // do
    }
  };

  useEffect(() => {
    initMenuList();
    initMenuListByRoleId();
  }, []);

  const onOk = useCallback(() => {
    // props.form.validateFields((err, values: AddOrEditRoleFormProps) => {
    //   if (!err) {
    //    // do
    //   }
    // });
  }, []);

  const onExpand = useCallback((expandedKeys: string[]) => {
    setRoleMenuIds(expandedKeys);
  }, []);
  const onCheck = useCallback(
    (
      checkedKeys:
        | string[]
        | {
            checked: string[];
            halfChecked: string[];
          },
    ) => {
      console.log(checkedKeys);
      // setRoleMenuIds(checkedKeys)
    },
    [],
  );
  const onSelect = useCallback((selectedKeys: string[]) => {
    console.log(selectedKeys);
  }, []);

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      title="编辑角色权限"
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
        <Form.Item label="角色Id">
          {getFieldDecorator('id', { initialValue: role.id })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="角色名称">
          {getFieldDecorator('name', {
            initialValue: role && role.name,
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="菜单权限">
          <Tree
            checkable
            checkedKeys={roleMenuIds}
            expandedKeys={roleMenuIds}
            onExpand={onExpand}
            onCheck={onCheck}
            onSelect={onSelect}
            selectedKeys={roleMenuIds}
          >
            {menuList.map((menu: Menu) => renderTree(menu))}
          </Tree>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Form.create<EditMenuProps>()(EditMenu);

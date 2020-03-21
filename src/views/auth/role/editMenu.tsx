import React, { useCallback, useState, useEffect, memo, ReactText, useMemo } from 'react';
import { Modal, Input, Tree, message, Form } from 'antd';
import { Role, apiGetMenuListByRoleId, apiUpdateMenuListByRoleId } from './service';
import { apiGetMenuCascader, Menu } from '../menu/service';

interface DataNode {
  title?: React.ReactNode;
  key: string | number;
  children?: DataNode[];
}

function renderTree(menuList: Menu[]): DataNode[] {
  const list: DataNode[] = [];

  menuList.forEach(menu => {
    if (menu.children) {
      list.push({
        title: menu.name,
        key: menu.id!.toString(),
        children: renderTree(menu.children),
      });
    } else {
      list.push({ title: menu.name, key: menu.id!.toString() });
    }
  });

  return list;
}

export interface EditMenuProps {
  visible: boolean;
  role: Role;
  onClose: () => void;
  onConfirm: () => void;
}

function EditMenu(props: EditMenuProps) {
  const { role, visible } = props;
  const [form] = Form.useForm();

  const [menuList, setMeunList] = useState<Menu[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [expandKeys, setExpandKeys] = useState<string[]>([]);
  const [checkedKeys, setCheckKeys] = useState<{ checked: string[]; halfChecked: string[] }>({
    checked: [],
    halfChecked: [],
  });

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
      const keys = data.ids.map((id: any) => `${id}`);

      setCheckKeys({
        checked: keys,
        halfChecked: [],
      });
      setExpandKeys(keys);
      setSelectedKeys(keys);
    } catch (error) {
      // do
    }
  };

  useEffect(() => {
    initMenuList();
    initMenuListByRoleId();
  }, []);

  const onOk = useCallback(() => {
    apiUpdateMenuListByRoleId(
      role.id!,
      checkedKeys.checked.map(id => Number(id)),
    )
      .then(() => {
        message.success('修改授权成功');
        props.onConfirm();
      })
      .catch(() => {});
  }, [checkedKeys]);

  const onExpand = useCallback((keys: ReactText[]) => {
    setExpandKeys(keys as string[]);
  }, []);

  const onCheck = useCallback(
    (keys: ReactText[] | { checked: ReactText[]; halfChecked: ReactText[] }) => {
      setCheckKeys(keys as { checked: string[]; halfChecked: string[] });
    },
    [],
  );

  const onSelect = useCallback((keys: ReactText[]) => {
    setSelectedKeys(keys as string[]);
  }, []);

  const treeData = useMemo(() => renderTree(menuList), [menuList]);

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      title="编辑角色权限"
      onCancel={props.onClose}
      onOk={onOk}
    >
      <Form
        form={form}
        initialValues={role || {}}
        labelCol={{
          sm: { span: 5 },
        }}
        wrapperCol={{
          sm: { span: 16 },
        }}
      >
        <Form.Item label="角色Id" name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="角色名称" name="name">
          <Input disabled />
        </Form.Item>
        <Form.Item label="菜单权限">
          <Tree
            checkable
            checkStrictly
            checkedKeys={checkedKeys}
            expandedKeys={expandKeys}
            onExpand={onExpand}
            onCheck={onCheck}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default memo(EditMenu);

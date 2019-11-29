import React, { useMemo, useCallback, useEffect, useState, memo } from 'react';
import { Select, Table, Icon, Button, Modal, message } from 'antd';
import SearchForm, { SearchFormItem, SearchFormAction } from '../../components/SearchFrom';
import BaseTable from '../../components/BaseTable';
import { Menu, MenuSearchParams, apiGetMenuList, apiRemoveMenu } from './service';
import PageWrap from '../../components/PageWrap';
import { PageResponseData } from '../../../typings';
import AddOrEditMenu from './AddOrEditMenu';

const MenuLevel = memo(({ level }: { level: number }) => (
  <React.Fragment>
    {(() => {
      switch (level) {
        case 1:
          return '一级菜单';
        case 2:
          return '二级菜单';
        case 3:
          return '三级菜单';
        default:
          return `${level}级菜单`;
      }
    })()}
  </React.Fragment>
));

const MenuButton = memo(
  ({
    index,
    onButtonClick,
  }: {
    index: number;
    onButtonClick: (type: string, index: number) => void;
  }) => (
    <React.Fragment>
      <Button
        size="small"
        style={{ marginRight: '10px' }}
        onClick={() => onButtonClick('edit', index)}
        type="link"
      >
        编辑
      </Button>
      <Button size="small" type="link" onClick={() => onButtonClick('remove', index)}>
        删除
      </Button>
    </React.Fragment>
  ),
);

function MenuManage() {
  const formList = useMemo<SearchFormItem[]>(
    () => [
      {
        name: 'id',
        placeholder: '请输入菜单id',
        label: '菜单id',
      },
      {
        name: 'name',
        placeholder: '请输入菜单名称',
        label: '菜单名称',
      },
      {
        name: 'url',
        placeholder: '请输入菜单url',
        label: '菜单url',
      },
      {
        name: 'level',
        label: '菜单等级',
        placeholder: '请选择菜单等级',
        render: (
          <Select style={{ width: '150px' }} placeholder="请选择菜单等级">
            <Select.Option value="1">一级菜单</Select.Option>
            <Select.Option value="2">二级菜单</Select.Option>
            <Select.Option value="3">三级菜单</Select.Option>
          </Select>
        ),
      },
    ],
    [],
  );

  const actions = useMemo<SearchFormAction[]>(
    () => [
      {
        name: '添加菜单',
        type: 'primary',
      },
    ],
    [],
  );

  const [editVisible, setEditVisible] = useState<boolean>(false);

  const closeEditModal = useCallback(() => {
    setEditVisible(false);
  }, [setEditVisible]);

  const onOkEditModal = useCallback(() => {}, [setEditVisible]);

  const [menuData, setMenuData] = useState<{ list: Menu[]; page: PageResponseData }>({
    list: [],
    page: {},
  });

  const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);

  const initPageList = async (params?: MenuSearchParams) => {
    try {
      const { data } = await apiGetMenuList(params);
      setMenuData(data);
    } catch (error) {
      // dosomethings
    }
  };

  const onSearch = useCallback((params: MenuSearchParams) => {
    initPageList(params);
  }, []);

  useEffect(() => {
    initPageList();
  }, []);

  const onButtonClick = useCallback(
    (type: string, index: number) => {
      if (type === 'remove') {
        Modal.confirm({
          title: '系统提示',
          content: '此操作将永久删除该菜单, 是否继续?',
          onOk() {
            apiRemoveMenu(menuData.list[index].id!).then(() => {
              message.success('删除成功！');
            });
          },
          onCancel() {},
        });
      } else {
        setEditVisible(true);
        setCurrentMenu(menuData.list[index]);
      }
    },
    [menuData.list],
  );

  const onAddMenu = useCallback(() => {
    // do
  }, []);

  return (
    <PageWrap>
      {/* 查询表单 */}
      <SearchForm
        formList={formList}
        actions={actions}
        onSearch={onSearch}
        onClick={onAddMenu}
      ></SearchForm>
      {editVisible && (
        <AddOrEditMenu
          menu={currentMenu}
          visible={editVisible}
          onClose={closeEditModal}
          onConfirm={onOkEditModal}
        ></AddOrEditMenu>
      )}
      {/* 数据表格 */}
      <BaseTable<Menu> data={menuData}>
        <Table.Column<Menu> title="id" dataIndex="id" align="center"></Table.Column>
        <Table.Column<Menu> title="菜单名称" dataIndex="name" align="center"></Table.Column>
        <Table.Column<Menu>
          title="菜单icon"
          dataIndex="icon"
          align="center"
          render={text => <Icon style={{ fontSize: '16px' }} type={text}></Icon>}
        ></Table.Column>
        <Table.Column<Menu> dataIndex="sort" title="菜单排序" align="center"></Table.Column>
        <Table.Column<Menu>
          dataIndex="parent"
          title="父级菜单"
          render={(text, recored: Menu) => (recored.parent ? recored.parent.name : '')}
          align="center"
        ></Table.Column>
        <Table.Column<Menu>
          dataIndex="level"
          title="菜单等级"
          render={text => <MenuLevel level={text} />}
          align="center"
        ></Table.Column>
        <Table.Column<Menu>
          title="操作"
          align="center"
          render={(text, record, index) => (
            <MenuButton index={index} onButtonClick={onButtonClick} />
          )}
        ></Table.Column>
      </BaseTable>
    </PageWrap>
  );
}

export default MenuManage;

import React, { useMemo, useCallback, useEffect } from 'react';
import { Select, Table, Icon } from 'antd';
import SearchForm, { SearchFormItem } from '../../components/SearchFrom';
import BaseTable from '../../components/BaseTable';
import { Menu, MenuSearchParams, apiGetMenuList } from './service';
import PageWrap from '../../components/PageWrap';

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

  const initPageList = async (params: MenuSearchParams = { page: 1, size: 10 }) => {
    try {
      const { data } = await apiGetMenuList(params);
      console.log(data);
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

  return (
    <PageWrap>
      <SearchForm formList={formList} onSearch={onSearch}></SearchForm>
      <BaseTable<Menu> list={[]} page={{}}>
        <Table.Column<Menu> title="id"></Table.Column>
        <Table.Column<Menu> title="菜单名称"></Table.Column>
        <Table.Column<Menu>
          title="菜单icon"
          render={text => <Icon type={text}></Icon>}
        ></Table.Column>
        <Table.Column<Menu> title="菜单排序"></Table.Column>
        <Table.Column<Menu> title="父级id"></Table.Column>
        <Table.Column<Menu> title="菜单等级"></Table.Column>
        <Table.Column<Menu> title="操作"></Table.Column>
      </BaseTable>
    </PageWrap>
  );
}

export default MenuManage;

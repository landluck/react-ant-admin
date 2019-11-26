import React, { useMemo } from 'react';
import { Select } from 'antd';
import SearchForm, { SearchFormItem } from '../../components/searchFrom';

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

  return (
    <div>
      <SearchForm formList={formList}></SearchForm>
    </div>
  );
}

export default MenuManage;

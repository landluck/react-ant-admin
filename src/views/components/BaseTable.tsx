import React from 'react';
import { Table } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { TableProps } from 'antd/lib/table';
import { PageResponseData } from '../../typings';

// 基本的表格组件，后续根据需求可继续完善

interface BaseTableProps<T> extends TableProps<T> {
  data: {
    list: T[];
    page: PageResponseData;
  };
  children: React.ReactNode;
  onChange?: (page: PaginationProps) => void;
}

const defualtPage: PaginationProps = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  showSizeChanger: true,
};

function BaseTable<T extends { id?: number }>(props: BaseTableProps<T>) {
  const {
    data: { list, page },
    ...resetProps
  } = props;

  return (
    <Table<T>
      bordered
      {...resetProps}
      style={{ marginTop: '40px' }}
      dataSource={list}
      rowKey={record => `${record.id}`}
      pagination={{
        ...defualtPage,
        current: page.page,
        pageSize: page.size,
        total: page.dataTotal,
      }}
    >
      {props.children}
    </Table>
  );
}

export default BaseTable;

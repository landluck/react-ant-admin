import React from 'react';
import { Table, Empty } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { TableProps } from 'antd/lib/table';

// 基本的表格组件，后续根据需求可继续完善

interface BaseTableProps<T> {
  list: T[];
  page: PaginationProps;
  children: React.ReactNode;
  tableProps?: TableProps<T>;
}

const defualtPage: PaginationProps = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  showSizeChanger: true,
};

function BaseTable<T extends { id: string }>(props: BaseTableProps<T>) {
  return (
    <Table<T>
      bordered
      {...props.tableProps}
      style={{ marginTop: '40px' }}
      dataSource={props.list}
      rowKey={record => record.id}
      pagination={{ ...defualtPage, ...props.page }}
      locale={{ emptyText: <Empty description="暂无数据" /> }}
    >
      {props.children}
    </Table>
  );
}

export default BaseTable;

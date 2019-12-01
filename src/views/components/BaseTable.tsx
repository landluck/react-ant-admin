import React, { useCallback, useState } from 'react';
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
  onChange: (page: PaginationProps) => void;
}

function BaseTable<T extends { id?: number }>(props: BaseTableProps<T>) {
  const {
    data: { list, page },
    ...resetProps
  } = props;

  const [pagination, setPagination] = useState<PaginationProps>({
    defaultCurrent: 1,
    defaultPageSize: 10,
    showSizeChanger: true,
  });

  const onTableChange = useCallback((pageParams: PaginationProps) => {
    setPagination(pageParams);
    props.onChange(pageParams);
  }, []);

  return (
    <Table<T>
      bordered
      {...resetProps}
      onChange={onTableChange}
      style={{ marginTop: '40px' }}
      dataSource={list}
      rowKey={record => `${record.id}`}
      pagination={{
        ...pagination,
        total: page.dataTotal,
      }}
    >
      {props.children}
    </Table>
  );
}

export default BaseTable;

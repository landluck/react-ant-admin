import React, { useMemo, useCallback, useEffect, useState, memo } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import SearchForm, { SearchFormItem, SearchFormAction } from '../../components/SearchForm';
import BaseTable from '../../components/BaseTable';
import { Role, RoleSearchParams, apiGetRoleList, apiRemoveRole } from './service';
import PageWrap from '../../components/PageWrap';
import { PageResponseData } from '../../../typings';
import AddOrEdit from './AddOrEdit';
import EditMenu from './editMenu';

const RoleButton = memo(
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
        onClick={() => onButtonClick('editMenu', index)}
        type="link"
      >
        编辑权限
      </Button>
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

function RoleManage() {
  const formList = useMemo<SearchFormItem[]>(
    () => [
      {
        name: 'id',
        placeholder: '请输入角色id',
        label: '角色id',
      },
      {
        name: 'name',
        placeholder: '请输入角色名称',
        label: '角色名称',
      },
    ],
    [],
  );

  const actions = useMemo<SearchFormAction[]>(
    () => [
      {
        name: '添加角色',
        type: 'primary',
      },
    ],
    [],
  );

  const [editVisible, setEditVisible] = useState<boolean>(false);

  const [editMenuVisible, setEditMenuVisible] = useState<boolean>(false);

  const [page, setPage] = useState<{ page: number; size: number }>({ page: 1, size: 10 });

  const [roleData, setRoleData] = useState<{ list: Role[]; page: PageResponseData }>({
    list: [],
    page: {},
  });

  const [currentRole, setCurrentRole] = useState<Role | null>(null);

  const initPageList = async (params?: RoleSearchParams) => {
    try {
      const { data } = await apiGetRoleList({
        ...page,
        ...params,
      });
      setRoleData(data);
    } catch (error) {
      // dosomethings
    }
  };

  const onSearch = useCallback(
    (params: RoleSearchParams) => {
      initPageList(params);
    },
    [page],
  );

  useEffect(() => {
    initPageList();
  }, [page]);

  const closeEditModal = useCallback(() => {
    setEditVisible(false);
  }, [setEditVisible]);

  const onOkEditModal = useCallback(() => {
    setEditVisible(false);
    initPageList();
  }, [setEditVisible]);

  const closeEditMenuModal = useCallback(() => {
    setEditMenuVisible(false);
  }, [setEditVisible]);

  const onButtonClick = useCallback(
    (type: string, index: number) => {
      if (type === 'remove') {
        Modal.confirm({
          title: '系统提示',
          content: '此操作将永久删除该角色, 是否继续?',
          onOk() {
            apiRemoveRole(roleData.list[index].id!)
              .then(() => {
                message.success('删除成功！');
                initPageList();
              })
              .catch(() => {});
          },
          onCancel() {},
        });

        return;
      }
      setCurrentRole(roleData.list[index]);

      if (type === 'editMenu') {
        setEditMenuVisible(true);
        return;
      }
      setEditVisible(true);
    },
    [roleData.list],
  );

  const onAddRole = useCallback(() => {
    setCurrentRole(null);
    setEditVisible(true);
  }, []);

  const onTableChange = useCallback(({ current, pageSize }: PaginationProps) => {
    setPage({ page: current as number, size: pageSize as number });
  }, []);

  return (
    <PageWrap>
      {/* 查询表单 */}
      <SearchForm
        formList={formList}
        actions={actions}
        onSearch={onSearch}
        onClick={onAddRole}
      ></SearchForm>
      {editVisible && (
        <AddOrEdit
          role={currentRole}
          visible={editVisible}
          onClose={closeEditModal}
          onConfirm={onOkEditModal}
        ></AddOrEdit>
      )}
      {editMenuVisible && (
        <EditMenu
          role={currentRole!}
          visible={editMenuVisible}
          onClose={closeEditMenuModal}
          onConfirm={closeEditMenuModal}
        ></EditMenu>
      )}
      {/* 数据表格 */}
      <BaseTable<Role> data={roleData} onChange={onTableChange}>
        <Table.Column<Role> title="id" dataIndex="id" align="center"></Table.Column>
        <Table.Column<Role> title="角色名称" dataIndex="name" align="center"></Table.Column>
        <Table.Column<Role>
          title="操作"
          align="center"
          render={(text, record, index) => (
            <RoleButton index={index} onButtonClick={onButtonClick} />
          )}
        ></Table.Column>
      </BaseTable>
    </PageWrap>
  );
}

export default RoleManage;

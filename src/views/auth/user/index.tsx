import React, { useMemo, useCallback, useEffect, useState, memo } from 'react';
import { Table, Button, Modal, message, Avatar, Tag } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import SearchForm, { SearchFormItem, SearchFormAction } from '../../components/SearchForm';
import BaseTable from '../../components/BaseTable';
import { User, UserSearchParams, apiGetUserList, apiRemoveUser } from './service';
import PageWrap from '../../components/PageWrap';
import { PageResponseData } from '../../../typings';
import AddOrEdit from './AddOrEdit';

const UserButton = memo(
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

function UserManage() {
  const formList = useMemo<SearchFormItem[]>(
    () => [
      {
        name: 'account',
        placeholder: '请输入用户账号',
        label: '用户账号',
      },
      {
        name: 'mobile',
        placeholder: '请输入用户手机号',
        label: '用户手机号',
      },
    ],
    [],
  );

  const actions = useMemo<SearchFormAction[]>(
    () => [
      {
        name: '添加用户',
        type: 'primary',
      },
    ],
    [],
  );

  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<{ page: number; size: number }>({ page: 1, size: 10 });

  const [userData, setUserData] = useState<{ list: User[]; page: PageResponseData }>({
    list: [],
    page: {},
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const initPageList = async (params?: UserSearchParams) => {
    setLoading(true);

    try {
      const { data } = await apiGetUserList({
        ...page,
        ...params,
      });
      setUserData(data);
    } catch (error) {
      // dosomethings
    } finally {
      setLoading(false);
    }
  };

  const onSearch = useCallback(
    (params: UserSearchParams) => {
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

  const onButtonClick = useCallback(
    (type: string, index: number) => {
      if (type === 'remove') {
        Modal.confirm({
          title: '系统提示',
          content: '此操作将永久删除该用户, 是否继续?',
          onOk() {
            apiRemoveUser(userData.list[index].id!)
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
      setCurrentUser(userData.list[index]);

      setEditVisible(true);
    },
    [userData.list],
  );

  const onAddUser = useCallback(() => {
    setCurrentUser(null);
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
        onClick={onAddUser}
      ></SearchForm>
      {editVisible && (
        <AddOrEdit
          user={currentUser}
          visible={editVisible}
          onClose={closeEditModal}
          onConfirm={onOkEditModal}
        ></AddOrEdit>
      )}
      {/* 数据表格 */}
      <BaseTable<User> data={userData} onChange={onTableChange} loading={loading}>
        <Table.Column<User> title="用户id" dataIndex="id" align="center"></Table.Column>
        <Table.Column<User> title="用户账号" dataIndex="account" align="center"></Table.Column>
        <Table.Column<User> title="用户手机号" dataIndex="mobile" align="center"></Table.Column>
        <Table.Column<User>
          title="用户头像"
          dataIndex="avatar"
          align="center"
          render={text => <Avatar src={text}></Avatar>}
        ></Table.Column>

        <Table.Column<User>
          title="用户角色"
          dataIndex="role"
          align="center"
          render={(text, record) => (record.role ? record.role.name : '无')}
        ></Table.Column>
        <Table.Column<User>
          title="用户状态"
          dataIndex="status"
          align="center"
          render={text => (
            <Tag color={text === 1 ? 'green' : 'red'}>{text === 1 ? '启用' : '禁用'}</Tag>
          )}
        ></Table.Column>
        <Table.Column<User>
          title="操作"
          align="center"
          render={(text, record, index) => (
            <UserButton index={index} onButtonClick={onButtonClick} />
          )}
        ></Table.Column>
      </BaseTable>
    </PageWrap>
  );
}

export default UserManage;

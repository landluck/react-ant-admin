import React, { memo } from 'react';
import { Button, Input, Form } from 'antd';
import { ButtonType } from 'antd/es/button/button';
import './index.less';

export interface SearchFormAction {
  name: string;
  type?: ButtonType;
}

export interface SearchFormItem {
  name: string;
  label: string;
  placeholder?: string;
  rules?: object[];
  render?: React.ReactElement;
}

interface SearchFormProps {
  formList: SearchFormItem[];
  onSearch: (values: any) => void;
  actions: SearchFormAction[];
  onClick: (index: number) => void;
  showLabel?: boolean;
}

function SearchForm(props: SearchFormProps) {
  const [form] = Form.useForm();

  const reset = () => {
    form.resetFields();
    props.onSearch({});
  };

  const onSearch = () => {
    form.validateFields().then(res => {
      props.onSearch(res);
    });
  };

  return (
    <Form className="layout__search" form={form} layout="inline" onFinish={onSearch}>
      {props.formList.map((item: SearchFormItem) => (
        <Form.Item
          label={props.showLabel !== false && item.label ? item.label : ''}
          key={item.name}
          name="item.name"
          rules={item.rules}
        >
          {item.render ? item.render : <Input placeholder={item.placeholder} />}
        </Form.Item>
      ))}

      <Form.Item>
        <Button htmlType="submit">查询</Button>
      </Form.Item>

      <Form.Item>
        <Button htmlType="reset" onClick={reset}>
          重置
        </Button>
      </Form.Item>
      {props.actions.map((action: SearchFormAction, index: number) => (
        <Form.Item key={action.name}>
          <Button type={action.type} onClick={() => props.onClick(index)}>
            {action.name}
          </Button>
        </Form.Item>
      ))}
    </Form>
  );
}

export default memo(SearchForm);

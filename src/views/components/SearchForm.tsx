import React, { memo } from 'react';
import { Form, Button, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ButtonType } from 'antd/es/button/button';

export interface SearchFormAction {
  name: string;
  type?: ButtonType;
}

export interface SearchFormItem {
  name: string;
  label: string;
  placeholder?: string;
  rules?: object[];
  render?: React.ReactNode;
}

interface SearchFormProps extends FormComponentProps {
  formList: SearchFormItem[];
  onSearch: (values: any) => void;
  actions: SearchFormAction[];
  onClick: (index: number) => void;
}

function SearchForm(props: SearchFormProps) {
  const { getFieldDecorator } = props.form;

  const reset = () => {
    props.form.resetFields();
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields((err, values: any) => {
      if (!err) {
        props.onSearch(values);
      }
    });
  };

  return (
    <Form layout="inline" onSubmit={onSearch}>
      {props.formList.map((item: SearchFormItem) => (
        <Form.Item label={item.label} key={item.name}>
          {getFieldDecorator(item.name, {
            rules: item.rules,
          })(item.render ? item.render : <Input placeholder={item.placeholder} />)}
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

export default memo(
  Form.create<SearchFormProps>({ name: 'SearchForm' })(SearchForm),
);

import React, { memo } from 'react';
import { Form, Button, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

export interface SearchFormItem {
  name: string;
  label: string;
  placeholder?: string;
  rules?: object[];
  render?: React.ReactNode;
}

interface SearchFromProps extends FormComponentProps {
  formList: SearchFormItem[];
  onSearch: (values: any) => void;
}

function SearchForm(props: SearchFromProps) {
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
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
      <Form.Item>
        <Button htmlType="reset" onClick={reset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(
  Form.create<SearchFromProps>({ name: 'searchFrom' })(SearchForm),
);

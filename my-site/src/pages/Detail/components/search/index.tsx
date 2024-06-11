import React, { useState } from 'react'
import { Modal, Form, Input, Select, DatePicker, Button, Col, Row, type FormProps } from "antd";
import styles from './index.module.less'
const { RangePicker } = DatePicker;

function onChange(value: any, dateString: any) {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
  }
  
  function onOk(value: any) {
    // console.log('onOk: ', value);
  }
export interface IMonitorModal {
  searchData: (data: any) => void;
  updateSearch:  (data: any) => void;
}

type FieldType = {
    errorMsg: string;
    date: any;
  };

export const Search: React.FC<IMonitorModal> = ({
  searchData,
  updateSearch

}) => {

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    let data = {
      ...values,
      startDate: values.date ? values.date[0].format('YYYY-MM-DD HH:mm') : '',
      endDate: values.date ? values.date[1].format('YYYY-MM-DD HH:mm') : ''
    }
    updateSearch(data)
  };

  const [form] = Form.useForm();




  return (
    <div>
      <Form
          className={styles.form} 
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item<FieldType>
                label="错误信息"
                name="errorMsg"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="选择日期"
                name="date"  
              >
              <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['开始时间', '结束时间']}
                  onChange={onChange}
                  onOk={onOk}
              />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  查询
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
    </div>
  )
}


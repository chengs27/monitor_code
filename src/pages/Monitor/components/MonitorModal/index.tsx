import React, { useState } from 'react'
import { Modal, Form, Input, Select } from "antd";


export interface IMonitorModal {
  monitorOpen: boolean;
  onCancel: () => void;
  onAdd: (data: any) => void;
  onEdit: (data: any) => void;
  id?: number;
  info: any;
}

type FieldType = {
  codeId: number;
  codeName: string;
  code: number;
};



export const MonitorModal: React.FC<IMonitorModal> = ({
  monitorOpen,
  onCancel,
  onAdd,
  info,
  onEdit
}) => { 
  const [form] = Form.useForm();
  // console.log(info)
  form.setFieldsValue({
    codeId: info?.id,
    codeName: info?.codeName,
    code: info?.code,
  })

  const handleOk = async() => {
    try{
     const data = await form.validateFields();
     if(Object.keys(info).length !== 0) {
      console.log('code有数据',data)
        onEdit(data)
     }else {
      console.log('code新增',data)
        onAdd(data)
     }
    }catch(e){
      console.log(e)
    }
  };
  
  return (
    <div>
      <Modal 
        title="编辑监控项" 
        open={monitorOpen} 
        onOk={handleOk} 
        onCancel={onCancel}
        destroyOnClose={true}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="codeId"
            name="codeId"
          >
            <Input  disabled/>
          </Form.Item>
          <Form.Item<FieldType>
            label="监控名称"
            name="codeName"
            rules={[{ required: true, message: "请输入项目名称" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="code值"
            name="code"
            rules={[{ required: true, message: "请输入负责人员" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}



import React, { useEffect, useState  } from "react";
import { Modal, Form, Input, Select } from "antd";


export interface IProjectModal {
    id?: number;
    visible: boolean;
    onCancel: () => void;
    onAdd: (res:any) => void;
    onEdit: (res:any) => void;
    info: any;
}

type FieldType = {
  id?: number;
  name?: string;
  type?: string;
  owner?: string;
};

export const ProjectModal: React.FC<IProjectModal> = ({
  id,
  visible,
  onCancel,
  onAdd,
  info,
  onEdit,
}) => {
    const [form] = Form.useForm();
    useEffect(() => {
      form.setFieldsValue({
        id: info?.id,
        name: info?.name,
        owner: info?.owner,
        type: info?.type,
      })
    },[])
    const handleClick = async () => {
      try  {
        const data = await form.validateFields()
        console.log('dsadsa',data)
        console.log(info)
        if(Object.keys(info).length !== 0){
          console.log('有数据')
          onEdit(data)
        }else {
          console.log('没有数据')
          onAdd(data);
        }
      } catch (error) {
        console.log('表单填写不全');
      }
    };
  
  
    return (
      <>
        <Modal title="编辑项目信息" open={visible} onCancel={onCancel} onOk={handleClick} destroyOnClose={true}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          // onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType> 
              label="项目名称"
              name="name"
              rules={[{ required: true, message: "请输入项目名称" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType> 
              label="项目id"
              name="id"
            >
              <Input disabled/>
            </Form.Item>

            <Form.Item<FieldType>
              label="负责人员"
              name="owner"
              rules={[{ required: true, message: "请输入负责人员" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="项目类型"
              name="type"
              rules={[{ required: true, message: "请选择项目类型" }]}
            >
              <Select
                options={[
                  {
                    label: "H5",
                    value: "H5",
                  },
                  {
                    label: "小程序",
                    value: "小程序",
                  },
                  {
                    label: "PC",
                    value: "PC",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
  
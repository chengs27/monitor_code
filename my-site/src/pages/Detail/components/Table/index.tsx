import React from 'react';
import { Space, Table, } from 'antd';
import type { TableProps } from 'antd';
import styles from './index.module.less'

export interface DataType {
  list: Array<any>,
  
}

const columns: TableProps<DataType>['columns'] = [
    {
      title: '报错信息',
      dataIndex: 'msg',
      key: 'msg',
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '报错时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '页面路径',
      key: 'router',
      dataIndex: 'router',
      render: (text) => <a>{text}</a>,
    },
  ];
  



export const DeatilTable: React.FC<DataType> = ({
  list,
}) => <Table className={styles.container} columns={columns} dataSource={list} />



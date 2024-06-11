import React, { useState, useEffect } from 'react';
import styles from './index.module.less';
import { Layout, theme, Button, Modal, Pagination, } from 'antd';
import { ProjectCard, ProjectModal } from './components';
import { useNavigate } from 'react-router-dom';
import { PAGE_NAME } from "../../router";
import { relative } from 'path';
import {BASE_URL} from '../../common/constant'

interface PaginationInfo {
  current: number;  // 当前页码
  pageSize: number; // 每页条数
  total: number; // 总条数
}

const { Header, Content, Footer } = Layout;
const { confirm } = Modal;
export const Project: React.FC = () => {

  const [ visible, setVisible ] = useState(false);
  const [ list, setList ] = useState<API.IProjectInfo[]>([])
  const [ info, setInfo ] = useState<API.IProjectInfo>({})
  const [ page, setPage ] = useState<PaginationInfo>({
    current: 1,
    pageSize: 2,
    total: 0,
  });
  const navigate = useNavigate();

  /**增加项目 */
  const addProject = (data: any) => {
    fetch(`${BASE_URL}/api/project`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json', // 设置请求头为JSON
      },
      body: JSON.stringify(data)
    }).then((res) => res.json())
      .then((r) => {
        if (r.error == 0) {
          setVisible(false)
          getData()
        } else {
          alert(r.msg)
        }
      });
  };
  /**查找项目 */
  const getData = (pageInfo: PaginationInfo = page) => {
    console.log(`${BASE_URL}/api/project?size=${pageInfo.pageSize}&page=${pageInfo.current}`)
    fetch(`${BASE_URL}/api/project?size=${pageInfo.pageSize}&page=${pageInfo.current}`, {
      method: 'GET',
    }).then((res) => res.json())
      .then((r) => {
        if (r.error == 0) {
            setList(r.data.result)
            setPage({
              current: pageInfo.current,
              pageSize: pageInfo.pageSize,
              total: r.data.total
            })
        }
      });
  }

  /**查找单个项目 */
  const getSingle = (id: number | undefined) => {
    fetch(`${BASE_URL}/api/project/single?id=${id}`, {
      method: 'GET',
    }).then((res) => res.json())
      .then((r) => {
        if (r.error == 0) {
          setInfo(r.data)
        }
      });
  }

  /**删除项目 */
  const deleteProject = (id: number | undefined) => {
    confirm({
      title: '是否要删除该项目?',
      onOk() {
        fetch(`${BASE_URL}/api/project`, {
          method: 'DELETE',
          headers:{
            'content-Type':'application/json'
          },
          body:JSON.stringify({id})
        }).then((res) => res.json())
          .then((r) => {
            getData()
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  /**修改项目 */
  const modifyProject = (data: API.IProjectInfo) => {
    let val = {...data}
    console.log(val)
    fetch(`${BASE_URL}/api/project`, {
      method: 'PUT',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify({...data})
    }).then((res) => res.json())
      .then((r) => {
        console.log('修改了')
        setVisible(false)
        getData()
      });
  }

  

  useEffect(() => {
    getData()
  }, [])



  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();



  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
      </Header>
      <Content style={{ padding: '0 48px',position: 'relative' }}>
        <div
          style={{
            background: colorBgContainer,
            height: 950,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Button type="primary" onClick={() => setVisible(true)}>新增项目</Button>
          <ProjectModal 
              visible={visible} 
              info={info}  
              onCancel={() => {setVisible(false);setInfo({})}} 
              onAdd={(data) => addProject(data)} 
              onEdit={(data) => modifyProject(data)} />
          <div className={styles.cardWrap}>
            {list.map((item) =>
              <ProjectCard
                {...item}
                key={item.id}
                onEdit={() => { getSingle(item.id); setVisible(true) }}
                onEnter={() => {
                  navigate(`${PAGE_NAME.MONITOR}?id=${item.id}`);
                }}
                onDelete={() => { deleteProject(item.id) }}
              />
            )}
          </div>
          <Pagination className={styles.pagination} defaultCurrent={ page.current } total={page.total} pageSize={ page.pageSize } onChange={(current: number, size: number) => getData({...page,current})} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}


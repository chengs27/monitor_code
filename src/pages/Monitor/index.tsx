import React, { useEffect, useState } from 'react';
import { Layout, Menu, theme, Button, Card, Modal, Pagination, } from 'antd';
import styles from "./index.module.less";
import { MonitorCard, MonitorModal } from "./components";
import { useNavigate, useLocation, useSearchParams  } from "react-router-dom";
import { PAGE_NAME } from "../../router";
import { error } from 'console';
import {BASE_URL} from '../../common/constant'

const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { confirm } = Modal;

interface PaginationInfo {
  current: number;  // 当前页码
  pageSize: number; // 每页条数
  total: number; // 总条数
}

export const Monitor = () => { 
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const navigate = useNavigate();
  const [ search ] = useSearchParams();
  const projectId = search.get("id") || "";
  const [monitorOpen, setMonitorOpen] = useState(false);
  const [list, setList] = useState<API.ICodeInfo[]>([])
  const [info, setInfo] = useState({})
  const [chart, setChart] = useState([])
  const [ page, setPage ] = useState<PaginationInfo>({
    current: 1,
    pageSize: 2,
    total: 0,
  });
  
  const location = useLocation();
  const params = new URLSearchParams(location.search); // 获取地址栏参数
  const paramId = params.get('id'); // 根据参数名获取参数值

  /**查找监控 */
  const getData = (pId: number | string,pageInfo: PaginationInfo = page ) => {
    fetch(`${BASE_URL}/api/code?pId=${pId}&size=${pageInfo.pageSize}&page=${pageInfo.current}`, {
      method: 'GET',
    }).then((res) => res.json())
      .then((r) => {
        console.log(r)
        setList(r.count)
        let tempChart = r.count.map((item: any) => {
          return item.todayList
        })
        setChart(tempChart)
        // setMount()
        setPage({
          current: pageInfo.current,
          pageSize: pageInfo.pageSize,
          total: r.data.total
        })
        let tempArr = r.count.map((item: any) => {
          return {
            id: item.dataValues.id,
            todayCount: item.todayCount,
            yesterdayCount: item.yesterdayCount,
          }
        })
        r.data.result.forEach((item: any) => {
          tempArr.forEach((it: any) => {
            if(item.id === it.id){
              item.todayCount = it.todayCount;
              item.yesterdayCount = it.yesterdayCount;
            }
          })
        })
      });
  }
  
  // 查看单个监控得到信息
  const getSingle = (codeId: number | undefined) => {
    fetch(`${BASE_URL}/api/code/single?codeId=${codeId}`, {
      method: 'GET',
    }).then((res) => res.json())
      .then((r) => {
        console.log(r)
        setInfo(r.data)
      });
  }


  /**新增监控 */
  const addMonitor = (data: any) => {
    console.log(data)
    let typeData = { ...data,projectId}
    fetch(`${BASE_URL}/api/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(typeData)
    }).then((res) => res.json())
      .then((r) => {
        console.log(r)
        getData(+projectId)
        setMonitorOpen(false)

      });
  }

  /**删除监控 */

  const deleteCode = (id: number | undefined) => {
    confirm({
      title: '是否要删除该项目?',
      onOk() {
        fetch(`${BASE_URL}/api/code`, {
          method: 'DELETE',
          headers:{
            'content-Type':'application/json'
          },
          body:JSON.stringify({id})
        }).then((res) => res.json())
          .then((r) => {
           console.log(r)
           getData(+projectId)
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /**修改监控项 */ 
  const modifyCode = (data: object) => {
    console.log(data)
    fetch(`${BASE_URL}/api/code`, {
      method: 'PUT',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify({...data})
    }).then((res) => res.json())
      .then((r) => {
        console.log('修改了')
        setMonitorOpen(false)
        getData(+projectId)
      });
  } 

  useEffect(() => {
    getData(+(paramId as string))
   
  }, [])



  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />

      </Header>
      <Content style={{ padding: '0 48px',position: 'relative' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 950,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className={styles.container}>
            <div className={styles.buttonWrap}>
              <Button type="primary" onClick={() => { setMonitorOpen(true) }}> 新增监控项 </Button>
            </div>
            <MonitorModal 
              info={info} 
              monitorOpen={monitorOpen} 
              onCancel={() => {setMonitorOpen(false); setInfo({})}} 
              onAdd={(data) =>  addMonitor(data)}
              onEdit={(data) => modifyCode(data)}/>
            <div className={styles.cardWrap}>
              {list.map((item) => (
                <MonitorCard
                  {...item}
                  // key={item.id}
                  onEdit={() => { setMonitorOpen(true); getSingle(item.dataValues.id) }}
                  onEnter={() => {
                    navigate(`${PAGE_NAME.DETAIL}?pId=${projectId}&codeId=${item.dataValues.id}`);
                  }}
                  onDelete={() => { deleteCode(item.dataValues.id) }}
                />
                
              ))}
            </div>
          </div>
          <Pagination className={styles.pagination} defaultCurrent={ page.current } total={page.total} pageSize={ page.pageSize } onChange={(current: number, size: number) => getData(paramId as string,{...page,current})} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}



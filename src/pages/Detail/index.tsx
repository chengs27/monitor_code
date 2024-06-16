import React, { useEffect, useState } from 'react'
import { LineChart, DeatilTable, Search } from './components'
import { useSearchParams } from 'react-router-dom';
import qs from 'query-string'
import {BASE_URL} from '../../common/constant'
import { DatePicker } from 'antd';


export const Detail = () => {
  const [ search ] = useSearchParams();
  const codeId = search.get("codeId") || "";
  const [ page, setPage ] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [ list, setList ] = useState<any[]>([])
  const [ result, setResult ] = useState<any>([])
  const [ searchData, setSearchData ] = useState<any>(null)


  /**查询报错信息 */
const getData = () => {
  if(searchData) {
    console.log(searchData)
    const str = qs.stringify({
      codeId,
      errorMsg: searchData.errorMsg,
      startDate: searchData.startDate,
      endDate: searchData.endDate
})
console.log('走这里', window.decodeURIComponent(str))
    fetch(`${BASE_URL}/api/detail?${window.decodeURIComponent(str)}`, {
      method: 'GET',
    }).then((res) => res.json())
      .then((r) => {
      console.log(r)
      setList(r.rows)
      })
  }else {
    fetch(`${BASE_URL}/api/detail?codeId=${codeId}&page=${page.current}&pageSize=${page.pageSize}`, {
      method: 'GET',
    }).then((res) => res.json())
      .then((r) => {
      console.log(r)
      setList(r.rows)
      });
  }
  
} 

const getCount = () => {
  fetch(`${BASE_URL}/api/detail/count?codeId=${codeId}`, {
    method: 'GET',
  }).then((res) => res.json())
    .then((r) => {
      console.log(r.data)
      setResult(r.data)
    });
}
useEffect( () => {
  console.log(searchData)
  if(searchData) {
    getData()
  }
  console.log('345')
}, [searchData])

useEffect(() => {
  const timer = setTimeout(() => {
    getData()
    getCount()
  })
  return () => {clearTimeout(timer)}
}, [])

const updateSearch = (data: any) => {
  setSearchData(data)
}

  return (
    <div>
      <LineChart result={result}/>
      <Search searchData={searchData} updateSearch={updateSearch} />
      <DeatilTable list={list} />
    </div>
  )
}

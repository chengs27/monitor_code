import { Line } from '@ant-design/plots';
// import { Line } from '@antv/g2plot';
import React from 'react';
import styles from "./index.module.less";

export interface DataType2 {
  result: Array<any>,
  
}




export const LineChart: React.FC<DataType2> = ({result}) => {
 
  const config = {
    title: '今/昨日监控图',
    padding: [20, 20, 20, 20], 
    data:result,
    point: {
      visible: true,
      size: 3,
      style: {
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2,
      },
    },
    xField: 'time',
    yField: 'value',
    annotations: [
      {
        type: "lineY",
        yField: 5,
        style: { stroke: "#F4664A", strokeOpacity: 1, lineWidth: 1 },
      }
    ],
    legend: {
      color: {
        layout: {
          justifyContent: 'center',
          alignItems: 'flex-end',
          flexDirection: 'column',
        },
      },
    },
    label: {
      lineHeight:30,
      position: 'bottom',
      transform: [{ type: 'overlapHide' }],
      textAlign:'center',
      textBaseline:'bottom'
    },
    axis: {
      x: {
        title:'时间(小时)',
        line:true,
        arrow:true,
        lineArrowOffset:10
      },
      y: {
        title:'数量(个)',
        line:true,
        arrow:true,
        lineArrowOffset:30
      },
    },
    tooltip: {
      title: (d:any) => `${d.time}点`,
      items:[{channel: 'y'}]
    },
    colorField:'type',
    scale: { 
      color: { range: ['#2593fc','#FAA219' ] },
      x: { 
        type: 'linear',
        tickCount:24
      }
    },
  };
  
  return (
    <>
      <Line className={styles.container} {...config} />
      
    </>
  )
}


import { Line } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';


export interface MountType {
  todayList: Array<any>,
  
}

export const MonitorChart: React.FC<MountType> = ({todayList}) => {
    
      const config = {
        data: todayList,
        xField: 'time',
        yField: 'value',
        paddingLeft: 5,
        paddingBottom: 5,
        height: 150,
        axis: {
          x: {
            title: '',
            line: true,
            arrow: true,
            lineArrowOffset: 10
          },
          y: {
            title: '',
            line: true,
            arrow: true,
            lineArrowOffset: 10
          }
        },
        scale: {
          x: {
            tickCount: 0,
          },
          y: {
            tickCount: 0,
          },
        },
        style: {
          lineWidth: 2,
        },
      };
      return <Line {...config} />;
}



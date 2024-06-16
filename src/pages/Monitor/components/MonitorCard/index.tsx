import React, { useEffect, useState } from 'react'
import { Card } from "antd";
import { MonitorChart } from "../MonitorChart";
import {
    EditOutlined,
    ArrowRightOutlined,
    DeleteOutlined,
    UserOutlined,
    StockOutlined,
} from "@ant-design/icons";
import { useDebounceFn } from "ahooks";
import styles from "./index.module.less";

export interface IProps extends API.ICodeInfo {
    /** 编辑按钮 */
    onEdit: () => void;
    /** 删除按钮 */
    onDelete: () => void;
    /** 进入按钮 */
    onEnter: () => void;
}

export const MonitorCard: React.FC<IProps> = ({
    id,
    name,
    codeName,
    code,
    todayCount,
    yesterdayCount,
    dataValues,
    todayList,
    onEdit,
    onEnter,
    onDelete,
}) => {
    const { run: handleEdit } = useDebounceFn(() => { onEdit() }, {
        wait: 500,
        leading: true,
        trailing: false,
    });
    const { run: handleEnter } = useDebounceFn(() => { onEnter() }, {
        wait: 500,
        leading: true,
        trailing: false,
    });
    const { run: handleDelete } = useDebounceFn(() => { onDelete() }, {
        wait: 500,
        leading: true,
        trailing: false,
    });
    console.log('sadsa',dataValues,todayList)
    const [mount, setMount] = useState([])

    return (
        <Card
            title={name}
            className={styles.container}
            actions={[
                <EditOutlined key="edit" onClick={handleEdit} />,
                <DeleteOutlined key="setting" onClick={handleDelete} />,
                <ArrowRightOutlined key="ellipsis" onClick={handleEnter} />,
            ]}
        >
            <div className={styles.text}>
                <UserOutlined className={styles.icon} />
                监控名称:{dataValues.codeName}
            </div>
            <div className={styles.content}>
                <div className={styles.text}>
                    <StockOutlined className={styles.icon} />
                    code值:{dataValues.code}
                </div>
                <div className={styles.text}>
                    <StockOutlined className={styles.icon} />
                    今日/昨日数量：{todayCount} / {yesterdayCount}
                </div>
                
            </div>
            <MonitorChart todayList={todayList} />
        </Card>
    )
}


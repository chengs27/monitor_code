import React, { useState } from 'react'
import {
    EditOutlined,
    ArrowRightOutlined,
    DeleteOutlined,
    UserOutlined,
    StockOutlined,
    PushpinOutlined
} from '@ant-design/icons';
import { Card } from 'antd';
import { useDebounceFn } from "ahooks";
import styles from "./index.module.less";

export interface IProps extends API.IProjectInfo {
    // 编辑按钮
    onEdit: () => void;
    // 删除按钮
    onDelete: () => void;
    // 进入按钮
    onEnter: () => void;
}



export const ProjectCard: React.FC<IProps> = ({
    name,
    type,
    owner,
    monitorCount,
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


    return (
        <>
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
                    项目负责人： {owner}
                </div>
                <div className={styles.text}>
                    <StockOutlined className={styles.icon} />
                    监控总数量： {monitorCount}
                </div>
                <div className={styles.text}>
                    <PushpinOutlined className={styles.icon} />
                    项目类型： {type}
                </div>
            </Card>
        </>
    )
}


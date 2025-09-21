import React from 'react'

import { Task } from '@/model/Task'

import styles from './Task.module.scss';

type TaskTitleProps = {
    task: Task;
}

export const TaskTitle: React.FC<TaskTitleProps> = ({ task }) => {
    return (<>
        {task.link ?
            (<a className={styles['task-details']} href={`/portfolio/${task.link}`} target="_blank">
                <h5>{task.title}</h5>
            </a>) :
            <h5>{task.title}</h5>}
    </>
    )
}
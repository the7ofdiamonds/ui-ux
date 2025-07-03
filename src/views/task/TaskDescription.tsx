import React from 'react'

import { Task } from '@/model/Task'

import styles from './Task.module.scss';

type TaskDescriptionProps = {
    task: Task;
}

export const TaskDescription: React.FC<TaskDescriptionProps> = ({ task }) => {
    return (<>
        {task.link ?
            (<a className={styles['task-details']} href={`/portfolio/${task.link}`} target="_blank">
                <h5>{task.description}</h5>
            </a>) :
            <h5>{task.description}</h5>}
    </>
    )
}
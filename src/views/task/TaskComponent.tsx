import React from 'react'

import { Task } from '@/model/Task'

import { TaskCheckbox } from './TaskCheckbox';
import { TaskTitle } from './TaskTitle';

import { TaskDescription } from './TaskDescription';

import styles from './Task.module.scss';

type TaskComponentProps = {
    task: Task;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task }) => {
    return (
        <div className={styles.task} key={task.id}>
            <span className={styles['task-row']}>
                <TaskCheckbox task={task} />
                <TaskTitle task={task} />
            </span>

            <TaskDescription task={task} />

            {task.subTasks && Array.isArray(task.subTasks) &&
                task.subTasks.length > 0 &&
                <div className={styles['sub-task']}>
                    {task.subTasks.map((task) => (
                        <div className={styles.task} key={task.id}>
                            <span className={styles['task-row']}>
                                <TaskCheckbox task={task} />
                                <TaskTitle task={task} />
                            </span>
                        </div>
                    ))}
                </div>}
        </div>
    )
}

export default TaskComponent;
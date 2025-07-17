import React, { useEffect, useState } from 'react';

import TaskComponent from '@/views/task/TaskComponent';

import { Task } from '@/model/Task';
import { CheckList } from '@/model/CheckList';

import styles from './CheckList.module.scss';
import { Tasks } from '@/model/Tasks';

interface CheckListProps {
  checkList: CheckList;
}

export const CheckListComponent: React.FC<CheckListProps> = ({ checkList }) => {
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Tasks | null>(null);

  useEffect(() => {
    if (checkList.id) {
      setId(checkList.id)
    }
  }, [checkList]);

  useEffect(() => {
    if (checkList.title) {
      setTitle(checkList.title)
    }
  }, [checkList]);

  useEffect(() => {
    if (checkList.tasks) {
      setTasks(checkList.tasks)
    }
  }, [checkList]);

  return (
    <>
      {tasks && tasks.list.size > 0 && id ? (
        <div className={styles.checklist} >

          {title && (<h4>{title}</h4>)}

          {Array.from(tasks.list).map((task) => (
            <TaskComponent task={task} key={task.id} />
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
}
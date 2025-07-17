import { Task, TaskDataObject, TaskObject } from '@/model/Task';

import { v4 as uuidv4 } from 'uuid';
import { Tasks, TasksObject } from './Tasks';

export type CheckListObject = {
  id: string;
  title: string | null;
  tasks: TasksObject | null;
  weight: number;
};

export type CheckListDataObject = {
  id: string;
  title: string | null;
  tasks: TasksObject | null;
  weight: number;
};

export class CheckList {
  id: string;
  title: string | null;
  tasks: Tasks | null;
  weight: number;
  totalWeight: number;

  constructor(data?: Partial<CheckListObject>) {
    this.id = data?.id ?? uuidv4();
    this.title = data?.title ?? null;

    if (
      data?.tasks &&
      Array.isArray(data.tasks.list) &&
      data.tasks.list.length > 0
    ) {
      this.tasks = new Tasks(data.tasks);
      this.weight = this.getWeight(data.tasks.list);
      this.totalWeight = this.getTotalWeight(data.tasks.list);
    } else {
      this.tasks = new Tasks();
      this.weight = 0;
      this.totalWeight = 0;
    }
  }

  setTitle(title: string) {
    this.title = title;
  }

  getWeight(data: Array<Record<string, any>> | Array<TaskObject>): number {
    if (!Array.isArray(data) || data.length === 0) return 0;

    let totalWeight = 0;

    data.forEach((task) => {
      if (task.status) {
        totalWeight += task.weight;
      }
    });

    return totalWeight;
  }

  getTotalWeight(data: Array<Record<string, any>> | Array<TaskObject>): number {
    if (!Array.isArray(data) || data.length === 0) return 0;

    let totalWeight = 0;

    data.forEach((task) => {
      totalWeight += task.weight;
    });

    return totalWeight;
  }

  setTotalWeight(tasks: Set<Task>) {
    let totalWeight = 0;

    tasks.forEach((task) => {
      totalWeight += task.weight;
    });

    this.totalWeight = totalWeight;
  }

  setTasks(tasks: Tasks) {
    this.tasks = tasks;

    this.setTotalWeight(tasks.list);
  }

  addTasks(tasks: Tasks) {
    if (this.tasks) {
      this.tasks.list.union(tasks.list);

      this.setTotalWeight(this.tasks.list);
    }
  }

  existsInSet(task: Task) {
    if (!this.tasks) {
      return;
    }

    const map = new Map(
      Array.from(this.tasks.list).map((task) => [task.id, task])
    );

    return map.has(task.id);
  }

  toCheckListObject(): CheckListObject {
    return {
      id: this.id,
      title: this.title,
      tasks:
        this.tasks && this.tasks.list.size > 0
          ? this.tasks.toTasksObject()
          : null,
      weight: this.weight,
    };
  }

  toCheckListDataObject(): CheckListDataObject {
    return {
      id: this.id,
      title: this.title,
      tasks:
        this.tasks && this.tasks.list.size > 0
          ? this.tasks.toTasksObject()
          : null,
      weight: this.weight,
    };
  }
}

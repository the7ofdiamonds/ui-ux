import { Task, TaskObject } from './Task';

export type TasksObject = {
  list: Array<TaskObject> | null;
};

export class Tasks {
  list: Set<Task>;

  constructor(tasks?: TasksObject) {
    this.list =
      tasks && tasks.list && tasks.list.length > 0
        ? new Set(tasks.list.map((task) => new Task(task)))
        : new Set();
  }

  setList(list: Set<Task>) {
    this.list = list;
  }

  existsInSet(task: Task): boolean {
    const map = new Map(Array.from(this.list).map((task) => [task.id, task]));

    return map.has(task.id);
  }

  addTasks(tasks: Tasks) {
    if (this.list) {
      this.list.union(tasks.list);
    }
  }

  //   filter(term: string): Skills {

  //     return this.list.find((skill) => skill.id === term) ?? new Skill();
  //   }

  toTasksObject(): TasksObject {
    return {
      list:
        this.list && this.list.size > 0
          ? Array.from(this.list).map((task) => task.toTaskObject())
          : null,
    };
  }
}

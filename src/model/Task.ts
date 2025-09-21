import { Issue, tIssue } from '@/model/Issue';
import { ProjectQuery } from '@/model/ProjectQuery';

export type tTask = {
  id: string | number;
  category: string | null;
  title: string | null;
  description: string;
  status: boolean;
  details: string;
  weight: number;
  link: string;
};

export type TaskObject = {
  id: string | number | null;
  category: string | null;
  title: string | null;
  description: string | null;
  status: boolean;
  details: string | null;
  weight: number;
  link: string | null;
  subTasks: Array<TaskObject> | null;
};

export type TaskDataObject = {
  id: string | number | null;
  category: string | null;
  title: string | null;
  description: string | null;
  status: boolean;
  details: string | null;
  weight: number;
  link: string | null;
};

export class Task {
  id: string | number | null;
  category: string | null;
  title: string | null;
  description: string | null;
  status: boolean;
  details: string | null;
  weight: number;
  link: string | null;
  subTasks: Array<Task>;

  constructor(data?: TaskObject) {
    this.id = data?.id ? data.id : null;
    this.category = data?.category ? data.category : null;
    this.title = data?.title ? data.title : null;
    this.description = data?.description ? data.description : null;
    this.status = data?.status ?? false;
    this.details = data?.details ? data.details : null;
    this.weight = data?.weight ?? 0;
    this.link = data?.link ? data.link : null;
    this.subTasks =
      data?.subTasks && Array.isArray(data.subTasks) && data.subTasks.length > 0
        ? data.subTasks.map((task) => new Task(task))
        : [];
  }

  setID(id: string | number) {
    this.id = id;
  }

  setCategory(category: string) {
    this.category = category;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setStatus(status: boolean) {
    this.status = status;
  }

  setDetails(details: string) {
    this.details = details;
  }

  setWeight(weight: number) {
    this.weight = weight;
  }

  getSubTaskFrom(issuesType: Array<tIssue>) {
    return issuesType.map((issue) => {
      const task = new Task();
      task.fromIssueType(issue);
      return task;
    });
  }

  setSubTask(subTasks: Array<Task>) {
    this.subTasks = subTasks;
  }

  fromIssue(issue: Issue) {
    this.id = issue.id ? issue.id : null;
    this.category = issue.labels
      ? issue.labels.includes('design')
        ? 'design'
        : issue.labels.includes('development')
        ? 'development'
        : issue.labels.includes('delivery')
        ? 'delivery'
        : null
      : null;
    this.title = issue.title ? issue.title : null;
    this.description = issue.body ? issue.body : null;
    this.status = issue.state === 'OPEN' ? false : true;
    this.link = issue.repo;
    this.subTasks =
      issue.tracked && Array.isArray(issue.tracked)
        ? this.getSubTaskFrom(issue.tracked)
        : [];
  }

  fromIssueType(issue: tIssue) {
    this.id = issue.id;
    this.title = issue.title;
    this.status = issue.state === 'OPEN' ? false : true;
    this.link = issue.repository.nameWithOwner;
  }

  fromSameProject(projectQuery: ProjectQuery): boolean {
    if (this.link) {
      const linkParts = this.link.split('/');
      const owner = linkParts[0];
      const name = linkParts[1];

      return projectQuery.owner === owner && projectQuery.repo === name;
    }

    return false;
  }

  toTaskObject(): TaskObject {
    return {
      id: this.id,
      category: this.category,
      title: this.title,
      description: this.description,
      status: this.status,
      details: this.details,
      weight: this.weight,
      link: this.link,
      subTasks: this.subTasks
        ? this.subTasks.map((task) => {
            return task.toTaskObject();
          })
        : null,
    };
  }
}

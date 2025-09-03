import { Feature } from '@/model/Feature';
import { Issue, IssueObject, IssueGQL } from '@/model/Issue';
import { Task } from '@/model/Task';

export type IssuesObject = {
  list: Array<IssueObject> | null;
};

export class Issues {
  list: Array<Issue>;
  features: Array<Feature>;
  tasks: Array<Task>;
  design: Array<Task>;
  development: Array<Task>;
  delivery: Array<Task>;

  constructor(data?: IssuesObject) {
    this.list =
      data && Array.isArray(data.list) && data.list.length > 0
        ? data.list.map((issue) => new Issue(issue))
        : [];
    this.features = this.list.length > 0 ? this.toFeatures(this.list) : [];
    this.tasks = this.list.length > 0 ? this.toTask(this.list) : [];
    this.design = this.tasks.length > 0 ? this.getDesignTasks(this.tasks) : [];
    this.development =
      this.tasks.length > 0 ? this.getDevelopmentTasks(this.tasks) : [];
    this.delivery =
      this.tasks.length > 0 ? this.getDeliveryTasks(this.tasks) : [];
  }

  toFeatures(issues: Array<Issue>) {
    return issues
      .map((issue) => {
        if (issue.type === 'Feature') {
          const feature = new Feature();
          feature.fromIssue(issue);
          return feature;
        }
        return null;
      })
      .filter((feature): feature is Feature => feature !== null);
  }

  toTask(issues: Array<Issue>) {
    return issues
      .map((issue) => {
        if (issue.type === 'Task') {
          const task = new Task();
          task.fromIssue(issue);
          return task;
        }
        return null;
      })
      .filter((task): task is Task => task !== null);
  }

  getDesignTasks(tasks: Array<Task>) {
    return tasks.length > 0
      ? tasks.filter((task) => task.category === 'design')
      : [];
  }

  getDevelopmentTasks(tasks: Array<Task>) {
    return tasks.length > 0
      ? tasks.filter((task) => task.category === 'development')
      : [];
  }

  getDeliveryTasks(tasks: Array<Task>) {
    return tasks.length > 0
      ? tasks.filter((task) => task.category === 'delivery')
      : [];
  }

  fromGitHubGraphQL(issues?: Array<IssueGQL>) {
    this.list =
      issues && issues.length > 0
        ? issues.map((issueGQL) => {
            const issue = new Issue();
            issue.fromGitHubGraphQL(issueGQL);
            return issue;
          })
        : [];
  }

  toIssuesObject(): IssuesObject {
    return {
      list:
        this.list.length > 0
          ? this.list.map((issue) => issue.toIssueObject())
          : [],
    };
  }
}

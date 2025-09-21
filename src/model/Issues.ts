import { Feature } from '@/model/Feature';
import { Issue, IssueObject, IssueGQL } from '@/model/Issue';
import { Task } from '@/model/Task';

export type IssuesObject = {
  list: Array<IssueObject> | null;
};

export class Issues {
  list: Array<Issue>;
  features: Array<Feature> = [];
  tasks: Array<Task> = [];
  design: Array<Task> = [];
  development: Array<Task> = [];
  delivery: Array<Task> = [];

  constructor(data?: IssuesObject) {
    this.list =
      data && Array.isArray(data.list) && data.list.length > 0
        ? data.list.map((issue) => new Issue(issue))
        : [];

    this.sortIssues(this.list);
  }

  getList(issuesArray: Array<IssueObject>): Array<Issue> {
    return issuesArray && Array.isArray(issuesArray) && issuesArray.length > 0
      ? issuesArray.map((issueObject) => {
          return new Issue(issueObject);
        })
      : [];
  }

  setList(list: Array<Issue>) {
    this.list = list;
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

  sortIssues(list: Array<Issue>) {
    if (list && Array.isArray(list) && list.length > 0) {
      this.features = this.toFeatures(list);
      this.tasks = this.toTask(list);
      this.design = this.getDesignTasks(this.tasks);
      this.development = this.getDevelopmentTasks(this.tasks);
      this.delivery = this.getDeliveryTasks(this.tasks);
    }
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

    this.sortIssues(this.list);
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

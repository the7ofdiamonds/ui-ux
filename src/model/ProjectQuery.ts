export type ProjectQueryObject = {
  owner: string;
  repo: string;
};

export class ProjectQuery {
  owner: string;
  repo: string;

  constructor(owner: string, repo: string) {
    this.owner = owner;
    this.repo = repo;
  }

  toProjectQueryObject(): ProjectQueryObject {
    return {
      owner: this.owner,
      repo: this.repo,
    };
  }
}

export class RepoContentQuery {
  owner: string;
  repo: string;
  path: string;
  branch: string;

  constructor(owner: string, repo: string, path: string, branch: string) {
    this.owner = owner;
    this.repo = repo;
    this.path = path;
    this.branch = branch;
  }
}

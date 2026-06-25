export type GitHubRepoQueryObject = {
  owner: string;
  repo: string;
};

export class GitHubRepoQuery {
  owner: string;
  repo: string;
  accountType: string | null;

  constructor(owner: string, repo: string, accountType?: string) {
    this.owner = owner;
    this.repo = repo;
    this.accountType = accountType ? accountType : null;
  }

  toGitHubRepoQueryObject(): GitHubRepoQueryObject {
    return {
      owner: this.owner,
      repo: this.repo,
    };
  }
}

export type GitHubRepoQueryObject = {
  owner: string;
  repo: string;
  account_type?: string | null;
};

export class GitHubRepoQuery {
  owner: string;
  repo: string;
  accountType: string | null;

  constructor(query: GitHubRepoQueryObject) {
    this.owner = query.owner;
    this.repo = query.repo;
    this.accountType = query.account_type ? query.account_type : null;
  }

  toGitHubRepoQueryObject(): GitHubRepoQueryObject {
    return {
      owner: this.owner,
      repo: this.repo,
      account_type: this.accountType
    };
  }
}

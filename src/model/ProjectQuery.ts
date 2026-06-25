import type {
  RepoType,
  Repo
} from "./Repo";

export type ProjectQueryObject = {
  id?: string | null;
  repo_type?: RepoType | null;
  owner?: string | null;
  repo?: string | null;
};

export class ProjectQuery {
  id: string | null;
  repoType: RepoType | null;
  owner: string | null;
  repo: string | null;

  constructor(query?: ProjectQueryObject) {
    this.id = query?.id ?? null;
    this.repoType = query?.repo_type ?? null;
    this.owner = query?.owner ?? null;
    this.repo = query?.repo ?? null;
  }

  fromRepo(repo: Repo) {
    this.id = repo.id;
    this.repoType = repo.type;
    this.owner = repo?.owner ? repo.owner.login : null;
    this.repo = repo.name;
  }

  toProjectQueryObject(): ProjectQueryObject {
    return {
      id: this.id,
      repo_type: this.repoType,
      owner: this.owner,
      repo: this.repo,
    };
  }
}
